import { ToasterToast, useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { View } from "react-native";
import { MotiView, AnimatePresence } from "moti";
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <ToastProvider name="toast-name">
      <ToastViewport>
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onDismiss={() => dismiss(toast.id)}
            />
          ))}
        </AnimatePresence>
      </ToastViewport>
    </ToastProvider>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToasterToast;
  onDismiss: () => void;
}) {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    translateX.value = event.nativeEvent.translationX;
  };

  const onGestureEnd = (
    event: HandlerStateChangeEvent<Record<string, unknown>>,
  ) => {
    const { translationX } =
      event.nativeEvent as unknown as PanGestureHandlerGestureEvent["nativeEvent"];

    if (Math.abs(translationX) > 100) {
      translateX.value = withTiming(
        translationX > 0 ? 300 : -300,
        { duration: 200 },
        () => {
          runOnJS(onDismiss)();
        },
      );
    } else {
      translateX.value = withSpring(0);
    }
  };

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={onGestureEnd}>
      <MotiView
        from={{ opacity: 0, translateY: -10, scale: 0.95 }}
        animate={{ opacity: 1, translateY: 0, scale: 1 }}
        exit={{ opacity: 0, translateY: -10, scale: 0.95 }}
        transition={{ type: "spring", damping: 12, stiffness: 120 }}
        style={animatedStyle}
      >
        {toast.open && (
          <Toast {...toast} open>
            <View className="gap-1 grid">
              {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
              {toast.description && (
                <ToastDescription>{toast.description}</ToastDescription>
              )}
            </View>
            {toast.action}
            {/* <ToastClose /> */}
          </Toast>
        )}
      </MotiView>
    </PanGestureHandler>
  );
}
