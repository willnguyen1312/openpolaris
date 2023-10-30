import { ContextualSaveBarProps } from "@shopify/polaris";
import { DocLink, PropItem, TailorList } from "./shared";

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
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/selection-and-input/contextual-save-bar"
      >
        Contextual save bar
      </DocLink>

      <TailorList items={contextualSaveBarPropsItems} />
    </>
  );
};
