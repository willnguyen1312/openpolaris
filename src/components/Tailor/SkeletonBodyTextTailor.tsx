import { Link, SkeletonBodyTextProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const skeletonBodyTextPropsItems: PropItem<keyof SkeletonBodyTextProps>[] = [
  {
    prop: "lines",
    type: "Number",
  },
];

export const SkeletonBodyTextTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/feedback-indicators/skeleton-body-text"
      >
        Skeleton body text
      </Link>

      <TailorList items={skeletonBodyTextPropsItems} />
    </>
  );
};
