import { KeyboardKeyProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const keyboardKeySizeRecord: Record<
  NonNullable<KeyboardKeyProps["size"]> | "",
  1
> = {
  small: 1,
  "": 1,
};
const keyboardKeyOptions = Object.keys(keyboardKeySizeRecord);

const keyboardKeyPropsItems: PropItem<keyof KeyboardKeyProps>[] = [
  {
    prop: "children",
    type: "Text",
  },
  {
    prop: "size",
    type: "Select",
    options: keyboardKeyOptions,
  },
];

export const KeyboardKeyTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/images-and-icons/keyboard-key"
      >
        Keyboard key
      </Link>

      <TailorList items={keyboardKeyPropsItems} />
    </>
  );
};
