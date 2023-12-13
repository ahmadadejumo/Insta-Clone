import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  FlatList,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import { SvgXml } from "react-native-svg";
import { searchIconMd } from "../../utils/SvgImages";
import useFeed from "../../hooks/useFeed";

const Screen2 = () => {
  const { width } = useWindowDimensions();
  const { data, setData } = useFeed();

  return (
    <View style={tw`bg-[#000] flex-1`}>
      <StatusBar backgroundColor="#000" style="light" />

      <View
        style={tw`bg-[#262626] text-[#fff] rounded-[8px] h-[40px] flex-row items-center px-[8px] mt-[40px] ios:mt-[60px] mx-[16px]`}
      >
        <SvgXml xml={searchIconMd} />
        <TextInput
          style={tw`flex-1 ml-[10px]`}
          placeholder="Search"
          placeholderTextColor="#fff"
          selectionColor="#fff"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          keyboardType="default"
          returnKeyType="search"
          enablesReturnKeyAutomatically
        />
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Pressable style={tw``}>
            <Image
              source={{ uri: item.mediaUrl }}
              style={tw.style(`h-[110px]`, {
                width: width / 3,
              })}
            />
          </Pressable>
        )}
        style={tw`mt-[10px] mb-[80px]`}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    </View>
  );
};

export default Screen2;
