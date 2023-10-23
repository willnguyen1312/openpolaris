import { FormLayout, Layout } from "@shopify/polaris";
import {
  BorderRadiusAliasOrScale,
  BorderWidthScale,
  BreakpointsAlias,
  ColorBackgroundAlias,
  ColorBorderAlias,
  ColorIconAlias,
  ColorTextAlias,
  ShadowAliasOrScale,
  SpaceScale,
} from "@shopify/polaris-tokens";
import { ComponentPropsWithoutRef } from "react";

export type ComponentName =
  | "AccountConnection"
  | "Button"
  | "ButtonGroup"
  | "PageActions"
  | "Caption"
  | "DisplayText"
  | "Heading"
  | "LegacyCard"
  | "LegacyFilters"
  | "LegacyStack"
  | "LegacyTabs"
  | "SettingToggle"
  | "Sheet"
  | "Subheading"
  | "TextContainer"
  | "TextStyle"
  | "VisuallyHidden"
  | "Badge"
  | "Banner"
  | "ExceptionList"
  | "Loading"
  | "ProgressBar"
  | "SkeletonBodyText"
  | "SkeletonDisplayText"
  | "SkeletonPage"
  | "SkeletonTabs"
  | "SkeletonThumbnail"
  | "Spinner"
  | "Toast"
  | "Avatar"
  | "Icon"
  | "KeyboardKey"
  | "Thumbnail"
  | "VideoThumbnail"
  | "Bleed"
  | "BlockStack"
  | "Box"
  | "CalloutCard"
  | "Card"
  | "Divider"
  | "EmptyState"
  | "FormLayout"
  | "FormLayout.Group"
  | "Grid"
  | "Grid.Cell"
  | "InlineGrid"
  | "InlineStack"
  | "Layout"
  | "MediaCard"
  | "Page"
  | "ActionList"
  | "DescriptionList"
  | "List"
  | "Listbox"
  | "OptionList"
  | "ResourceItem"
  | "ResourceList"
  | "FooterHelp"
  | "FullscreenBar"
  | "Link"
  | "Navigation"
  | "Pagination"
  | "Tabs"
  | "TopBar"
  | "Modal"
  | "Popover"
  | "Tooltip"
  | "Autocomplete"
  | "Checkbox"
  | "ChoiceList"
  | "ColorPicker"
  | "Combobox"
  | "ContextualSaveBar"
  | "DatePicker"
  | "DropZone"
  | "Filters"
  | "Form"
  | "IndexFilters"
  | "InlineError"
  | "RadioButton"
  | "RangeSlider"
  | "Select"
  | "Tag"
  | "TextField"
  | "DataTable"
  | "IndexTable"
  | "Text"
  // | "AppProvider"
  | "Collapsible"
  | "Frame"
  | "Scrollable";

export type ComponentMenuItem = {
  componentName: ComponentName;
  category: ComponentCategoryName;
};

export type ComponentCategoryName =
  | "Actions"
  | "Layout and structure"
  | "Selection and input"
  | "Images and icons"
  | "Feedback indicators"
  | "Typography"
  | "Table"
  | "List"
  | "Navigation"
  | "Overlays"
  | "Utilities";

export const componentCategories: ComponentCategoryName[] = [
  "Actions",
  "Layout and structure",
  "Selection and input",
  "Images and icons",
  "Feedback indicators",
  "Typography",
  "Table",
  "List",
  "Navigation",
  "Overlays",
  "Utilities",
];

export type RenderedComponent = {
  id: string;
  children: RenderedComponent[];
  componentName: ComponentName;
  props: any;
};

export const listOfComponent: ComponentMenuItem[] = [
  {
    componentName: "AccountConnection",
    category: "Actions",
  },
  {
    componentName: "Button",
    category: "Actions",
  },
  {
    componentName: "ButtonGroup",
    category: "Actions",
  },
  {
    componentName: "PageActions",
    category: "Actions",
  },
  {
    componentName: "Badge",
    category: "Feedback indicators",
  },
  {
    componentName: "Banner",
    category: "Feedback indicators",
  },
  {
    componentName: "ExceptionList",
    category: "Feedback indicators",
  },
  {
    componentName: "Loading",
    category: "Feedback indicators",
  },
  {
    componentName: "ProgressBar",
    category: "Feedback indicators",
  },
  {
    componentName: "SkeletonBodyText",
    category: "Feedback indicators",
  },
  {
    componentName: "SkeletonDisplayText",
    category: "Feedback indicators",
  },
  {
    componentName: "SkeletonPage",
    category: "Feedback indicators",
  },
  {
    componentName: "SkeletonTabs",
    category: "Feedback indicators",
  },
  {
    componentName: "SkeletonThumbnail",
    category: "Feedback indicators",
  },
  {
    componentName: "Spinner",
    category: "Feedback indicators",
  },
  {
    componentName: "Toast",
    category: "Feedback indicators",
  },
  {
    componentName: "Avatar",
    category: "Images and icons",
  },
  {
    componentName: "Icon",
    category: "Images and icons",
  },
  {
    componentName: "KeyboardKey",
    category: "Images and icons",
  },
  {
    componentName: "Thumbnail",
    category: "Images and icons",
  },
  {
    componentName: "VideoThumbnail",
    category: "Images and icons",
  },
  {
    componentName: "Bleed",
    category: "Layout and structure",
  },
  {
    componentName: "BlockStack",
    category: "Layout and structure",
  },
  {
    componentName: "Box",
    category: "Layout and structure",
  },
  {
    componentName: "CalloutCard",
    category: "Layout and structure",
  },
  {
    componentName: "Card",
    category: "Layout and structure",
  },
  {
    componentName: "Divider",
    category: "Layout and structure",
  },
  {
    componentName: "EmptyState",
    category: "Layout and structure",
  },
  {
    componentName: "FormLayout",
    category: "Layout and structure",
  },
  {
    componentName: "FormLayout.Group",
    category: "Layout and structure",
  },
  {
    componentName: "Grid",
    category: "Layout and structure",
  },
  {
    componentName: "Grid.Cell",
    category: "Layout and structure",
  },
  {
    componentName: "InlineGrid",
    category: "Layout and structure",
  },
  {
    componentName: "InlineStack",
    category: "Layout and structure",
  },
  {
    componentName: "Layout",
    category: "Layout and structure",
  },
  {
    componentName: "MediaCard",
    category: "Layout and structure",
  },
  {
    componentName: "Page",
    category: "Layout and structure",
  },
  {
    componentName: "ActionList",
    category: "List",
  },
  {
    componentName: "DescriptionList",
    category: "List",
  },
  {
    componentName: "List",
    category: "List",
  },
  {
    componentName: "Listbox",
    category: "List",
  },
  {
    componentName: "OptionList",
    category: "List",
  },
  {
    componentName: "ResourceItem",
    category: "List",
  },
  {
    componentName: "ResourceList",
    category: "List",
  },
  {
    componentName: "FooterHelp",
    category: "Navigation",
  },
  {
    componentName: "FullscreenBar",
    category: "Navigation",
  },
  {
    componentName: "Link",
    category: "Navigation",
  },
  {
    componentName: "Navigation",
    category: "Navigation",
  },
  {
    componentName: "Pagination",
    category: "Navigation",
  },
  {
    componentName: "Tabs",
    category: "Navigation",
  },
  {
    componentName: "TopBar",
    category: "Navigation",
  },
  {
    componentName: "Modal",
    category: "Overlays",
  },
  {
    componentName: "Popover",
    category: "Overlays",
  },
  {
    componentName: "Tooltip",
    category: "Overlays",
  },
  {
    componentName: "Autocomplete",
    category: "Selection and input",
  },
  {
    componentName: "Checkbox",
    category: "Selection and input",
  },
  {
    componentName: "ChoiceList",
    category: "Selection and input",
  },
  {
    componentName: "ColorPicker",
    category: "Selection and input",
  },
  {
    componentName: "Combobox",
    category: "Selection and input",
  },
  {
    componentName: "ContextualSaveBar",
    category: "Selection and input",
  },
  {
    componentName: "DatePicker",
    category: "Selection and input",
  },
  {
    componentName: "DropZone",
    category: "Selection and input",
  },
  {
    componentName: "Filters",
    category: "Selection and input",
  },
  {
    componentName: "Form",
    category: "Selection and input",
  },
  {
    componentName: "IndexFilters",
    category: "Selection and input",
  },
  {
    componentName: "InlineError",
    category: "Selection and input",
  },
  {
    componentName: "RadioButton",
    category: "Selection and input",
  },
  {
    componentName: "RangeSlider",
    category: "Selection and input",
  },
  {
    componentName: "Select",
    category: "Selection and input",
  },
  {
    componentName: "Tag",
    category: "Selection and input",
  },
  {
    componentName: "TextField",
    category: "Selection and input",
  },
  {
    componentName: "DataTable",
    category: "Table",
  },
  {
    componentName: "IndexTable",
    category: "Table",
  },
  {
    componentName: "Text",
    category: "Typography",
  },
  // {
  //   componentName: "AppProvider",
  //   category: "Utilities",
  // },
  {
    componentName: "Collapsible",
    category: "Utilities",
  },
  {
    componentName: "Frame",
    category: "Utilities",
  },
  {
    componentName: "Scrollable",
    category: "Utilities",
  },
];

export const rootComponentId = "root";

// This is to work around type error when upgrading to new version of polaris
const spacingScaleRecord: Record<SpaceScale | "", 1> = {
  "0": 1,
  "025": 1,
  "050": 1,
  "100": 1,
  "150": 1,
  "200": 1,
  "300": 1,
  "400": 1,
  "500": 1,
  "600": 1,
  "800": 1,
  "1000": 1,
  "1200": 1,
  "1600": 1,
  "2000": 1,
  "2400": 1,
  "2800": 1,
  "3200": 1,
  "": 1,
};

export const spacingScales = Object.keys(spacingScaleRecord) as SpaceScale[];

const colorBackgroundRecord: Record<ColorBackgroundAlias | "", 1> = {
  "bg-fill-active": 1,
  "bg-fill-brand-active": 1,
  "bg-fill-brand-disabled": 1,
  "bg-fill-brand-hover": 1,
  "bg-fill-brand-selected": 1,
  "bg-fill-brand": 1,
  "bg-fill-caution-active": 1,
  "bg-fill-caution-hover": 1,
  "bg-fill-caution-secondary": 1,
  "bg-fill-caution": 1,
  "bg-fill-critical-active": 1,
  "bg-fill-critical-hover": 1,
  "bg-fill-critical-secondary": 1,
  "bg-fill-critical-selected": 1,
  "bg-fill-critical": 1,
  "bg-fill-disabled": 1,
  "bg-fill-emphasis-active": 1,
  "bg-fill-emphasis-hover": 1,
  "bg-fill-emphasis": 1,
  "bg-fill-hover": 1,
  "bg-fill-info-active": 1,
  "bg-fill-info-hover": 1,
  "bg-fill-info-secondary": 1,
  "bg-fill-info": 1,
  "bg-fill-inverse-active": 1,
  "bg-fill-inverse-hover": 1,
  "bg-fill-inverse": 1,
  "bg-fill-magic-secondary-active": 1,
  "bg-fill-magic-secondary-hover": 1,
  "bg-fill-magic-secondary": 1,
  "bg-fill-magic": 1,
  "bg-fill-secondary-active": 1,
  "bg-fill-secondary-hover": 1,
  "bg-fill-secondary": 1,
  "bg-fill-selected": 1,
  "bg-fill-success-active": 1,
  "bg-fill-success-hover": 1,
  "bg-fill-success-secondary": 1,
  "bg-fill-success": 1,
  "bg-fill-tertiary-active": 1,
  "bg-fill-tertiary-hover": 1,
  "bg-fill-tertiary": 1,
  "bg-fill-transparent-active": 1,
  "bg-fill-transparent-hover": 1,
  "bg-fill-transparent-secondary-active": 1,
  "bg-fill-transparent-secondary-hover": 1,
  "bg-fill-transparent-secondary": 1,
  "bg-fill-transparent-selected": 1,
  "bg-fill-transparent": 1,
  "bg-fill-warning-active": 1,
  "bg-fill-warning-hover": 1,
  "bg-fill-warning-secondary": 1,
  "bg-fill-warning": 1,
  "bg-fill": 1,
  "bg-inverse": 1,
  "bg-surface-active": 1,
  "bg-surface-brand-active": 1,
  "bg-surface-brand-hover": 1,
  "bg-surface-brand-selected": 1,
  "bg-surface-brand": 1,
  "bg-surface-caution-active": 1,
  "bg-surface-caution-hover": 1,
  "bg-surface-caution": 1,
  "bg-surface-critical-active": 1,
  "bg-surface-critical-hover": 1,
  "bg-surface-critical": 1,
  "bg-surface-disabled": 1,
  "bg-surface-emphasis-active": 1,
  "bg-surface-emphasis-hover": 1,
  "bg-surface-emphasis": 1,
  "bg-surface-hover": 1,
  "bg-surface-info-active": 1,
  "bg-surface-info-hover": 1,
  "bg-surface-info": 1,
  "bg-surface-inverse": 1,
  "bg-surface-magic-active": 1,
  "bg-surface-magic-hover": 1,
  "bg-surface-magic": 1,
  "bg-surface-secondary-active": 1,
  "bg-surface-secondary-hover": 1,
  "bg-surface-secondary-selected": 1,
  "bg-surface-secondary": 1,
  "bg-surface-selected": 1,
  "bg-surface-success-active": 1,
  "bg-surface-success-hover": 1,
  "bg-surface-success": 1,
  "bg-surface-tertiary-active": 1,
  "bg-surface-tertiary-hover": 1,
  "bg-surface-tertiary": 1,
  "bg-surface-transparent": 1,
  "bg-surface-warning-active": 1,
  "bg-surface-warning-hover": 1,
  "bg-surface-warning": 1,
  "bg-surface": 1,
  bg: 1,
  "avatar-bg-fill": 1,
  "avatar-five-bg-fill": 1,
  "avatar-four-bg-fill": 1,
  "avatar-one-bg-fill": 1,
  "avatar-three-bg-fill": 1,
  "avatar-two-bg-fill": 1,
  "backdrop-bg": 1,
  "checkbox-bg-surface-disabled": 1,
  "input-bg-surface-active": 1,
  "input-bg-surface-hover": 1,
  "input-bg-surface": 1,
  "nav-bg-surface-active": 1,
  "nav-bg-surface-hover": 1,
  "nav-bg-surface-selected": 1,
  "nav-bg-surface": 1,
  "nav-bg": 1,
  "radio-button-bg-surface-disabled": 1,
  "video-thumbnail-play-button-bg-fill-hover": 1,
  "video-thumbnail-play-button-bg-fill": 1,
  "": 1,
};

export const colorBackgroundAliases = Object.keys(
  colorBackgroundRecord,
) as ColorBackgroundAlias[];

const colorBorderRecord: Record<ColorBorderAlias | "", 1> = {
  "border-brand": 1,
  "border-caution": 1,
  "border-critical-secondary": 1,
  "border-critical": 1,
  "border-disabled": 1,
  "border-emphasis-active": 1,
  "border-emphasis-hover": 1,
  "border-emphasis": 1,
  "border-focus": 1,
  "border-hover": 1,
  "border-info": 1,
  "border-inverse-active": 1,
  "border-inverse-hover": 1,
  "border-inverse": 1,
  "border-magic-secondary": 1,
  "border-magic": 1,
  "border-secondary": 1,
  "border-success": 1,
  "border-tertiary": 1,
  "border-warning": 1,
  border: 1,
  "input-border-active": 1,
  "input-border-hover": 1,
  "input-border": 1,
  "": 1,
};

export const colorBorderAliases = Object.keys(
  colorBorderRecord,
) as ColorBorderAlias[];

export const colorBorderAliasesWithTransparent = colorBorderAliases.concat(
  "transparent" as ColorBorderAlias,
) as ColorBorderAlias[];

const colorIconRecord: Record<ColorIconAlias | "", 1> = {
  "icon-active": 1,
  "icon-brand": 1,
  "icon-caution": 1,
  "icon-critical": 1,
  "icon-disabled": 1,
  "icon-emphasis-active": 1,
  "icon-emphasis-hover": 1,
  "icon-emphasis": 1,
  "icon-hover": 1,
  "icon-info": 1,
  "icon-inverse": 1,
  "icon-magic": 1,
  "icon-secondary-active": 1,
  "icon-secondary-hover": 1,
  "icon-secondary": 1,
  "icon-success": 1,
  "icon-warning": 1,
  icon: 1,
  "checkbox-icon-disabled": 1,
  "radio-button-icon-disabled": 1,
  "": 1,
};

export const colorIconAliases = Object.keys(
  colorIconRecord,
) as ColorIconAlias[];

const colorTextRecord: Record<ColorTextAlias | "", 1> = {
  "text-brand-hover": 1,
  "text-brand-on-bg-fill-active": 1,
  "text-brand-on-bg-fill-disabled": 1,
  "text-brand-on-bg-fill-hover": 1,
  "text-brand-on-bg-fill": 1,
  "text-brand": 1,
  "text-caution-active": 1,
  "text-caution-hover": 1,
  "text-caution-on-bg-fill": 1,
  "text-caution": 1,
  "text-critical-active": 1,
  "text-critical-hover": 1,
  "text-critical-on-bg-fill": 1,
  "text-critical": 1,
  "text-disabled": 1,
  "text-emphasis-active": 1,
  "text-emphasis-hover": 1,
  "text-emphasis-on-bg-fill-active": 1,
  "text-emphasis-on-bg-fill-hover": 1,
  "text-emphasis-on-bg-fill": 1,
  "text-emphasis": 1,
  "text-info-active": 1,
  "text-info-hover": 1,
  "text-info-on-bg-fill": 1,
  "text-info": 1,
  "text-inverse-secondary": 1,
  "text-inverse": 1,
  "text-link-active": 1,
  "text-link-hover": 1,
  "text-link-inverse": 1,
  "text-link": 1,
  "text-magic-on-bg-fill": 1,
  "text-magic": 1,
  "text-secondary": 1,
  "text-success-active": 1,
  "text-success-hover": 1,
  "text-success-on-bg-fill": 1,
  "text-success": 1,
  "text-warning-active": 1,
  "text-warning-hover": 1,
  "text-warning-on-bg-fill": 1,
  "text-warning": 1,
  text: 1,
  "avatar-five-text-on-bg-fill": 1,
  "avatar-four-text-on-bg-fill": 1,
  "avatar-one-text-on-bg-fill": 1,
  "avatar-three-text-on-bg-fill": 1,
  "avatar-two-text-on-bg-fill": 1,
  "avatar-text-on-bg-fill": 1,
  "video-thumbnail-play-button-text-on-bg-fill": 1,
  "": 1,
};

export const colorTextAliases = Object.keys(
  colorTextRecord,
) as ColorTextAlias[];

const borderRadiusAliasOrScalesRecord: Record<
  BorderRadiusAliasOrScale | "",
  1
> = {
  full: 1,
  "0": 1,
  "050": 1,
  "100": 1,
  "150": 1,
  "200": 1,
  "300": 1,
  "400": 1,
  "500": 1,
  "750": 1,
  "": 1,
};

export const borderRadiusAliasOrScales = Object.keys(
  borderRadiusAliasOrScalesRecord,
) as BorderRadiusAliasOrScale[];

const BorderWidthScaleRecord: Record<BorderWidthScale | "", 1> = {
  "0165": 1,
  "025": 1,
  "050": 1,
  "100": 1,
  "": 1,
};

export const borderWidthScales = Object.keys(
  BorderWidthScaleRecord,
) as BorderWidthScale[];

const shadowScaleRecord: Record<ShadowAliasOrScale | "", 1> = {
  "0": 1,
  "100": 1,
  "200": 1,
  "300": 1,
  "400": 1,
  "500": 1,
  "600": 1,
  button: 1,
  "button-hover": 1,
  "button-inset": 1,
  "button-primary": 1,
  "button-primary-hover": 1,
  "button-primary-inset": 1,
  "button-primary-critical": 1,
  "button-primary-critical-hover": 1,
  "button-primary-critical-inset": 1,
  "button-primary-success": 1,
  "button-primary-success-hover": 1,
  "button-primary-success-inset": 1,
  "border-inset": 1,
  "": 1,
};
export const shadowScales = Object.keys(
  shadowScaleRecord,
) as ShadowAliasOrScale[];

const breakpointsAliasRecord: Record<BreakpointsAlias | "", 1> = {
  xs: 1,
  sm: 1,
  md: 1,
  lg: 1,
  xl: 1,
  "": 1,
};
export const breakpointsAliases = Object.keys(
  breakpointsAliasRecord,
) as BreakpointsAlias[];

export const enum ComponentAcceptType {
  Single = "Single",
  ParentWithSpecificChildren = "ParentWithSpecificChildren",
  ParentWithAnyChildren = "ParentWithAnyChildren",
}

export const acceptComponentsMap: Partial<
  Record<
    ComponentName,
    { type: ComponentAcceptType; childrenList?: ComponentName[] }
  >
> = {
  Divider: { type: ComponentAcceptType.Single },
  Button: { type: ComponentAcceptType.Single },
  PageActions: { type: ComponentAcceptType.Single },
  AccountConnection: { type: ComponentAcceptType.Single },
  ButtonGroup: {
    type: ComponentAcceptType.ParentWithAnyChildren,
    childrenList: ["Button"],
  },
  Bleed: {
    type: ComponentAcceptType.ParentWithAnyChildren,
  },
  BlockStack: {
    type: ComponentAcceptType.ParentWithAnyChildren,
  },
  Box: {
    type: ComponentAcceptType.ParentWithAnyChildren,
  },
  CalloutCard: {
    type: ComponentAcceptType.ParentWithAnyChildren,
  },
  Card: {
    type: ComponentAcceptType.ParentWithAnyChildren,
  },
  EmptyState: {
    type: ComponentAcceptType.ParentWithAnyChildren,
  },
  FormLayout: {
    type: ComponentAcceptType.ParentWithAnyChildren,
  },
  "FormLayout.Group": {
    type: ComponentAcceptType.ParentWithAnyChildren,
  },
  Grid: {
    type: ComponentAcceptType.ParentWithAnyChildren,
  },
  "Grid.Cell": {
    type: ComponentAcceptType.ParentWithAnyChildren,
  },
  InlineGrid: {
    type: ComponentAcceptType.ParentWithAnyChildren,
  },
  InlineStack: {
    type: ComponentAcceptType.ParentWithAnyChildren,
  },
  Layout: {
    type: ComponentAcceptType.ParentWithAnyChildren,
  },
};

export type FormLayoutGroupProps = ComponentPropsWithoutRef<
  typeof FormLayout.Group
>;

export type SectionProps = ComponentPropsWithoutRef<typeof Layout.Section>;

const parentComponentAcceptTypeSet = new Set<ComponentAcceptType>([
  ComponentAcceptType.ParentWithSpecificChildren,
  ComponentAcceptType.ParentWithAnyChildren,
]);

export const parentComponentList: ComponentName[] = Object.keys(
  acceptComponentsMap,
)
  .map((componentName) => {
    if (
      parentComponentAcceptTypeSet.has(
        acceptComponentsMap[componentName as ComponentName]
          ?.type as ComponentAcceptType,
      )
    ) {
      return componentName;
    }

    return null;
  })
  .filter(Boolean) as ComponentName[];
