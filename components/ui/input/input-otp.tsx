import React from "react";
import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { cn } from "@/lib/utils/tw-class";
import { Input } from "./index";

type OTPInputProps = {
  maxLength: number;
  onSubmit: (otp: string) => void;
};
const OTPInput: React.FC<OTPInputProps> = ({ maxLength, onSubmit }) => {
  const { control, handleSubmit, setFocus } = useForm({
    defaultValues: {
      otp: Array(maxLength).fill(""),
    },
  });

  const handleInputChange = (
    value: string,
    index: number,
    onChange: (text: string) => void,
  ) => {
    onChange(value.slice(-1)); // Allow only one character per input
    if (value && index < maxLength - 1) {
      setFocus(`otp.${index + 1}`); // Move to the next input
    } else if (index === maxLength - 1 && value) {
      handleSubmit((data) => onSubmit(data.otp.join("")))();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && index > 0) {
      setFocus(`otp.${index - 1}`); // Move back to the previous input
    }
  };
  return (
    <View className="flex flex-row justify-between items-center gap-2">
      {Array.from({ length: maxLength }).map((_, index) => (
        <Controller
          key={index}
          name={`otp.${index}`}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <View
              className={cn(
                "flex-1  rounded-3xl h-[66px] overflow-hidden",
                value ? "bg-vogue " : "bg-secondary",
              )}
            >
              <Input
                ref={ref}
                className={cn(
                  "w-full bg-transparent border-gray-300 border flex-1 rounded-3xl text-2xl text-center text-white",
                )}
                value={value}
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={(text) =>
                  handleInputChange(text, index, onChange)
                }
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            </View>
          )}
        />
      ))}
    </View>
  );
};

export default OTPInput;
