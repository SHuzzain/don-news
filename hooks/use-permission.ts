import { useState, useEffect } from "react";
import * as Location from "expo-location";

export const usePermissions = () => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  const requestPermissions = async () => {
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

  useEffect(() => {
    const checkPermissions = async () => {
      const granted = await requestPermissions();
      setPermissionsGranted(granted);
    };

    checkPermissions();
  }, []);

  return permissionsGranted;
};
