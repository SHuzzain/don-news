import { useState, useEffect } from "react";
import { Alert, AppState } from "react-native";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

export const usePermissions = () => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  const requestPermissions = async () => {
    try {
      const { status: locationStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== "granted") {
        Alert.alert(
          "Permission Required",
          "Location access is required for this app.",
        );
        return false;
      }

      const { status: galleryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (galleryStatus !== "granted") {
        Alert.alert(
          "Permission Required",
          "Gallery access is required for this app.",
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error requesting permissions:", error);
      return false;
    }
  };

  useEffect(() => {
    const checkPermissions = async () => {
      const granted = await requestPermissions();
      setPermissionsGranted(granted);
    };

    checkPermissions();

    const subscription = AppState.addEventListener("change", async (state) => {
      if (state === "active") {
        const granted = await requestPermissions();
        setPermissionsGranted(granted);
      }
    });

    return () => subscription.remove();
  }, []);

  return permissionsGranted;
};
