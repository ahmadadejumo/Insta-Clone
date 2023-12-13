import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import tw from "twrnc";
import { SvgXml } from "react-native-svg";
import { useFonts } from "expo-font";
import Screen1 from "../screens/Screen1";
import {
  homeIcon,
  postIcon,
  profileIcon,
  reelsIcon,
  searchIcon,
} from "../../utils/SvgImages";
import Screen2 from "../screens/Screen2";

const Tab = createBottomTabNavigator();

const BottomTabData = [
  {
    id: 1,
    title: "Home",
    icon: homeIcon,
    component: Screen1,
  },
  {
    id: 2,
    title: "Search",
    icon: searchIcon,
    component: Screen2,
  },
  {
    id: 3,
    title: "Reels",
    icon: reelsIcon,
    component: Screen1,
  },
  {
    id: 4,
    title: "Post",
    icon: postIcon,
    component: Screen1,
  },
  {
    id: 5,
    title: "Profile",
    icon: profileIcon,
    component: Screen1,
  },
];

const BottomTabNav = () => {
  const { height, width } = useWindowDimensions();
  const TabButton = ({ icon, onPress }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={tw`items-center flex-1 pt-[12px]`}
      >
        <View>
          <SvgXml xml={icon} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          position: "absolute",
          backgroundColor: "#000",
          borderWidth: 1,
        },
      }}
    >
      {BottomTabData.map(({ title, icon, id, component }) => (
        <Tab.Screen
          key={id}
          name={title}
          component={component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => (
              <TabButton icon={icon} onPress={props.onPress} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNav;
