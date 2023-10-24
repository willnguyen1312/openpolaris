import { IconProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const iconToneRecord: Record<NonNullable<IconProps["tone"] | "">, 1> = {
  base: 1,
  subdued: 1,
  caution: 1,
  warning: 1,
  critical: 1,
  interactive: 1,
  info: 1,
  success: 1,
  primary: 1,
  emphasis: 1,
  magic: 1,
  textCaution: 1,
  textWarning: 1,
  textCritical: 1,
  textInfo: 1,
  textSuccess: 1,
  textPrimary: 1,
  textMagic: 1,
  "": 1,
};
const iconToneOptions = Object.keys(iconToneRecord);

const iconPropsItems: PropItem<keyof IconProps>[] = [
  {
    prop: "source",
    type: "Icon",
  },
  {
    prop: "tone",
    type: "Select",
    options: iconToneOptions,
  },
  {
    prop: "accessibilityLabel",
    type: "Text",
  },
];

export const IconTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/images-and-icons/icon"
      >
        Icon
      </Link>

      <TailorList items={iconPropsItems} />
    </>
  );
};
