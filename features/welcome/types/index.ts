type TextType =
  | { white: string }
  | { primary: string }
  | { combine: { primary: string; white: string } }
  | { combineW: { primary: string; white: string } };

export interface SlideItem {
  img: any;
  buttonText: string;
  text: TextType[];
}
