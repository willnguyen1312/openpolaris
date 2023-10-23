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
import { GridCellTailor } from "./GridCellTailor";
import { GridTailor } from "./GridTailor";
import { InlineGridTailor } from "./InlineGridTailor";
import { InlineStackTailor } from "./InlineStackTailor";
import { LayoutSectionTailor } from "./LayoutSectionTailor";
import { LayoutTailor } from "./LayoutTailor";
import { MediaCardTailor } from "./MediaCardTailor";
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
  "Grid.Cell": GridCellTailor,
  InlineGrid: InlineGridTailor,
  InlineStack: InlineStackTailor,
  Layout: LayoutTailor,
  "Layout.Section": LayoutSectionTailor,
  MediaCard: MediaCardTailor,
};

export const Tailor = () => {
  const activeComponent = usePolarisStore.use.activeComponent();

  //    @ts-ignore
  const Component = componentMap[activeComponent?.componentName ?? ""];

  return Component ? <Component /> : null;
};
