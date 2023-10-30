import { InlineErrorProps } from "@shopify/polaris";
import { DocLink, PropItem, TailorList } from "./shared";

const inlineErrorPropsItems: PropItem<keyof InlineErrorProps>[] = [
  {
    prop: "fieldID",
    type: "Text",
  },
  {
    prop: "message",
    type: "Text",
  },
];

export const InlineErrorTailor = () => {
  return (
    <>
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/selection-and-input/inline-error"
      >
        Inline Error
      </DocLink>

      <TailorList items={inlineErrorPropsItems} />
    </>
  );
};
