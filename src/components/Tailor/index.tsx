import { ComponentType } from "react";

import { usePolarisStore } from "../../store";
import { ComponentName } from "../../types";
import { AccountConnectionTailor } from "./AccountConnectionTailor";
import { BleedTailor } from "./BleedTailor";
import { BlockStackTailor } from "./BockStackTailor";
import { BoxTailor } from "./BoxTailor";
import { ButtonGroupTailor } from "./ButtonGroupTailor";
import { ButtonTailor } from "./ButtonTailor";
import { CalloutCardTailor } from "./CalloutCardTailor";
import { CardTailor } from "./CardTailor";
import { DividerTailor } from "./DividerTailor";
import { EmptyStateTailor } from "./EmptyStateTailor";
import { FormLayoutGroupTailor } from "./FormLayoutGroupTailor";
import { GridTailor } from "./GridTailor";
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
  Box: BoxTailor,
  CalloutCard: CalloutCardTailor,
  Card: CardTailor,
  Divider: DividerTailor,
  EmptyState: EmptyStateTailor,
  "FormLayout.Group": FormLayoutGroupTailor,
  Grid: GridTailor,
};

export const Tailor = () => {
  const activeComponent = usePolarisStore.use.activeComponent();

  //    @ts-ignore
  const Component = componentMap[activeComponent?.componentName ?? ""];

  return Component ? <Component /> : null;
};
