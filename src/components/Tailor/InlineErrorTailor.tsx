import { InlineErrorProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

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
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/feedback-indicators/skeleton-display-text"
      >
        Skeleton display text
      </Link>

      <TailorList items={inlineErrorPropsItems} />
    </>
  );
};
