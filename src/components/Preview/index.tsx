import * as Polaris from "@shopify/polaris";
import * as PolarisIcon from "@shopify/polaris-icons";
import classNames from "classnames";

import { usePolarisStore } from "../../store";
import { ComponentName, RenderedComponent } from "../../types";

import styles from "./Preview.module.css";

const inlineBlockComponents: ComponentName[] = ["Button"];
const emptyChildCOmponents: ComponentName[] = ["ButtonGroup"];

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
  const icon = component?.props?.icon;

  const specialProps = {
    // @ts-ignore
    icon: icon ? PolarisIcon[icon] : undefined,
  };

  const isEmptyChild =
    emptyChildCOmponents.includes(componentName) && !component.children.length;

  return (
    <div
      onClick={selectComponent}
      className={classNames(styles.wrapper, {
        [styles.emptyChild]: isEmptyChild,
        [styles.selected]: isSelected,
        [styles.inlineBlock]: inlineBlockComponents.includes(componentName),
      })}
    >
      <Component {...component.props} {...specialProps} />
    </div>
  );
};
