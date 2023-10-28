import { ColorPickerProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

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
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/selection-and-input/color-picker"
      >
        Color picker
      </Link>

      <TailorList items={colorPickerPropsItems} />
    </>
  );
};
