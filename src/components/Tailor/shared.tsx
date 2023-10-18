import {
  Autocomplete,
  Checkbox as PolarisCheckbox,
  Icon as PolarisIcon,
  Select as PolarisSelect,
  TextField,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import iconMetadata from "@shopify/polaris-icons/metadata";
import { useState } from "react";

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

const iconList = Object.keys(iconMetadata)
  .sort()
  .map((icon) => ({
    value: icon,
    label: icon,
  }));

export const Icon = () => {
  const activeComponent =
    usePolarisStore.use.activeComponent() as RenderedComponent;
  const setActiveComponentPropValue =
    usePolarisStore.use.setActiveComponentPropValue();

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(iconList);

  const updateText = (value: string) => {
    setInputValue(value);

    if (value === "") {
      setOptions(iconList);
      return;
    }

    const filterRegex = new RegExp(value, "i");
    const resultOptions = iconList.filter((option) =>
      option.label.match(filterRegex)
    );
    setOptions(resultOptions);
  };

  const updateSelection = (selected: string[]) => {
    const selectedValue = selected.map((selectedItem) => {
      const matchedOption = options.find((option) => {
        return option.value.match(selectedItem);
      });
      return matchedOption && matchedOption.label;
    });

    setActiveComponentPropValue("icon", selectedValue[0] ?? "");
    setInputValue(selectedValue[0] ?? "");
  };

  const syncWithIconInStore = () => {
    setInputValue(activeComponent.props.icon ?? "");
  };

  const textField = (
    <Autocomplete.TextField
      onBlur={syncWithIconInStore}
      onChange={updateText}
      label="Icon"
      value={inputValue}
      prefix={<PolarisIcon source={SearchMinor} tone="base" />}
      placeholder="Search"
      autoComplete="off"
    />
  );

  return (
    <Autocomplete
      options={options}
      selected={activeComponent.props.icon ?? ""}
      onSelect={updateSelection}
      textField={textField}
    />
  );
};
