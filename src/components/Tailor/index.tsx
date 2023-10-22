import { ComponentType } from "react";

import { usePolarisStore } from "../../store";
import { ComponentName } from "../../types";
import { AccountConnectionTailor } from "./AccountConnectionTailor";
import { BleedTailor } from "./BleedTailor";
import { BlockStackTailor } from "./BockStackTailor";
import { ButtonGroupTailor } from "./ButtonGroupTailor";
import { ButtonTailor } from "./ButtonTailor";
import { DividerTailor } from "./DividerTailor";
import { PageActionsTailor } from "./PageActionsTailor";

const componentMap: Partial<Record<ComponentName, ComponentType>> = {
  // Actions
  AccountConnection: AccountConnectionTailor,
  Button: ButtonTailor,
  ButtonGroup: ButtonGroupTailor,
  PageActions: PageActionsTailor,

  // Layout and Structure
  Bleed: BleedTailor,
  BlockStack: BlockStackTailor,
  Divider: DividerTailor,
};

export const Tailor = () => {
  const activeComponent = usePolarisStore.use.activeComponent();

  //    @ts-ignore
  const Component = componentMap[activeComponent?.componentName ?? ""];

  return Component ? <Component /> : null;
};
