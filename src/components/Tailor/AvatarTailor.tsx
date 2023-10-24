import { AvatarProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const avatarSizeRecord: Record<NonNullable<AvatarProps["size"] | "">, 1> = {
  xs: 1,
  sm: 1,
  md: 1,
  lg: 1,
  xl: 1,
  "": 1,
};
const avatarSizeOptions = Object.keys(avatarSizeRecord);

const avatarPropsItems: PropItem<keyof AvatarProps>[] = [
  {
    prop: "size",
    type: "Select",
    options: avatarSizeOptions,
  },
  {
    prop: "name",
    type: "Text",
  },
  {
    prop: "initials",
    type: "Text",
  },
  {
    prop: "customer",
    type: "Checkbox",
  },
  {
    prop: "source",
    type: "Text",
  },
  {
    prop: "accessibilityLabel",
    type: "Text",
  },
];

export const AvatarTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/images-and-icons/avatar"
      >
        Avatar
      </Link>

      <TailorList items={avatarPropsItems} />
    </>
  );
};
