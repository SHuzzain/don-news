import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils/tw-class";
import { usePathname } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";

export default function TabAuthLayout() {
  const pathname = usePathname();
  return (
    <Tabs>
      <TabList className="flex gap-5 bg-background py-10 p-5">
        <TabTrigger name="sign-in" href="/(auth)/(tab)/sign-in" asChild>
          <Button
            className={cn(
              " py-1 native:py-1 rounded-3xl native:h-10",
              pathname === "/sign-in" ? "bg-vogue" : "bg-secondary",
            )}
          >
            <Text
              className={cn(
                "px-2 text-base text-white",
                pathname === "/sign-in" ? "text-white" : "text-vogue",
              )}
            >
              Sign In
            </Text>
          </Button>
        </TabTrigger>
        <TabTrigger
          className="mr-auto"
          name="sign-up"
          href="/(auth)/(tab)/sign-up"
          asChild
        >
          <Button
            className={cn(
              " py-1 native:py-1 rounded-3xl native:h-10 ",
              pathname === "/sign-up" ? "bg-vogue" : "bg-secondary",
            )}
          >
            <Text
              className={cn(
                "px-2 text-base text-white",
                pathname === "/sign-up" ? "text-white" : "text-vogue",
              )}
            >
              Sign Up
            </Text>
          </Button>
        </TabTrigger>
      </TabList>
      <TabSlot />
    </Tabs>
  );
}
