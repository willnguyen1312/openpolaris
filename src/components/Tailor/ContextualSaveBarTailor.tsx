import { ContextualSaveBarProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const contextualSaveBarPropsItems: PropItem<keyof ContextualSaveBarProps>[] = [
  {
    prop: "alignContentFlush",
    type: "Checkbox",
  },
  {
    prop: "message",
    type: "Text",
  },
  {
    prop: "fullWidth",
    type: "Checkbox",
  },
  {
    prop: "saveAction",
    type: "Complex",
  },
  {
    prop: "discardAction",
    type: "Complex",
  },
];

export const ContextualSaveBarTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/selection-and-input/contextual-save-bar"
      >
        Contextual save bar
      </Link>

      <TailorList items={contextualSaveBarPropsItems} />
    </>
  );
};
