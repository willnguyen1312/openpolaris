import { ColorPickerProps } from "@shopify/polaris";
import { DocLink, PropItem, TailorList } from "./shared";

const colorPickerPropsItems: PropItem<keyof ColorPickerProps>[] = [
  {
    prop: "id",
    type: "Text",
  },
  {
    prop: "color",
    type: "Complex",
  },
  {
    prop: "allowAlpha",
    type: "Checkbox",
  },
  {
    prop: "fullWidth",
    type: "Checkbox",
  },
];

export const ColorPickerTailor = () => {
  return (
    <>
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/selection-and-input/color-picker"
      >
        Color picker
      </DocLink>

      <TailorList items={colorPickerPropsItems} />
    </>
  );
};
