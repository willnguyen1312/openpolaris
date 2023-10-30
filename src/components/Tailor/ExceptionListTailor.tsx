import { ExceptionListProps } from "@shopify/polaris";
import { DocLink, PropItem, TailorList } from "./shared";

const exceptionListPropsItems: PropItem<keyof ExceptionListProps>[] = [
  {
    prop: "items",
    type: "Complex",
  },
];

export const ExceptionListTailor = () => {
  return (
    <>
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/feedback-indicators/exception-list"
      >
        Exception list
      </DocLink>

      <TailorList items={exceptionListPropsItems} />
    </>
  );
};
