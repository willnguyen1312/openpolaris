import { IconProps } from "@shopify/polaris";
import { DocLink, PropItem, TailorList } from "./shared";

const iconToneRecord: Record<NonNullable<IconProps["tone"] | "">, 1> = {
  base: 1,
  caution: 1,
  critical: 1,
  emphasis: 1,
  info: 1,
  inherit: 1,
  interactive: 1,
  magic: 1,
  primary: 1,
  subdued: 1,
  success: 1,
  textCaution: 1,
  textCritical: 1,
  textInfo: 1,
  textMagic: 1,
  textPrimary: 1,
  textSuccess: 1,
  textWarning: 1,
  warning: 1,
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
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/images-and-icons/icon"
      >
        Icon
      </DocLink>

      <TailorList items={iconPropsItems} />
    </>
  );
};
