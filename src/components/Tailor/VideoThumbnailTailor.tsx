import { Link } from "@shopify/polaris";
import { VideoThumbnailProps } from "@shopify/polaris/build/ts/src/components/VideoThumbnail";
import { PropItem, TailorList } from "./shared";

const videoThumbnailPropsItems: PropItem<keyof VideoThumbnailProps>[] = [
  {
    prop: "thumbnailUrl",
    type: "Text",
  },
  {
    prop: "videoLength",
    type: "Number",
  },
  {
    prop: "videoProgress",
    type: "Number",
  },
  {
    prop: "showVideoProgress",
    type: "Checkbox",
  },
  {
    prop: "accessibilityLabel",
    type: "Text",
  },
];

export const VideoThumbnailTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/images-and-icons/video-thumbnail"
      >
        Video thumbnail
      </Link>

      <TailorList items={videoThumbnailPropsItems} />
    </>
  );
};
