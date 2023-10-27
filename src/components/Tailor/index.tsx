import { ComponentType } from "react";

import { usePolarisStore } from "../../store";
import { ComponentName } from "../../types";
import { AccountConnectionTailor } from "./AccountConnectionTailor";
import { ActionListTailor } from "./ActionListTailor";
import { AvatarTailor } from "./AvatarTailor";
import { BadgeTailor } from "./BadgeTailor";
import { BannerTailor } from "./BannerTailor";
import { BleedTailor } from "./BleedTailor";
import { BlockStackTailor } from "./BockStackTailor";
import { BoxTailor } from "./BoxTailor";
import { ButtonGroupTailor } from "./ButtonGroupTailor";
import { ButtonTailor } from "./ButtonTailor";
import { CalloutCardTailor } from "./CalloutCardTailor";
import { CardTailor } from "./CardTailor";
import { DescriptionListTailor } from "./DescriptionListTailor";
import { DividerTailor } from "./DividerTailor";
import { EmptyStateTailor } from "./EmptyStateTailor";
import { ExceptionListTailor } from "./ExceptionListTailor";
import { FooterHelpTailor } from "./FooterHelpTailor";
import { FormLayoutGroupTailor } from "./FormLayoutGroupTailor";
import { GridCellTailor } from "./GridCellTailor";
import { GridTailor } from "./GridTailor";
import { IconTailor } from "./IconTailor";
import { InlineGridTailor } from "./InlineGridTailor";
import { InlineStackTailor } from "./InlineStackTailor";
import { KeyboardKeyTailor } from "./KeyboardKeyTailor";
import { LayoutSectionTailor } from "./LayoutSectionTailor";
import { LayoutTailor } from "./LayoutTailor";
import { LinkTailor } from "./LinkTailor";
import {
  ListBoxActionTailor,
  ListBoxHeaderTailor,
  ListBoxLoadingTailor,
  ListBoxOptionTailor,
  ListBoxSectionTailor,
  ListBoxTailor,
  ListBoxTextOptionTailor,
} from "./ListBoxTailor";
import { ListTailor } from "./ListTailor";
import { MediaCardTailor } from "./MediaCardTailor";
import { ModalTailor } from "./ModalTailor";
import { OptionListTailor } from "./OptionListTailor";
import { PageActionsTailor } from "./PageActionsTailor";
import { PageTailor } from "./PageTailor";
import { PaginationTailor } from "./PaginationTailor";
import { ProgressBarTailor } from "./PgrogressBarTailor";
import { SkeletonBodyTextTailor } from "./SkeletonBodyTextTailor";
import { SkeletonDisplayTextTailor } from "./SkeletonDisplayTextTailor";
import { SpinnerTailor } from "./SpinnerTailor";
import { TextTailor } from "./TextTailor";
import { ThumbnailTailor } from "./ThumbnailTailor";
import { TooltipTailor } from "./TooltipTailor";
import { VideoThumbnailTailor } from "./VideoThumbnailTailor";

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
  Page: PageTailor,

  // Typography
  Text: TextTailor,

  // Images and Icons
  Avatar: AvatarTailor,
  Icon: IconTailor,
  KeyboardKey: KeyboardKeyTailor,
  Thumbnail: ThumbnailTailor,
  VideoThumbnail: VideoThumbnailTailor,

  // Overlays
  Tooltip: TooltipTailor,
  // Popover is not supported yet
  // Popover: PopoverTailor,
  Modal: ModalTailor,

  // Lists
  ActionList: ActionListTailor,
  DescriptionList: DescriptionListTailor,
  List: ListTailor,
  OptionList: OptionListTailor,
  Listbox: ListBoxTailor,
  "Listbox.Option": ListBoxOptionTailor,
  "Listbox.TextOption": ListBoxTextOptionTailor,
  "Listbox.Header": ListBoxHeaderTailor,
  "Listbox.Loading": ListBoxLoadingTailor,
  "Listbox.Section": ListBoxSectionTailor,
  "Listbox.Action": ListBoxActionTailor,

  // Feedback indicators
  Badge: BadgeTailor,
  Banner: BannerTailor,
  ExceptionList: ExceptionListTailor,
  ProgressBar: ProgressBarTailor,
  Spinner: SpinnerTailor,
  SkeletonBodyText: SkeletonBodyTextTailor,
  SkeletonDisplayText: SkeletonDisplayTextTailor,

  // Navigation
  Pagination: PaginationTailor,
  Link: LinkTailor,
  FooterHelp: FooterHelpTailor,
};

export const Tailor = () => {
  const activeComponent = usePolarisStore.use.activeComponent();

  //    @ts-ignore
  const Component = componentMap[activeComponent?.componentName ?? ""];

  return Component ? <Component /> : null;
};
