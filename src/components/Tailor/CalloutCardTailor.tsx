import { CalloutCardProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const calloutCardPropsItems: PropItem<keyof CalloutCardProps>[] = [
  {
    prop: "title",
    type: "Text",
  },
  {
    prop: "illustration",
    type: "Text",
  },
  {
    prop: "primaryAction",
    type: "Complex",
  },
  {
    prop: "secondaryAction",
    type: "Complex",
  },
];

export const CalloutCardTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/callout-card"
      >
        Callout card
      </Link>

      <TailorList items={calloutCardPropsItems} />
    </>
  );
};
