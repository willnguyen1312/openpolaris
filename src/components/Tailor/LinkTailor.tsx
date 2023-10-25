import { Link, LinkProps } from "@shopify/polaris";
import { targetOptions } from "../../types";
import { PropItem, TailorList } from "./shared";

const linkPropsItems: PropItem<keyof LinkProps>[] = [
  {
    prop: "children",
    type: "Text",
  },
  {
    prop: "id",
    type: "Text",
  },
  {
    prop: "url",
    type: "Text",
  },
  {
    prop: "target",
    type: "Select",
    options: targetOptions,
  },
  {
    prop: "monochrome",
    type: "Checkbox",
  },
  {
    prop: "removeUnderline",
    type: "Checkbox",
  },
  {
    prop: "accessibilityLabel",
    type: "Text",
  },
  {
    prop: "dataPrimaryLink",
    type: "Checkbox",
  },
];

export const LinkTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/navigation/link"
      >
        Link
      </Link>

      <TailorList items={linkPropsItems} />
    </>
  );
};
