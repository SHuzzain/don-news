import { Tabs } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";

function TabBarIcons(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
}) {
  return <FontAwesome size={24} {...props} style={{ color: "#1BC464" }} />;
}

function TabBarIconsMaterialIcons(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
}) {
  return <MaterialIcons size={24} {...props} style={{ color: "#1BC464" }} />;
}

const RootLayout = () => {
  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            paddingTop: 5,
            height: 80,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarIcon(props) {
              return <TabBarIcons {...props} name="home" />;
            },
          }}
        />
        <Tabs.Screen
          name="setting"
          options={{
            headerShown: false,
            tabBarIcon(...props) {
              return <TabBarIconsMaterialIcons {...props} name="settings" />;
            },
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default RootLayout;
