import {
  Checkbox as PolarisCheckbox,
  Select as PolarisSelect,
  TextField,
} from "@shopify/polaris";

import { usePolarisStore } from "../../store";
import { RenderedComponent } from "../../types";
import { getHumanReadableProp } from "../../utils/text";

export type Tailor = "Text" | "Select" | "Checkbox";

export type PropItem<PropType = string> = {
  type: Tailor;
  options?: string[];
  prop: PropType;
};

export const Text = ({ prop }: { prop: string }) => {
  const activeComponent =
    usePolarisStore.use.activeComponent() as RenderedComponent;
  const setActiveComponentPropValue =
    usePolarisStore.use.setActiveComponentPropValue();

  const handleChange = (value: string) => {
    setActiveComponentPropValue(prop, value);
  };

  return (
    <TextField
      onChange={handleChange}
      label={getHumanReadableProp(prop)}
      value={activeComponent.props[prop]}
      autoComplete="off"
    />
  );
};

export const Select = ({
  options,
  prop,
}: {
  options: string[];
  prop: string;
}) => {
  const activeComponent =
    usePolarisStore.use.activeComponent() as RenderedComponent;
  const setActiveComponentPropValue =
    usePolarisStore.use.setActiveComponentPropValue();

  const handleChange = (value: string) => {
    setActiveComponentPropValue(prop, value);
  };

  return (
    <PolarisSelect
      label={getHumanReadableProp(prop)}
      options={options}
      value={activeComponent.props[prop] || ""}
      onChange={handleChange}
    />
  );
};

export const Checkbox = ({ prop }: { prop: string }) => {
  const activeComponent =
    usePolarisStore.use.activeComponent() as RenderedComponent;
  const setActiveComponentPropValue =
    usePolarisStore.use.setActiveComponentPropValue();

  const handleChange = (value: boolean) => {
    setActiveComponentPropValue(prop, value);
  };

  return (
    <PolarisCheckbox
      label={getHumanReadableProp(prop)}
      checked={activeComponent.props[prop]}
      onChange={handleChange}
    />
  );
};
