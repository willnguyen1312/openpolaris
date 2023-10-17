import { usePolarisStore } from "../../store";
import {
  BorderWidthScale,
  ColorBorderAlias,
  RenderedComponent,
} from "../../types";

import { Select, Text } from "@shopify/polaris";

type DividerBorderColors = ColorBorderAlias | "transparent";
const dividerBorderColors: DividerBorderColors[] = [
  "border-brand",
  "border-caution",
  "border-critical-secondary",
  "border-critical",
  "border-disabled",
  "border-emphasis-active",
  "border-emphasis-hover",
  "border-emphasis",
  "border-focus",
  "border-hover",
  "border-info",
  "border-inverse-active",
  "border-inverse-hover",
  "border-inverse",
  "border-magic-secondary",
  "border-magic",
  "border-secondary",
  "border-success",
  "border-tertiary",
  "border-warning",
  "border",
  "transparent",
];
const dividerBorderWidths: BorderWidthScale[] = ["0165", "025", "050", "100"];

export const DividerTailor = () => {
  const activeComponent =
    usePolarisStore.use.activeComponent() as RenderedComponent;
  const setActiveComponentPropValue =
    usePolarisStore.use.setActiveComponentPropValue();

  const changeBorderColor = (value: DividerBorderColors) => {
    setActiveComponentPropValue("borderColor", value);
  };

  const changeBorderWidth = (value: BorderWidthScale) => {
    setActiveComponentPropValue("borderWidth", value);
  };

  return (
    <>
      <Text as="p" variant="headingMd">
        Divider
      </Text>
      <Select
        label="Border color"
        options={dividerBorderColors}
        onChange={changeBorderColor}
        value={activeComponent.props.borderColor}
      />

      <Select
        label="Border width"
        options={dividerBorderWidths}
        onChange={changeBorderWidth}
        value={activeComponent.props.borderWidth}
      />
    </>
  );
};
