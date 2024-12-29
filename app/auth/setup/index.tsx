import React from "react";
import SetUpCard from "@/features/auth/pages/setup-card";
import * as Location from "expo-location";
import { ActivityIndicator, Alert } from "react-native";
import { useQuery } from "@tanstack/react-query";

export default function SetUpScreen() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["userLocation"],
    queryFn: fetchCity,
  });

  async function fetchCity() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      return address;
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to fetch city.");
    } finally {
    }
  }
  if (isLoading || !data) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return <SetUpCard data={data} />;
}
