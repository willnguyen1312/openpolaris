import * as Polaris from "@shopify/polaris";
import classNames from "classnames";

import { usePolarisStore } from "../../store";
import { RenderedComponent } from "../../types";

import styles from "./Preview.module.css";

const inlineBlockComponents = ["Button"];

export const Preview = ({ component }: { component: RenderedComponent }) => {
  const { componentName } = component;
  const setActiveComponentId = usePolarisStore.use.setActiveComponent();
  const activeComponent = usePolarisStore.use.activeComponent();
  const isSelected = activeComponent?.id === component.id;

  const selectComponent = () => {
    setActiveComponentId(component);
  };

  // @ts-ignore
  const Component = Polaris[componentName];

  return (
    <div
      onClick={selectComponent}
      className={classNames(styles.wrapper, {
        [styles.selected]: isSelected,
        [styles.inlineBlock]: inlineBlockComponents.includes(componentName),
      })}
    >
      <Component {...component.props} />
    </div>
  );
};
