import React, { useState } from "react";
import { TextInput, TextInputProps, View, ViewProps } from "react-native";
import MaterialIocs from "react-native-vector-icons/MaterialCommunityIcons";
import { Input } from ".";
import { cn } from "@/lib/utils";

const InputPwf = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextInputProps & { viewProps?: ViewProps; isError?: boolean }
>(({ viewProps, isError, ...props }, ref) => {
  const [visible, setVisible] = useState(true);
  return (
    <View
      {...viewProps}
      className={cn(
        "flex flex-row items-center gap-2 bg-secondary pl-2 pr-5 py-2 rounded-2xl",
        viewProps?.className,
        isError && "border-2 border-red-400",
      )}
    >
      <Input
        placeholder="*******"
        placeholderTextColor={"#192e52"}
        ref={ref}
        secureTextEntry={true}
        textContentType="password"
        {...props}
        className={cn(
          "flex-1 border-0 bg-transparent text-vogue",
          props?.className,
        )}
      />

      <MaterialIocs
        onPress={() => setVisible(!visible)}
        name={visible ? "eye-off-outline" : "eye-outline"}
        color={isError ? "red" : "#60779a"}
        size={24}
      />
    </View>
  );
});

InputPwf.displayName = "InputPwf";

export default InputPwf;
