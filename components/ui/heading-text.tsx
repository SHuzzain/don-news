import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils/tw-class";
import React from "react";
import { TextProps } from "react-native";

export default function HeadingText({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn(
        `font-JakartaBold text-5xl text-secondary-foreground text-start leading-normal`,
        className,
      )}
      {...props}
    />
  );
}
