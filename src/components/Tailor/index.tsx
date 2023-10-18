import { ComponentType } from "react";

import { usePolarisStore } from "../../store";
import { ComponentName } from "../../types";
import { ButtonGroupTailor } from "./ButtonGroupTailor";
import { ButtonTailor } from "./ButtonTailor";
import { DividerTailor } from "./DividerTailor";

const componentMap: Partial<Record<ComponentName, ComponentType>> = {
  Divider: DividerTailor,
  Button: ButtonTailor,
  ButtonGroup: ButtonGroupTailor,
};

export const Tailor = () => {
  const activeComponent = usePolarisStore.use.activeComponent();

  //    @ts-ignore
  const Component = componentMap[activeComponent?.componentName ?? ""];

  return Component ? <Component /> : null;
};
