import React, { createContext } from "react";
import { View } from "react-native";
import { useColorScheme } from "nativewind";
import { themes } from "@/lib/utils/color-theme";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface ThemeProviderProps {
  children: React.ReactNode;
}
export const ThemeContext = createContext<{
  theme: "light" | "dark";
}>({
  theme: "light",
});
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { colorScheme } = useColorScheme();
  return (
    <ThemeContext.Provider value={{ theme: colorScheme! }}>
      <SafeAreaProvider>
        <View style={themes[colorScheme!]} className="flex-1">
          {children}
        </View>
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
};
