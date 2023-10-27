import { Link, SkeletonPageProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const skeletonPagePropsItems: PropItem<keyof SkeletonPageProps>[] = [
  {
    prop: "title",
    type: "Text",
  },
  {
    prop: "fullWidth",
    type: "Checkbox",
  },
  {
    prop: "narrowWidth",
    type: "Checkbox",
  },
  {
    prop: "primaryAction",
    type: "Checkbox",
  },
  {
    prop: "backAction",
    type: "Checkbox",
  },
];

export const SkeletonPageTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/feedback-indicators/skeleton-page"
      >
        Skeleton page
      </Link>

      <TailorList items={skeletonPagePropsItems} />
    </>
  );
};
