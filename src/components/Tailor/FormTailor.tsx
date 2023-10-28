import { FormProps, Link } from "@shopify/polaris";
import { targetOptions } from "../../types";
import { PropItem, TailorList } from "./shared";

const formEncTypeRecord: Record<NonNullable<FormProps["encType"]> | "", 1> = {
  "application/x-www-form-urlencoded": 1,
  "multipart/form-data": 1,
  "text/plain": 1,
  "": 1,
};

const formMethodRecord: Record<NonNullable<FormProps["method"]> | "", 1> = {
  action: 1,
  get: 1,
  post: 1,
  "": 1,
};

const formPropsItems: PropItem<keyof FormProps>[] = [
  {
    prop: "acceptCharset",
    type: "Text",
  },
  {
    prop: "action",
    type: "Text",
  },
  {
    prop: "autoComplete",
    type: "Checkbox",
  },
  {
    prop: "encType",
    type: "Select",
    options: Object.keys(formEncTypeRecord),
  },
  {
    prop: "implicitSubmit",
    type: "Checkbox",
  },
  {
    prop: "method",
    type: "Select",
    options: Object.keys(formMethodRecord),
  },
  {
    prop: "name",
    type: "Text",
  },
  {
    prop: "noValidate",
    type: "Checkbox",
  },
  {
    prop: "preventDefault",
    type: "Checkbox",
  },
  {
    prop: "target",
    type: "Select",
    options: targetOptions,
  },
];

export const FormTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/selection-and-input/form"
      >
        Form
      </Link>

      <TailorList items={formPropsItems} />
    </>
  );
};
