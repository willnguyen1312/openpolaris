import { ButtonGroupProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

type ButtonGroupGap = NonNullable<ButtonGroupProps["gap"]>;
const buttonGroupGaps: ButtonGroupGap[] = ["tight", "loose", "extraTight"];

type ButtonGroupVariant = NonNullable<ButtonGroupProps["variant"]> | "";
const buttonGroupVariants: ButtonGroupVariant[] = ["segmented", ""];

const buttonGroupPropsItem: PropItem<keyof ButtonGroupProps>[] = [
  {
    prop: "gap",
    type: "Select",
    options: buttonGroupGaps,
  },
  {
    prop: "variant",
    type: "Select",
    options: buttonGroupVariants,
  },
  {
    prop: "fullWidth",
    type: "Checkbox",
  },
  {
    prop: "connectedTop",
    type: "Checkbox",
  },
  {
    prop: "noWrap",
    type: "Checkbox",
  },
];

export const ButtonGroupTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/actions/button-group"
      >
        Button Group
      </Link>

      <TailorList items={buttonGroupPropsItem} />
    </>
  );
};
