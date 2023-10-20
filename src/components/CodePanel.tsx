import { Button, Toast } from "@shopify/polaris";
import { ClipboardMinor } from "@shopify/polaris-icons";
import classNames from "classnames";
import { Highlight, themes } from "prism-react-renderer";
import { useState } from "react";
import styles from "./CodePanel.module.css";

const codeBlock = `
const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>Price: {item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
}
`;

export const CodePanel = () => {
  const [active, setActive] = useState(false);
  const closeToast = () => setActive(false);
  const showToast = () => setActive(true);

  const handleCopyClick = () => {
    showToast();
    navigator.clipboard.writeText(codeBlock);
  };

  const toastMarkup = active ? (
    <Toast content="Code copied to clipboard" onDismiss={closeToast} />
  ) : null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.copyButtonWrapper}>
        <Button
          onClick={handleCopyClick}
          icon={ClipboardMinor}
          accessibilityLabel="Copy"
          tone="success"
          variant="primary"
        />
      </div>

      <Highlight theme={themes.nightOwl} code={codeBlock} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={classNames(className, styles.preWrapper)}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>

      {toastMarkup}
    </div>
  );
};
