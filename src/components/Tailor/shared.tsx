import {
  Autocomplete,
  BlockStack,
  Box,
  Checkbox as PolarisCheckbox,
  Icon as PolarisIcon,
  Select as PolarisSelect,
  Text as PolarisText,
  TextField,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import iconMetadata from "@shopify/polaris-icons/metadata";
import { get as lodashGet } from "lodash-es";
import { useState } from "react";

import { usePolarisStore } from "../../store";
import { RenderedComponent } from "../../types";
import { getHumanReadableName } from "../../utils/text";

import styles from "./shared.module.css";

export type Tailor =
  | "Text"
  | "Number"
  | "Select"
  | "Checkbox"
  | "Icon"
  | "Complex";

export type PropItem<PropType = string> = {
  type: Tailor;
  options?: string[];
  prop: PropType;
};

export const Text: React.FunctionComponent<{
  prop: string;
  label?: string;
}> = ({ prop, label }) => {
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
      label={label || getHumanReadableName(prop)}
      value={lodashGet(activeComponent.props, prop) || ""}
      autoComplete="off"
    />
  );
};

export const Number: React.FunctionComponent<{
  prop: string;
  label?: string;
}> = ({ prop, label }) => {
  const activeComponent =
    usePolarisStore.use.activeComponent() as RenderedComponent;
  const setActiveComponentPropValue =
    usePolarisStore.use.setActiveComponentPropValue();

  const handleChange = (value: string) => {
    if (value) {
      setActiveComponentPropValue(prop, +value);
      return;
    }

    setActiveComponentPropValue(prop, value);
  };

  return (
    <TextField
      type="number"
      onChange={handleChange}
      label={label || getHumanReadableName(prop)}
      value={lodashGet(activeComponent.props, prop) || ""}
      autoComplete="off"
    />
  );
};

export const Select: React.FunctionComponent<{
  options: string[];
  prop: string;
}> = ({ options, prop }) => {
  const activeComponent =
    usePolarisStore.use.activeComponent() as RenderedComponent;
  const setActiveComponentPropValue =
    usePolarisStore.use.setActiveComponentPropValue();

  const handleChange = (value: string) => {
    setActiveComponentPropValue(prop, value);
  };

  return (
    <div className={styles.selectWrapper}>
      <PolarisSelect
        label={getHumanReadableName(prop)}
        options={options}
        value={activeComponent.props[prop]}
        onChange={handleChange}
      />
    </div>
  );
};

export const Checkbox: React.FunctionComponent<{
  prop: string;
  label?: string;
}> = ({ prop, label }) => {
  const activeComponent =
    usePolarisStore.use.activeComponent() as RenderedComponent;
  const setActiveComponentPropValue =
    usePolarisStore.use.setActiveComponentPropValue();

  const handleChange = (value: boolean) => {
    setActiveComponentPropValue(prop, value);
  };

  return (
    <PolarisCheckbox
      label={label ?? getHumanReadableName(prop)}
      checked={lodashGet(activeComponent.props, prop)}
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

export const Icon: React.FunctionComponent<{
  prop: string;
  label?: string;
}> = ({ prop, label }) => {
  const activeComponent =
    usePolarisStore.use.activeComponent() as RenderedComponent;
  const setActiveComponentPropValue =
    usePolarisStore.use.setActiveComponentPropValue();

  const [inputValue, setInputValue] = useState(
    activeComponent.props.icon ?? "",
  );
  const [options, setOptions] = useState(iconList);

  const updateText = (value: string) => {
    setInputValue(value);

    if (value === "") {
      setOptions(iconList);
      return;
    }

    const filterRegex = new RegExp(value, "i");
    const resultOptions = iconList.filter((option) =>
      option.label.match(filterRegex),
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

    setActiveComponentPropValue(prop, selectedValue[0] ?? "");
    setInputValue(selectedValue[0] ?? "");
  };

  const syncWithIconInStore = () => {
    setInputValue(activeComponent.props.icon ?? "");
  };

  const textField = (
    <Autocomplete.TextField
      onBlur={syncWithIconInStore}
      onChange={updateText}
      label={label || getHumanReadableName(prop)}
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

const ComplexMap = {
  number: Number,
  string: Text,
  boolean: Checkbox,
};

const Complex: React.FunctionComponent<{ prop: string; level?: number }> = ({
  prop,
  level = 0,
}) => {
  const activeComponent =
    usePolarisStore.use.activeComponent() as RenderedComponent;

  // @ts-ignore
  const propObject = lodashGet(activeComponent.props, prop);
  const keys = Object.keys(propObject);
  const isTopLevel = level === 0;

  return (
    <>
      {isTopLevel && (
        <PolarisText as="p">{getHumanReadableName(prop)}</PolarisText>
      )}
      <Box paddingInlineStart={isTopLevel ? "400" : "0"}>
        <BlockStack gap="050">
          {keys.map((key) => {
            const value = propObject[key];
            const type = typeof value;

            if (type === "object") {
              return (
                <Complex prop={`${prop}.${key}`} key={key} level={level + 1} />
              );
            }

            // @ts-ignore
            let Component = ComplexMap[type];

            if (!Component && key === "icon") {
              Component = Icon;
            }

            if (!Component) {
              return null;
            }

            return (
              <Component
                label={getHumanReadableName(key)}
                prop={`${prop}.${key}`}
                key={key}
              />
            );
          })}
        </BlockStack>
      </Box>
    </>
  );
};

const TailorMap: Record<Tailor, React.FunctionComponent<any>> = {
  Text,
  Number,
  Select,
  Checkbox,
  Icon,
  Complex,
};

export function TailorList({ items }: { items: PropItem[] }) {
  return (
    <BlockStack gap="050">
      {items.map((item) => {
        // @ts-ignore
        const Component = TailorMap[item.type];

        return (
          <Component
            key={item.prop}
            prop={item.prop}
            options={item.options as any}
          />
        );
      })}
    </BlockStack>
  );
}
