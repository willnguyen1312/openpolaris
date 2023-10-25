import { Link, ModalProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const modalSizeRecord: Record<NonNullable<ModalProps["size"] | "">, 1> = {
  small: 1,
  fullScreen: 1,
  large: 1,
  "": 1,
};

const modalPropsItems: PropItem<keyof ModalProps>[] = [
  {
    prop: "open",
    type: "Checkbox",
  },
  {
    prop: "src",
    type: "Text",
  },
  {
    prop: "iFrameName",
    type: "Text",
  },
  {
    prop: "title",
    type: "Text",
  },
  {
    prop: "titleHidden",
    type: "Checkbox",
  },
  {
    prop: "footer",
    type: "Text",
  },
  {
    prop: "instant",
    type: "Checkbox",
  },
  {
    prop: "sectioned",
    type: "Checkbox",
  },
  {
    prop: "size",
    type: "Select",
    options: Object.keys(modalSizeRecord),
  },
  {
    prop: "limitHeight",
    type: "Checkbox",
  },
  {
    prop: "loading",
    type: "Checkbox",
  },
  {
    prop: "noScroll",
    type: "Checkbox",
  },
];

export const ModalTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/overlays/modal"
      >
        Modal
      </Link>

      <TailorList items={modalPropsItems} />
    </>
  );
};
