import { BadgeProps, Link } from "@shopify/polaris";
import { tones } from "../../types";
import { PropItem, TailorList } from "./shared";

const badgeProgressRecord: Record<NonNullable<BadgeProps["progress"]> | "", 1> =
  {
    complete: 1,
    incomplete: 1,
    partiallyComplete: 1,
    "": 1,
  };

const badgeSizeRecord: Record<NonNullable<BadgeProps["size"] | "">, 1> = {
  large: 1,
  medium: 1,
  small: 1,
  "": 1,
};

const badgePropsItems: PropItem<keyof BadgeProps>[] = [
  {
    prop: "children",
    type: "Text",
  },
  {
    prop: "icon",
    type: "Icon",
  },
  {
    prop: "progress",
    type: "Select",
    options: Object.keys(badgeProgressRecord),
  },
  {
    prop: "size",
    type: "Select",
    options: Object.keys(badgeSizeRecord),
  },
  {
    prop: "tone",
    type: "Select",
    options: tones,
  },
  {
    prop: "toneAndProgressLabelOverride",
    type: "Text",
  },
];

export const BadgeTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/feedback-indicators/badge"
      >
        Badge
      </Link>

      <TailorList items={badgePropsItems} />
    </>
  );
};
