import { Redirect, Tabs } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import useSession from "@/hooks/use-auth";

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
  const { session } = useSession();

  if (!session) {
    return <Redirect href={"/auth"} />;
  } else if (!session.user.initial_setup) {
    return <Redirect href={"/(account-setup)"} />;
  }
  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            paddingTop: 5,
            height: 50,
          },
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            headerShown: false,
            tabBarIcon(props) {
              return <TabBarIcons {...props} name="home" />;
            },
          }}
        />
        <Tabs.Screen
          name="setting/index"
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
