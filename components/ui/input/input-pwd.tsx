import React, { useState } from "react";
import { TextInput, TextInputProps, View, ViewProps } from "react-native";
import { Input } from ".";
import { cn } from "@/lib/utils/tw-class";
import { Pressable } from "@/components/primitives/slot";
import { Eye, EyeOff } from "@/lib/icons/Eye";

const InputPwf = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextInputProps & {
    viewProps?: ViewProps;
    isError?: boolean;
    IconPosition?: "right" | "left";
  }
>(({ viewProps, isError, IconPosition = "right", ...props }, ref) => {
  const [visible, setVisible] = useState(true);
  return (
    <View
      {...viewProps}
      className={cn(
        "flex  items-center gap-2 bg-secondary pl-2 pr-5 py-2 rounded-2xl",
        viewProps?.className,
        isError && "border-2 border-red-400",
        IconPosition === "right" ? "flex-row" : "flex-row-reverse",
      )}
    >
      <Input
        placeholder="*******"
        placeholderTextColor={"#192e52"}
        ref={ref}
        secureTextEntry={visible}
        textContentType="password"
        {...props}
        className={cn(
          "flex-1 border-0 bg-transparent text-vogue",
          props?.className,
        )}
      />
      <Pressable onPress={() => setVisible(!visible)}>
        {visible ? (
          <EyeOff size={24} color={isError ? "red" : "#60779a"} />
        ) : (
          <Eye size={24} color={isError ? "red" : "#60779a"} />
        )}
      </Pressable>
    </View>
  );
});

InputPwf.displayName = "InputPwf";

export default InputPwf;
