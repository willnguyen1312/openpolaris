import { Link, PageActionsProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const pageActionsPropsItems: PropItem<keyof PageActionsProps>[] = [
  {
    prop: "primaryAction",
    type: "Complex",
  },
  {
    prop: "secondaryActions",
    type: "Complex",
  },
];

export const PageActionsTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/actions/page-actions"
      >
        Page actions
      </Link>

      <TailorList items={pageActionsPropsItems} />
    </>
  );
};
