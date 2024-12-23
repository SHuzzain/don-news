import { TextInput, TextInputProps, View, ViewProps } from "react-native";
import React from "react";
import { Input } from ".";
import { cn } from "@/lib/utils";

const InputIcon = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextInputProps & {
    viewProps?: ViewProps;
    iconPosition?: "left" | "right";
    isError: boolean;
  }
>(({ viewProps, children, iconPosition, isError, ...props }, ref) => {
  return (
    <View
      {...viewProps}
      className={cn(
        "flex flex-row items-center gap-2 bg-secondary pl-2 pr-5 py-2 rounded-2xl",
        viewProps?.className,
        isError && "border-2 border-red-400",
      )}
    >
      {iconPosition === "left" && children}
      <Input
        placeholderTextColor={"#192e52"}
        {...props}
        ref={ref}
        className="flex-1 border-0 bg-transparent text-vogue"
      />
      {iconPosition === "right" && children}
    </View>
  );
});

InputIcon.displayName = "InputIcon";

export default InputIcon;
