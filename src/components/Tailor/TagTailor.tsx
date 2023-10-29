import { Link, TagProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const tagPropsItems: PropItem<keyof TagProps>[] = [
  {
    prop: "children",
    type: "Text",
  },
  {
    prop: "accessibilityLabel",
    type: "Text",
  },
  {
    prop: "disabled",
    type: "Checkbox",
  },
  {
    prop: "url",
    type: "Text",
  },
];

export const TagTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/selection-and-input/tag"
      >
        Tag
      </Link>

      <TailorList items={tagPropsItems} />
    </>
  );
};
