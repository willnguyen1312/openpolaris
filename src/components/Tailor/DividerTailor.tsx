import { DividerProps } from "@shopify/polaris";
import { colorBorderAliasesWithTransparent } from "../../types";
import { DocLink, PropItem, TailorList } from "./shared";

// This is to work around type error when upgrading to new version of polaris
type DividerBorderWidths = NonNullable<DividerProps["borderWidth"]> | "";
const dividerBorderWithRecord: Record<DividerBorderWidths, 1> = {
  "0165": 1,
  "025": 1,
  "050": 1,
  "100": 1,
  "": 1,
};
const dividerBorderWidths = Object.keys(
  dividerBorderWithRecord,
) as DividerBorderWidths[];

const dividerPropsItems: PropItem<keyof DividerProps>[] = [
  {
    prop: "borderColor",
    type: "Select",
    options: colorBorderAliasesWithTransparent,
  },
  {
    prop: "borderWidth",
    type: "Select",
    options: dividerBorderWidths,
  },
];

export const DividerTailor = () => {
  return (
    <>
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/divider"
      >
        Divider
      </DocLink>

      <TailorList items={dividerPropsItems} />
    </>
  );
};
