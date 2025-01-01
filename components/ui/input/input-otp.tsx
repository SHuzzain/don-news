import React, { useRef } from "react";
import { View, TextInput } from "react-native";
import { cn } from "@/lib/utils/tw-class";
import { Input } from "./index";

type OTPInputProps = {
  maxLength: number;
  autoTrigger: (otp: string[]) => void;
  onChange: (otp: string[]) => void;
  otpValue: string[];
};

const OTPInput: React.FC<OTPInputProps> = ({
  maxLength,
  autoTrigger,
  onChange,
  otpValue,
}) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleInputChange = (value: string, index: number) => {
    const newOtp = [...otpValue];
    newOtp[index] = value.slice(-1); // Allow only one character per input
    onChange(newOtp);

    // Check if all fields are filled
    if (newOtp.every((digit) => digit)) {
      autoTrigger(newOtp); // Trigger form submission
    } else if (value && index < maxLength - 1) {
      inputRefs.current[index + 1]?.focus(); // Move to the next input
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && !otpValue[index]) {
      inputRefs.current[index - 1]?.focus(); // Move back to the previous input
    }
  };

  return (
    <View className="flex flex-row justify-between items-center gap-2">
      {Array.from({ length: maxLength }).map((_, index) => (
        <View
          key={index}
          className={cn(
            "flex-1 rounded-3xl h-[66px] overflow-hidden",
            otpValue[index] ? "bg-vogue" : "bg-secondary",
          )}
        >
          <Input
            ref={(el) => (inputRefs.current[index] = el)}
            className={cn(
              "w-full bg-transparent border-gray-300 border flex-1 rounded-3xl text-2xl text-center text-white",
            )}
            value={otpValue[index]}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleInputChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        </View>
      ))}
    </View>
  );
};

export default OTPInput;
