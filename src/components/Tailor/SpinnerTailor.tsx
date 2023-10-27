import { Link, SpinnerProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const spinnerSizeRecord: Record<NonNullable<SpinnerProps["size"] | "">, 1> = {
  large: 1,
  small: 1,
  "": 1,
};

const spinnerPropsItems: PropItem<keyof SpinnerProps>[] = [
  {
    prop: "size",
    type: "Select",
    options: Object.keys(spinnerSizeRecord),
  },
  {
    prop: "accessibilityLabel",
    type: "Text",
  },
  {
    prop: "hasFocusableParent",
    type: "Checkbox",
  },
];

export const SpinnerTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/feedback-indicators/spinner"
      >
        Spinner
      </Link>

      <TailorList items={spinnerPropsItems} />
    </>
  );
};
