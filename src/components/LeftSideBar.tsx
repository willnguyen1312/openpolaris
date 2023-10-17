import styles from "./LeftSideBar.module.css";

import { TextField } from "@shopify/polaris";
import React, { useCallback, useDeferredValue, useState } from "react";
import { listOfComponent } from "../constants";

export function LeftSideBar() {
  const [textFieldValue, setTextFieldValue] = useState("");
  const deferredTextFieldValue = useDeferredValue(textFieldValue);

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    []
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
  const renderedComponent: React.JSX.Element[] = [];
  const normalizedQuery = query.toLowerCase().replace(/\s/g, "");

  for (const component of listOfComponent) {
    if (component.name.toLowerCase().includes(normalizedQuery)) {
      const item = (
        <DraggableItem key={component.name}>{component.name}</DraggableItem>
      );
      renderedComponent.push(item);
    }
  }

  return renderedComponent;
}

function DraggableItem(props: { children: React.ReactNode }) {
  return <div>{props.children}</div>;
}
