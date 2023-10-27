import { ExceptionListProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const exceptionListPropsItems: PropItem<keyof ExceptionListProps>[] = [
  {
    prop: "items",
    type: "Complex",
  },
];

export const ExceptionListTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/feedback-indicators/exception-list"
      >
        Exception list
      </Link>

      <TailorList items={exceptionListPropsItems} />
    </>
  );
};
