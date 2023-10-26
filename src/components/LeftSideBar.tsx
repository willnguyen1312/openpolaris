import styles from "./LeftSideBar.module.css";

import { Box, Text, TextField } from "@shopify/polaris";
import { useCallback, useDeferredValue } from "react";
import { usePolarisStore } from "../store";
import {
  ComponentCategoryName,
  ComponentName,
  componentCategories,
  listOfComponent,
} from "../types";
import { getHumanReadableName } from "../utils/text";
import { DraggableItem } from "./DraggableItem";

export function LeftSideBar() {
  const searchComponentInput = usePolarisStore.use.searchComponentInput();
  const setSearchComponentInput = usePolarisStore.use.setSearchComponentInput();
  const deferredTextFieldValue = useDeferredValue(searchComponentInput);

  const handleTextFieldChange = useCallback(
    (value: string) => setSearchComponentInput(value),
    [],
  );

  const handleClearButtonClick = useCallback(
    () => setSearchComponentInput(""),
    [],
  );

  return (
    <div className={styles.wrapper}>
      <TextField
        label="Search components"
        value={searchComponentInput}
        onChange={handleTextFieldChange}
        clearButton
        onClearButtonClick={handleClearButtonClick}
        autoComplete="off"
      />

      <SearchResult query={deferredTextFieldValue} />
    </div>
  );
}

function SearchResult({ query }: { query: string }) {
  const normalizedQuery = query.toLowerCase().replace(/\s/g, "");

  const componentsByCategory = componentCategories.reduce(
    (acc, category) => {
      acc.set(category, []);
      return acc;
    },
    new Map() as Map<ComponentCategoryName, ComponentName[]>,
  );

  for (const { componentName, category } of listOfComponent) {
    if (
      componentName.toLowerCase().includes(normalizedQuery) ||
      category.toLowerCase().includes(normalizedQuery)
    ) {
      componentsByCategory.set(category, [
        ...componentsByCategory.get(category)!,
        componentName,
      ]);
    }
  }

  return [...componentsByCategory.entries()].map(([category, components]) => {
    if (components.length === 0) {
      return null;
    }

    return (
      <Box key={category}>
        <Text as="p" variant="headingMd">
          {category}
        </Text>

        <Box paddingInlineStart="400" paddingBlockStart="100">
          {components
            .sort((first, second) => {
              return first.localeCompare(second);
            })
            .map((componentName: ComponentName) => {
              return (
                <DraggableItem
                  key={componentName}
                  componentName={componentName}
                >
                  <Text as="p">{getHumanReadableName(componentName)}</Text>
                </DraggableItem>
              );
            })}
        </Box>
      </Box>
    );
  });
}
