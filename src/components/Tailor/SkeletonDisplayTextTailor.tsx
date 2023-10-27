import { Link, SkeletonDisplayTextProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const skeletonDisplayTextSizeRecord: Record<
  NonNullable<SkeletonDisplayTextProps["size"]> | "",
  1
> = {
  small: 1,
  medium: 1,
  large: 1,
  extraLarge: 1,
  "": 1,
};

const skeletonDisplayTextPropsItems: PropItem<
  keyof SkeletonDisplayTextProps
>[] = [
  {
    prop: "size",
    type: "Select",
    options: Object.keys(skeletonDisplayTextSizeRecord),
  },
];

export const SkeletonDisplayTextTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/feedback-indicators/skeleton-display-text"
      >
        Skeleton display text
      </Link>

      <TailorList items={skeletonDisplayTextPropsItems} />
    </>
  );
};
