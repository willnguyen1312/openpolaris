import { Link, SkeletonThumbnailProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const skeletonThumbnailSizeRecord: Record<
  NonNullable<SkeletonThumbnailProps["size"]> | "",
  1
> = {
  extraSmall: 1,
  small: 1,
  medium: 1,
  large: 1,
  "": 1,
};

const skeletonThumbnailPropsItems: PropItem<keyof SkeletonThumbnailProps>[] = [
  {
    prop: "size",
    type: "Select",
    options: Object.keys(skeletonThumbnailSizeRecord),
  },
];

export const SkeletonThumbnailTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/feedback-indicators/skeleton-thumbnail"
      >
        Skeleton thumbnail
      </Link>

      <TailorList items={skeletonThumbnailPropsItems} />
    </>
  );
};
