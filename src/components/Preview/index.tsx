import { Divider } from "@shopify/polaris";
import classNames from "classnames";

import { usePolarisStore } from "../../store";
import { RenderedComponent } from "../../types";

import { defaultProps } from "../../defaultProps";
import styles from "./shared.module.css";

export const Preview = ({ component }: { component: RenderedComponent }) => {
  const { componentName } = component;
  const setActiveComponentId = usePolarisStore.use.setActiveComponentId();
  const activeComponentId = usePolarisStore.use.activeComponentId();
  const activeComponent = usePolarisStore.use.getActiveComponent()();
  const isSelected = activeComponentId === component.id;

  const currentProps = activeComponent
    ? activeComponent.props
    : defaultProps[componentName];

  const selectComponent = () => {
    setActiveComponentId(component.id);
  };

  const extraProps = {
    onClick: selectComponent,
    className: classNames(styles.hover, {
      [styles.selected]: isSelected,
    }),
  };

  switch (componentName) {
    case "Divider":
      return (
        <div {...extraProps}>
          <Divider {...currentProps} />
        </div>
      );
    default:
      return null;
  }
};
