import { UniqueIdentifier } from "@dnd-kit/core";

type ComponentName =
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
  | "Grid"
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
  | "AppProvider"
  | "Collapsible"
  | "Frame"
  | "Scrollable";

export type MenuItem = {
  name: ComponentName;
};

export type RenderedComponent = {
  id: UniqueIdentifier;
  children: RenderedComponent[];
};

export const listOfComponent: MenuItem[] = [
  {
    name: "AccountConnection",
  },
  {
    name: "Button",
  },
  {
    name: "ButtonGroup",
  },
  {
    name: "PageActions",
  },
  {
    name: "Caption",
  },
  {
    name: "DisplayText",
  },
  {
    name: "Heading",
  },
  {
    name: "LegacyCard",
  },
  {
    name: "LegacyFilters",
  },
  {
    name: "LegacyStack",
  },
  {
    name: "LegacyTabs",
  },
  {
    name: "SettingToggle",
  },
  {
    name: "Sheet",
  },
  {
    name: "Subheading",
  },
  {
    name: "TextContainer",
  },
  {
    name: "TextStyle",
  },
  {
    name: "VisuallyHidden",
  },
  {
    name: "Badge",
  },
  {
    name: "Banner",
  },
  {
    name: "ExceptionList",
  },
  {
    name: "Loading",
  },
  {
    name: "ProgressBar",
  },
  {
    name: "SkeletonBodyText",
  },
  {
    name: "SkeletonDisplayText",
  },
  {
    name: "SkeletonPage",
  },
  {
    name: "SkeletonTabs",
  },
  {
    name: "SkeletonThumbnail",
  },
  {
    name: "Spinner",
  },
  {
    name: "Toast",
  },
  {
    name: "Avatar",
  },
  {
    name: "Icon",
  },
  {
    name: "KeyboardKey",
  },
  {
    name: "Thumbnail",
  },
  {
    name: "VideoThumbnail",
  },
  {
    name: "Bleed",
  },
  {
    name: "BlockStack",
  },
  {
    name: "Box",
  },
  {
    name: "CalloutCard",
  },
  {
    name: "Card",
  },
  {
    name: "Divider",
  },
  {
    name: "EmptyState",
  },
  {
    name: "FormLayout",
  },
  {
    name: "Grid",
  },
  {
    name: "InlineGrid",
  },
  {
    name: "InlineStack",
  },
  {
    name: "Layout",
  },
  {
    name: "MediaCard",
  },
  {
    name: "Page",
  },
  {
    name: "ActionList",
  },
  {
    name: "DescriptionList",
  },
  {
    name: "List",
  },
  {
    name: "Listbox",
  },
  {
    name: "OptionList",
  },
  {
    name: "ResourceItem",
  },
  {
    name: "ResourceList",
  },
  {
    name: "FooterHelp",
  },
  {
    name: "FullscreenBar",
  },
  {
    name: "Link",
  },
  {
    name: "Navigation",
  },
  {
    name: "Pagination",
  },
  {
    name: "Tabs",
  },
  {
    name: "TopBar",
  },
  {
    name: "Modal",
  },
  {
    name: "Popover",
  },
  {
    name: "Tooltip",
  },
  {
    name: "Autocomplete",
  },
  {
    name: "Checkbox",
  },
  {
    name: "ChoiceList",
  },
  {
    name: "ColorPicker",
  },
  {
    name: "Combobox",
  },
  {
    name: "ContextualSaveBar",
  },
  {
    name: "DatePicker",
  },
  {
    name: "DropZone",
  },
  {
    name: "Filters",
  },
  {
    name: "Form",
  },
  {
    name: "IndexFilters",
  },
  {
    name: "InlineError",
  },
  {
    name: "RadioButton",
  },
  {
    name: "RangeSlider",
  },
  {
    name: "Select",
  },
  {
    name: "Tag",
  },
  {
    name: "TextField",
  },
  {
    name: "DataTable",
  },
  {
    name: "IndexTable",
  },
  {
    name: "Text",
  },
  {
    name: "AppProvider",
  },
  {
    name: "Collapsible",
  },
  {
    name: "Frame",
  },
  {
    name: "Scrollable",
  },
];

export const rootComponentId = "root";
