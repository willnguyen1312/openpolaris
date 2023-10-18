import {
  Checkbox as PolarisCheckbox,
  Select as PolarisSelect,
  TextField,
} from "@shopify/polaris";

import { usePolarisStore } from "../../store";
import { RenderedComponent } from "../../types";

export type Tailor = "Text" | "Select" | "Checkbox";

export type PropItem<PropType = string> = {
  type: Tailor;
  label: string;
  options?: string[];
  prop: PropType;
};

export const Text = ({ label, prop }: { label: string; prop: string }) => {
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
      label={label}
      value={activeComponent.props[prop]}
      autoComplete="off"
    />
  );
};

export const Select = ({
  label,
  options,
  prop,
}: {
  label: string;
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
      label={label}
      options={options}
      value={activeComponent.props[prop] || ""}
      onChange={handleChange}
    />
  );
};

export const Checkbox = ({ label, prop }: { label: string; prop: string }) => {
  const activeComponent =
    usePolarisStore.use.activeComponent() as RenderedComponent;
  const setActiveComponentPropValue =
    usePolarisStore.use.setActiveComponentPropValue();

  const handleChange = (value: boolean) => {
    setActiveComponentPropValue(prop, value);
  };

  return (
    <PolarisCheckbox
      label={label}
      checked={activeComponent.props[prop]}
      onChange={handleChange}
    />
  );
};
