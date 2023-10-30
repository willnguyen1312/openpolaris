import {} from "@shopify/polaris";
import { MediaCardProps } from "../../types";
import { DocLink, PropItem, TailorList } from "./shared";

const mediaCardSizeRecord: Record<
  NonNullable<MediaCardProps["size"] | "">,
  1
> = {
  medium: 1,
  small: 1,
  "": 1,
};
const mediaCardSizeOptions = Object.keys(mediaCardSizeRecord);

const mediaCardPropsItems: PropItem<keyof MediaCardProps>[] = [
  {
    prop: "title",
    type: "Text",
  },
  {
    prop: "description",
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
  {
    prop: "portrait",
    type: "Checkbox",
  },
  {
    prop: "size",
    type: "Select",
    options: mediaCardSizeOptions,
  },
  {
    prop: "popoverActions",
    type: "Complex",
  },
];

export const MediaCardTailor = () => {
  return (
    <>
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/media-card"
      >
        Media card
      </DocLink>

      <TailorList items={mediaCardPropsItems} />
    </>
  );
};
