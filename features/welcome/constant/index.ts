import { SlideItem } from "../types";

export const sliderData: SlideItem[] = [
  {
    img: require("@/assets/images/welcome1.png"),
    buttonText: "Next",
    text: [
      { white: "Get the latest" },
      { white: "news from" },
      { primary: "reliable" },
      {
        combine: {
          primary: "source",
          white: ".",
        },
      },
    ],
  },
  {
    img: require("@/assets/images/welcome2.png"),
    buttonText: "Next",
    text: [
      {
        combineW: {
          primary: "Still ",
          white: "Up to date",
        },
      },
      { white: "New from all" },
      { white: "around the" },
      { white: "world" },
    ],
  },
  {
    img: require("@/assets/images/welcome.png"),
    buttonText: "Sign Up",
    text: [
      {
        combineW: {
          primary: "Still",
          white: "Up to date",
        },
      },
      { white: "New from all" },
      { white: "around the" },
      { white: "world" },
    ],
  },
];
