import { DropZoneProps } from "@shopify/polaris";
import { DropZoneFileUploadProps } from "../../types";
import { DocLink, PropItem, TailorList } from "./shared";

const dropZoneTypeRecord: Record<NonNullable<DropZoneProps["type"]> | "", 1> = {
  file: 1,
  image: 1,
  video: 1,
  "": 1,
};

const dropZoneTailorPropsItems: PropItem<keyof DropZoneProps>[] = [
  {
    prop: "label",
    type: "Text",
  },
  {
    prop: "labelAction",
    type: "Complex",
  },
  {
    prop: "labelHidden",
    type: "Checkbox",
  },
  {
    prop: "id",
    type: "Text",
  },
  {
    prop: "accept",
    type: "Text",
  },
  {
    prop: "type",
    type: "Select",
    options: Object.keys(dropZoneTypeRecord),
  },
  {
    prop: "active",
    type: "Checkbox",
  },
  {
    prop: "error",
    type: "Checkbox",
  },
  {
    prop: "outline",
    type: "Checkbox",
  },
  {
    prop: "overlay",
    type: "Checkbox",
  },
  {
    prop: "overlayText",
    type: "Text",
  },
  {
    prop: "errorOverlayText",
    type: "Text",
  },
  {
    prop: "allowMultiple",
    type: "Checkbox",
  },
  {
    prop: "disabled",
    type: "Checkbox",
  },
  {
    prop: "dropOnPage",
    type: "Checkbox",
  },
  {
    prop: "openFileDialog",
    type: "Checkbox",
  },
  {
    prop: "variableHeight",
    type: "Checkbox",
  },
];

export const DropZoneTailor = () => {
  return (
    <>
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/selection-and-input/drop-zone"
      >
        Drop zone
      </DocLink>

      <TailorList items={dropZoneTailorPropsItems} />
    </>
  );
};

const dropZoneFileUploadTailorPropsItems: PropItem<
  keyof DropZoneFileUploadProps
>[] = [
  { prop: "actionHint", type: "Text" },
  { prop: "actionTitle", type: "Text" },
];

export const DropZoneFileUploadTailor = () => {
  return (
    <>
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/selection-and-input/drop-zone"
      >
        Drop zone file upload
      </DocLink>

      <TailorList items={dropZoneFileUploadTailorPropsItems} />
    </>
  );
};
