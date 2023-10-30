import {} from "@shopify/polaris";
import { FormLayoutGroupProps } from "../../types";
import { DocLink, PropItem, TailorList } from "./shared";

const formLayoutGroupPropsItems: PropItem<keyof FormLayoutGroupProps>[] = [
  {
    prop: "condensed",
    type: "Checkbox",
  },
  {
    prop: "title",
    type: "Text",
  },
  {
    prop: "helpText",
    type: "Text",
  },
];

export const FormLayoutGroupTailor = () => {
  return (
    <>
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/form-layout"
      >
        Form layout
      </DocLink>

      <TailorList items={formLayoutGroupPropsItems} />
    </>
  );
};
