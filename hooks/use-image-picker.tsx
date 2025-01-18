import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

interface ImagePickerOptions {
  mediaTypes?: ImagePicker.MediaType;
  allowsEditing?: boolean;
  aspect?: [number, number];
  quality?: number;
}

export const useImagePicker = (options?: ImagePickerOptions) => {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: options?.mediaTypes || "images",
        allowsEditing: options?.allowsEditing || false,
        aspect: options?.aspect || undefined,
        quality: options?.quality || 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setError(null);
        return result;
      } else {
        setError("Image picking was canceled");
        return null;
      }
    } catch (err) {
      setError("");
      console.error(err);
      return null;
    }
  };

  return { image, pickImage, error, setImage };
};
