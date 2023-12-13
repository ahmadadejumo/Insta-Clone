import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { memo, useEffect, useState } from "react";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import { SvgXml } from "react-native-svg";
import {
  bookmarkIcon,
  commentIcon,
  dropdownArrow,
  heartIcon,
  instaBlogIcon,
  intsaLogo,
  menuIcon,
  messageIcon,
  plusIcon,
  sendIcon,
  storyIcon,
} from "../../utils/SvgImages";
import { LinearGradient } from "expo-linear-gradient";
import { generateFakeFeed, getData } from "../services/FeedsData";
import { Video, ResizeMode } from "expo-av";
import useFeed from "../../hooks/useFeed";

const Screen1 = () => {
  const { data, setData } = useFeed([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  //cache feed data to avaoid reloading
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const feedData = await generateFakeFeed(page, itemsPerPage);
      setData((prevFakeFeed) => [...prevFakeFeed, ...feedData]);
      setLoading(false);
    };
    getData();
  }, [page]);

  const handleEndReached = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const [showMore, setShowMore] = useState(false);

  const StoryContainer = () => {
    return (
      <View style={tw`items-center`}>
        <LinearGradient
          colors={["#C913B9", "#F9373F", "#FECD00"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={tw`border border-[2px] h-[70px] w-[70px] rounded-full justify-center items-center`}
        >
          <View
            style={tw`bg-[#000] rounded-full h-[60px] w-[60px] justify-center items-center`}
          >
            <Image
              source={require("../../assets/image1.png")}
              style={tw`rounded-full h-[50px] w-[50px] border border-[#fff]`}
            />
          </View>
        </LinearGradient>
        <Text style={tw`text-[#ffff] text-[12px]`}>blue_bouy</Text>
      </View>
    );
  };

  const FeedContainer = memo(
    ({
      username,
      profilePic,
      imageUrl,
      caption,
      numberOfLikes,
      isVideo,
      onPress,
    }) => {
      return (
        <View style={tw``}>
          <View style={tw`flex-row items-center justify-between px-[12px]`}>
            <View style={tw`flex-row items-center gap-[8px]`}>
              <Image
                source={{ uri: profilePic }}
                style={tw`h-[30px] w-[30px] rounded-full bg-[#fff]`}
              />
              <Text style={tw`text-[14px] font-medium text-[#fff]`}>
                {username}
              </Text>
            </View>
            <SvgXml xml={menuIcon} />
          </View>
          {!isVideo ? (
            <Image source={{ uri: imageUrl }} style={tw`mt-[10px] h-[375px]`} />
          ) : (
            <Video
              source={{ uri: imageUrl }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={tw`mt-[10px] h-[375px]`}
            />
          )}

          <View
            style={tw`mt-[10px] mx-[12px] flex-row items-center justify-between`}
          >
            <View style={tw`flex-row items-center gap-[12px]`}>
              <SvgXml xml={heartIcon} />
              <SvgXml xml={commentIcon} />
              <SvgXml xml={sendIcon} />
            </View>

            <View>
              <SvgXml xml={bookmarkIcon} />
            </View>
          </View>
          <Text style={tw`text-[#fff] pt-[12px] ml-[12px] font-bold`}>
            {numberOfLikes} Likes
          </Text>

          <Text
            style={tw`text-[#fff] text-[14px] pt-[12px] ml-[12px] mr-[15px]`}
          >
            <Text style={tw`font-bold`}>{username + " "}</Text>
            {showMore
              ? caption
              : caption.length > 20 && caption.slice(0, 20) + "..."}
            {caption.length > 20 && (
              <Text onPress={onPress} style={tw`text-[#6E6E6E]`}>
                {"  "}
                {!showMore ? "Read more" : "Read less"}
              </Text>
            )}
          </Text>
        </View>
      );
    }
  );

  return (
    <View style={tw`bg-[#000] flex-1`}>
      <StatusBar backgroundColor="#000" style="light" />
      <View
        style={tw`mt-[45px] ios:mt-[60px] flex-row justify-between mx-[12px]`}
      >
        <View style={tw`flex-row gap-[8px]`}>
          <SvgXml xml={intsaLogo} />
          <SvgXml xml={dropdownArrow} />
        </View>
        <View style={tw`flex-row items-center gap-[24px]`}>
          <SvgXml xml={heartIcon} />
          <SvgXml xml={messageIcon} />
          <SvgXml xml={plusIcon} />
        </View>
      </View>

      <View style={tw`mt-[18px]`}>
        <ScrollView
          horizontal
          contentContainerStyle={tw`flex-row items-center gap-[12px] ml-[12px] pr-[20px]`}
        >
          <View style={tw`items-center`}>
            <SvgXml xml={storyIcon} />
            <Text style={tw`text-[#ffff] text-[12px]`}>Ruffles</Text>
          </View>
          <StoryContainer />
          <StoryContainer />
          <StoryContainer />
          <StoryContainer />
          <StoryContainer />
          <StoryContainer />
          <StoryContainer />
        </ScrollView>
      </View>

      {/* <View style={tw`mt-[13px] gap-[20px]`}>
        <FeedContainer />
        <FeedContainer />
        <FeedContainer />
      </View> */}
      <FlatList
        data={data}
        style={tw`mt-[13px] mb-[100px]`}
        contentContainerStyle={tw`gap-[20px]`}
        renderItem={({ item, index }) => (
          <FeedContainer
            key={index}
            username={item.username}
            profilePic={item.profileImage}
            imageUrl={item.mediaUrl}
            caption={item.caption}
            numberOfLikes={item.likes}
            isVideo={item.isVideo}
            onPress={() => setShowMore(!showMore)}
          />
        )}
        keyExtractor={(_, index) => String(index)}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading && <ActivityIndicator size="large" color="#ffff" />
        }
      />
    </View>
  );
};

export default Screen1;
