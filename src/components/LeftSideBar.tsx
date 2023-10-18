import styles from "./LeftSideBar.module.css";

import { useDraggable } from "@dnd-kit/core";
import { Box, Text, TextField } from "@shopify/polaris";
import React, { useCallback, useDeferredValue, useState } from "react";
import {
  ComponentCategoryName,
  ComponentName,
  componentCategories,
  listOfComponent,
} from "../types";

export function LeftSideBar() {
  const [textFieldValue, setTextFieldValue] = useState("");
  const deferredTextFieldValue = useDeferredValue(textFieldValue);

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  const handleClearButtonClick = useCallback(() => setTextFieldValue(""), []);

  return (
    <div className={styles.wrapper}>
      <TextField
        label="Search components"
        value={textFieldValue}
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
    if (componentName.toLowerCase().includes(normalizedQuery)) {
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
          {components.map((componentName: ComponentName) => {
            return (
              <DraggableItem key={componentName} componentName={componentName}>
                <Text as="p">{componentName}</Text>
              </DraggableItem>
            );
          })}
        </Box>
      </Box>
    );
  });
}

function DraggableItem({
  children,
  componentName,
}: {
  children: React.ReactNode;
  componentName: string;
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: componentName,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ cursor: "pointer" }}
    >
      {children}
    </div>
  );
}
