import { Link, ProgressBarProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const progressBarSizeRecord: Record<
  NonNullable<ProgressBarProps["size"] | "">,
  1
> = {
  large: 1,
  medium: 1,
  small: 1,
  "": 1,
};

const progressBarToneRecord: Record<
  NonNullable<ProgressBarProps["tone"] | "">,
  1
> = {
  critical: 1,
  highlight: 1,
  primary: 1,
  success: 1,
  "": 1,
};

const progressBarPropsItems: PropItem<keyof ProgressBarProps>[] = [
  {
    prop: "animated",
    type: "Checkbox",
  },
  {
    prop: "ariaLabelledBy",
    type: "Text",
  },
  {
    prop: "progress",
    type: "Number",
  },
  {
    prop: "size",
    type: "Select",
    options: Object.keys(progressBarSizeRecord),
  },
  {
    prop: "tone",
    type: "Select",
    options: Object.keys(progressBarToneRecord),
  },
];

export const ProgressBarTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/feedback-indicators/progress-bar"
      >
        Progress bar
      </Link>

      <TailorList items={progressBarPropsItems} />
    </>
  );
};
