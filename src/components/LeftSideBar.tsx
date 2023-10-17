import styles from "./LeftSideBar.module.css";

import { TextField } from "@shopify/polaris";
import { useCallback, useState } from "react";

export function LeftSideBar() {
  const [textFieldValue, setTextFieldValue] = useState("");

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
    </div>
  );
}
