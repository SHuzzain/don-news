import React, { useEffect } from "react";
import SetUpCard from "@/features/account-setup/pages/setup-card";
import { Alert, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import {
  handlePermissionError,
  requestPermissions,
} from "@/actions/location-fn";
import { SplashScreen } from "expo-router";
import { Spinner } from "@/components/ui/loading";
import { Text } from "@/components/ui/text";

SplashScreen.preventAutoHideAsync();

export default function SetUpScreen() {
  const { data, isFetching, isFetched, isError, error } = useQuery({
    queryKey: ["get-permission"],
    queryFn: requestPermissions,
    retry: 2,
  });

  useEffect(() => {
    if (isFetched) {
      SplashScreen.hideAsync();
    }
  }, [isFetched]);

  if (isFetching) {
    return <Spinner className="text-red-300" />;
  }

  if (isFetched) {
    if (isError) {
      Alert.alert("Error", `Failed to get permission: ${error.message}`);
      return <View></View>;
    }

    if (data) {
      return <SetUpCard data={{ city: "periyapattinam" }} />;
    } else {
      handlePermissionError();
      return <Text>hello</Text>;
    }
  }

  return null;
}
