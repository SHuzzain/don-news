import env from "@/config/env";
import * as Location from "expo-location";
import { Alert, BackHandler, Linking, Platform } from "react-native";
import axios from "axios";

export const requestPermissions = async () => {
  try {
    const { status: locationStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (locationStatus !== "granted") {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error requesting permissions:", error);
    return false;
  }
};

export const handlePermissionError = () => {
  const openSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:").catch((err) =>
        console.error("Couldn't open settings", err),
      );
    } else if (Platform.OS === "android") {
      Linking.openSettings().catch((err) =>
        console.error("Couldn't open settings", err),
      );
    }
  };

  Alert.alert(
    "Location Permission Required",
    "We need your location permission to proceed.",
    [
      {
        text: "Exit",
        style: "destructive",
        onPress: () => Platform.OS === "android" && BackHandler.exitApp(),
      },
      {
        text: "Go to Settings",
        onPress: openSettings,
      },
    ],
    { cancelable: false },
  );
};

export const getLocationInfo = async () => {
  try {
    const response = await axios(
      `https://api.geoapify.com/v1/ipinfo?apiKey=${env.API_KEY}`,
    );
    if (response.status === 200) {
      console.log({ response: response.data });
      return response.data;
    } else {
      Alert.alert("Error", "Failed to fetch district name.");
    }
    return null;
  } catch (e) {
    console.error("Error fetching location info:", e);
    return null;
  }
};
