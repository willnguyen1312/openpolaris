import { Link, ThumbnailProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const thumbnailSizeRecord: Record<NonNullable<ThumbnailProps["size"]> | "", 1> =
  {
    extraSmall: 1,
    small: 1,
    medium: 1,
    large: 1,
    "": 1,
  };
const thumbnailSizeOptions = Object.keys(thumbnailSizeRecord);

const thumbnailPropsItems: PropItem<keyof ThumbnailProps>[] = [
  {
    prop: "size",
    type: "Select",
    options: thumbnailSizeOptions,
  },
  {
    prop: "source",
    type: "Text",
  },
  {
    prop: "alt",
    type: "Text",
  },
  {
    prop: "transparent",
    type: "Checkbox",
  },
];

export const ThumbnailTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/images-and-icons/thumbnail"
      >
        Thumbnail
      </Link>

      <TailorList items={thumbnailPropsItems} />
    </>
  );
};
