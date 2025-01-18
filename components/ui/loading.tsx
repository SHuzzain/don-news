"use client";
import { ActivityIndicator } from "react-native";
import React from "react";
import { cssInterop } from "nativewind";
import { cn } from "@/lib/utils/tw-class";

cssInterop(ActivityIndicator, {
  className: { target: "style", nativeStyleToProp: { color: true } },
});

const Spinner = React.forwardRef<
  React.ElementRef<typeof ActivityIndicator>,
  React.ComponentProps<typeof ActivityIndicator>
>(
  (
    {
      className,
      color,
      focusable = false,
      "aria-label": ariaLabel = "loading",
      ...props
    },
    ref,
  ) => {
    return (
      <ActivityIndicator
        ref={ref}
        focusable={focusable}
        aria-label={ariaLabel}
        {...props}
        color={color}
        className={cn(className)}
      />
    );
  },
);

Spinner.displayName = "Spinner";

export { Spinner };
