import { BannerProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const bannerToneRecord: Record<NonNullable<BannerProps["tone"] | "">, 1> = {
  critical: 1,
  info: 1,
  success: 1,
  warning: 1,
  "": 1,
};

const bannerPropsItems: PropItem<keyof BannerProps>[] = [
  {
    prop: "title",
    type: "Text",
  },
  {
    prop: "icon",
    type: "Icon",
  },
  {
    prop: "hideIcon",
    type: "Checkbox",
  },
  {
    prop: "tone",
    type: "Select",
    options: Object.keys(bannerToneRecord),
  },
  {
    prop: "stopAnnouncements",
    type: "Checkbox",
  },
  {
    prop: "action",
    type: "Complex",
  },
  {
    prop: "secondaryAction",
    type: "Complex",
  },
];

export const BannerTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/feedback-indicators/banner"
      >
        Banner
      </Link>

      <TailorList items={bannerPropsItems} />
    </>
  );
};
