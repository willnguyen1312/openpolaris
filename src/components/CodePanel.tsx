import { Button, Toast } from "@shopify/polaris";
import { ClipboardMinor } from "@shopify/polaris-icons";
import classNames from "classnames";
import { Highlight, themes } from "prism-react-renderer";
import { useEffect, useState } from "react";
import { usePolarisStore } from "../store";
import { generateCode } from "../utils/code";
import styles from "./CodePanel.module.css";

export const CodePanel = () => {
  const [code, setCode] = useState("");
  const isShowCodePanel = usePolarisStore.use.isShowCodePanel();
  const renderedComponents = usePolarisStore.use.renderedComponents();
  const [active, setActive] = useState(false);
  const closeToast = () => setActive(false);
  const showToast = () => setActive(true);

  useEffect(() => {
    async function run() {
      const result = await generateCode(renderedComponents);
      setCode(result);
    }

    run();
  }, [renderedComponents]);

  const handleCopyClick = () => {
    showToast();
    navigator.clipboard.writeText(code);
  };

  const toastMarkup = active ? (
    <Toast content="Code copied to clipboard" onDismiss={closeToast} />
  ) : null;

  if (!isShowCodePanel) return null;

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

      <Highlight theme={themes.nightOwl} code={code} language="tsx">
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
