import { Link, TextProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const buttonTextAlignRecord: Record<
  NonNullable<TextProps["alignment"] | "">,
  1
> = {
  start: 1,
  center: 1,
  end: 1,
  justify: 1,
  "": 1,
};

const buttonTextAligns = Object.keys(buttonTextAlignRecord) as NonNullable<
  TextProps["alignment"]
>[];

const textAsRecord: Record<NonNullable<TextProps["as"] | "">, 1> = {
  dt: 1,
  dd: 1,
  h1: 1,
  h2: 1,
  h3: 1,
  h4: 1,
  h5: 1,
  h6: 1,
  p: 1,
  span: 1,
  strong: 1,
  legend: 1,
  "": 1,
};
const textAsOptions = Object.keys(textAsRecord);

const textToneRecord: Record<NonNullable<TextProps["tone"] | "">, 1> = {
  success: 1,
  subdued: 1,
  magic: 1,
  inherit: 1,
  disabled: 1,
  critical: 1,
  caution: 1,
  base: 1,
  "text-inverse": 1,
  "text-inverse-secondary": 1,
  "magic-subdued": 1,
  "": 1,
};
const textToneOptions = Object.keys(textToneRecord);

const fontWeightRecord: Record<NonNullable<TextProps["fontWeight"] | "">, 1> = {
  regular: 1,
  medium: 1,
  semibold: 1,
  bold: 1,
  "": 1,
};
const fontWeightOptions = Object.keys(fontWeightRecord);

const textVariantRecord: Record<NonNullable<TextProps["variant"] | "">, 1> = {
  headingXs: 1,
  headingSm: 1,
  headingMd: 1,
  headingLg: 1,
  headingXl: 1,
  heading2xl: 1,
  heading3xl: 1,
  bodySm: 1,
  bodyMd: 1,
  bodyLg: 1,
  bodyXs: 1,
  "": 1,
};
const textVariantOptions = Object.keys(textVariantRecord);

const textDecorationLineRecord: Record<
  NonNullable<TextProps["textDecorationLine"] | "">,
  1
> = {
  "line-through": 1,
  "": 1,
};
const textDecorationLineOptions = Object.keys(textDecorationLineRecord);

const textPropsItems: PropItem<keyof TextProps>[] = [
  {
    prop: "alignment",
    type: "Select",
    options: buttonTextAligns,
  },
  {
    prop: "as",
    type: "Select",
    options: textAsOptions,
  },
  {
    prop: "breakWord",
    type: "Checkbox",
  },
  {
    prop: "children",
    type: "Text",
  },
  {
    prop: "tone",
    type: "Select",
    options: textToneOptions,
  },
  {
    prop: "fontWeight",
    type: "Select",
    options: fontWeightOptions,
  },
  {
    prop: "id",
    type: "Text",
  },
  {
    prop: "numeric",
    type: "Checkbox",
  },
  {
    prop: "truncate",
    type: "Checkbox",
  },
  {
    prop: "variant",
    type: "Select",
    options: textVariantOptions,
  },
  {
    prop: "visuallyHidden",
    type: "Checkbox",
  },
  {
    prop: "textDecorationLine",
    type: "Select",
    options: textDecorationLineOptions,
  },
];

export const TextTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/typography/text"
      >
        Text
      </Link>

      <TailorList items={textPropsItems} />
    </>
  );
};
