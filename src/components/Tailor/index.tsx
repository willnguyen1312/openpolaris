import { ComponentType, useRef, useState } from "react";

import { usePolarisStore } from "../../store";
import {
  ComponentName,
  RenderedComponent,
  parentComponentList,
  singleComponentList,
} from "../../types";
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
import { CheckboxTailor } from "./CheckboxTailor";
import { ChoiceListTailor } from "./ChoiceListTailor";
import { ColorPickerTailor } from "./ColorPickerTailor";
import { DatePickerTailor } from "./DatePickerTailor";
import { DescriptionListTailor } from "./DescriptionListTailor";
import { DividerTailor } from "./DividerTailor";
import { DropZoneFileUploadTailor, DropZoneTailor } from "./DropZoneTailor";
import { EmptyStateTailor } from "./EmptyStateTailor";
import { ExceptionListTailor } from "./ExceptionListTailor";
import { FooterHelpTailor } from "./FooterHelpTailor";
import { FormLayoutGroupTailor } from "./FormLayoutGroupTailor";
import { FormTailor } from "./FormTailor";
import { GridCellTailor } from "./GridCellTailor";
import { GridTailor } from "./GridTailor";
import { IconTailor } from "./IconTailor";
import { InlineErrorTailor } from "./InlineErrorTailor";
import { InlineGridTailor } from "./InlineGridTailor";
import { InlineStackTailor } from "./InlineStackTailor";
import { KeyboardKeyTailor } from "./KeyboardKeyTailor";
import { LayoutAnnotatedSectionTailor } from "./LayoutAnnotatedSectionTailor";
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
import { RadioButtonTailor } from "./RadioButtonTailor";
import { RangeSliderTailor } from "./RangeSliderTailor";
import { SelectTailor } from "./SelectTailor";
import { SkeletonBodyTextTailor } from "./SkeletonBodyTextTailor";
import { SkeletonDisplayTextTailor } from "./SkeletonDisplayTextTailor";
import { SkeletonPageTailor } from "./SkeletonPageTailor";
import { SkeletonTabsTailor } from "./SkeletonTabsTailor";
import { SkeletonThumbnailTailor } from "./SkeletonThumnailTailor";
import { SpinnerTailor } from "./SpinnerTailor";
import { TagTailor } from "./TagTailor";
import { TextFieldTailor } from "./TextFieldTailor";
import { TextTailor } from "./TextTailor";
import { ThumbnailTailor } from "./ThumbnailTailor";
import { TooltipTailor } from "./TooltipTailor";
import { VideoThumbnailTailor } from "./VideoThumbnailTailor";
import { Autocomplete, BlockStack, Icon } from "@shopify/polaris";
import { defaultProps } from "../../defaultProps";
import { SearchIcon } from "@shopify/polaris-icons";
import { FormLayoutTailor } from "./FormLayoutTailor";

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
  FormLayout: FormLayoutTailor,
  Grid: GridTailor,
  "Grid.Cell": GridCellTailor,
  InlineGrid: InlineGridTailor,
  InlineStack: InlineStackTailor,
  Layout: LayoutTailor,
  "Layout.Section": LayoutSectionTailor,
  "Layout.AnnotatedSection": LayoutAnnotatedSectionTailor,
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
  SkeletonPage: SkeletonPageTailor,
  SkeletonTabs: SkeletonTabsTailor,
  SkeletonThumbnail: SkeletonThumbnailTailor,

  // Navigation
  Pagination: PaginationTailor,
  Link: LinkTailor,
  FooterHelp: FooterHelpTailor,

  // Selection and input
  Checkbox: CheckboxTailor,
  ChoiceList: ChoiceListTailor,
  ColorPicker: ColorPickerTailor,
  DatePicker: DatePickerTailor,
  DropZone: DropZoneTailor,
  "DropZone.FileUpload": DropZoneFileUploadTailor,
  Form: FormTailor,
  InlineError: InlineErrorTailor,
  RadioButton: RadioButtonTailor,
  RangeSlider: RangeSliderTailor,
  Select: SelectTailor,
  Tag: TagTailor,
  TextField: TextFieldTailor,
};

const parentComponentListOptions = parentComponentList.map((componentName) => ({
  value: componentName,
  label: componentName,
}));

const singleComponentListOptions = singleComponentList.map((componentName) => ({
  value: componentName,
  label: componentName,
}));

const SwitchComponents = () => {
  const activeComponent =
    usePolarisStore.use.activeComponent() as RenderedComponent;
  const initialOptionsRef = useRef(
    parentComponentList.includes(activeComponent.componentName)
      ? parentComponentListOptions
      : singleComponentListOptions,
  );
  const changeActiveComponent = usePolarisStore.use.changeActiveComponent();
  const [options, setOptions] = useState(initialOptionsRef.current);

  const [value, setValue] = useState(activeComponent.componentName);

  const textField = (
    <Autocomplete.TextField
      onBlur={() => {
        if (!defaultProps[value]) {
          setValue(activeComponent.componentName);
        }
      }}
      onChange={(value) => {
        setValue(value as RenderedComponent["componentName"]);

        if (value === "") {
          setOptions(initialOptionsRef.current);
          return;
        }

        const filterRegex = new RegExp(value, "i");
        const resultOptions = initialOptionsRef.current.filter((option) =>
          option.label.match(filterRegex),
        );
        setOptions(resultOptions);
      }}
      label={"Component"}
      value={value}
      prefix={<Icon source={SearchIcon} tone="base" />}
      placeholder="Search"
      autoComplete="off"
    />
  );

  return (
    <Autocomplete
      options={options}
      selected={
        activeComponent.componentName ? [activeComponent.componentName] : []
      }
      onSelect={(selected) => {
        const componentName = selected[0] as RenderedComponent["componentName"];
        setValue(componentName);
        changeActiveComponent(componentName);
      }}
      textField={textField}
    />
  );
};

export const Tailor = () => {
  const activeComponent = usePolarisStore.use.activeComponent();

  //    @ts-ignore
  const Component = componentMap[activeComponent?.componentName ?? ""];

  return Component ? (
    <BlockStack gap="200">
      <Component />
      <SwitchComponents key={activeComponent?.componentName} />
    </BlockStack>
  ) : null;
};
