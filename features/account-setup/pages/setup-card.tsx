import { View } from "react-native";
import React, { useRef } from "react";
import Swiper from "react-native-swiper";
import CityArea from "../components/city-area";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SectionView from "@/components/layout/section-view";
import { BlurView } from "expo-blur";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import StackHeader from "@/components/ui/stack-header";
import { router } from "expo-router";
import Topic from "../components/topic";
import { setupSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import NewsSources from "../components/news-sources";
import SubmitForm from "../components/submit-form";
import { accountSetUp, getCityName } from "../action";
import useSession from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/loading";

export default function SetUpCard() {
  const swiperRef = useRef<Swiper>(null);
  const form = useForm<z.infer<typeof setupSchema>>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      newsSources: [],
      primaryArea: "",
      topics: [],
      avatar: "",
      username: "",
    },
  });
  const { session } = useSession();

  const { data, isFetching } = useQuery({
    queryKey: ["get-geolocation"],
    queryFn: getCityName,
  });

  async function onSubmit(values: z.infer<typeof setupSchema>) {
    if (!session?.user) return false;

    const success = await accountSetUp(values, session?.user);
    if (success) {
      router.reload();
    }
  }

  const handleBack = () => {
    if (swiperRef.current) {
      const currentIndex = (swiperRef.current.state as { index: number }).index;
      if (Boolean(currentIndex)) {
        swiperRef.current.scrollTo(currentIndex - 1);
      } else {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.push("/auth");
        }
      }
    }
  };

  if (isFetching) {
    return <Spinner className="text-red-300" />;
  }

  return (
    <View className="flex-1 gap-5 bg-background">
      <StackHeader callBack={handleBack} />
      <Form {...form}>
        <Swiper ref={swiperRef} loop={false} showsPagination={false}>
          <SectionView className="relative flex-1 gap-5">
            <CityArea cityName={data?.city ?? null} />
            <BlurView
              intensity={10}
              experimentalBlurMethod="dimezisBlurView"
              className="bottom-0 absolute justify-center px-5 w-full h-24"
            >
              <Button
                onPress={() => swiperRef.current?.scrollTo(1)}
                className="rounded-2xl"
              >
                <Text className="text-white">Next</Text>
              </Button>
            </BlurView>
          </SectionView>

          <SectionView className="relative flex-1 gap-5">
            <Topic />
            <BlurView
              intensity={10}
              experimentalBlurMethod="dimezisBlurView"
              className="bottom-0 absolute justify-center px-5 w-full h-24"
            >
              <Button
                onPress={() => swiperRef.current?.scrollTo(2)}
                className="rounded-2xl"
              >
                <Text className="text-white">Next</Text>
              </Button>
            </BlurView>
          </SectionView>

          <SectionView className="relative flex-1 gap-5">
            <NewsSources />
            <BlurView
              intensity={10}
              experimentalBlurMethod="dimezisBlurView"
              className="bottom-0 absolute justify-center px-5 w-full h-24"
            >
              <Button
                onPress={() => swiperRef.current?.scrollTo(3)}
                className="rounded-2xl"
              >
                <Text className="text-white">Next</Text>
              </Button>
            </BlurView>
          </SectionView>

          <SectionView className="relative flex-1 gap-5">
            <SubmitForm />
            <BlurView
              intensity={10}
              className="bottom-0 absolute justify-center px-5 w-full h-24"
            >
              <Button
                onPress={form.handleSubmit(onSubmit)}
                className="rounded-2xl"
              >
                <Text className="text-white">Sumbit</Text>
              </Button>
            </BlurView>
          </SectionView>
        </Swiper>
      </Form>
    </View>
  );
}
