import { Link, SkeletonTabsProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const skeletonTabsPropsItems: PropItem<keyof SkeletonTabsProps>[] = [
  {
    prop: "count",
    type: "Number",
  },
];

export const SkeletonTabsTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/feedback-indicators/skeleton-tabs"
      >
        Skeleton tabs
      </Link>

      <TailorList items={skeletonTabsPropsItems} />
    </>
  );
};
