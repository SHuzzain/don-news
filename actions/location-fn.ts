import env from "@/config/env";
import * as Location from "expo-location";
import { Alert, BackHandler, Linking, Platform } from "react-native";

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
  let { coords } = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  if (coords) {
    const { latitude, longitude } = coords;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${env.GOOGLE_MAP_KEY}`,
    );
    const data = await response.json();
    if (data.status === "OK") {
      return data;
    } else {
      Alert.alert("Error", "Failed to fetch district name.");
    }
  }
  return null;
};
