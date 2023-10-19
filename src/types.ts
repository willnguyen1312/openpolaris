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
    componentName: "Grid",
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
  {
    componentName: "AppProvider",
    category: "Utilities",
  },
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

  // TODO: Should I support deprecated components? 😗
  // {
  //   componentName: "Caption",
  // },
  // {
  //   componentName: "DisplayText",
  // },
  // {
  //   componentName: "Heading",
  // },
  // {
  //   componentName: "LegacyCard",
  // },
  // {
  //   componentName: "LegacyFilters",
  // },
  // {
  //   componentName: "LegacyStack",
  // },
  // {
  //   componentName: "LegacyTabs",
  // },
  // {
  //   componentName: "SettingToggle",
  // },
  // {
  //   componentName: "Sheet",
  // },
  // {
  //   componentName: "Subheading",
  // },
  // {
  //   componentName: "TextContainer",
  // },
  // {
  //   componentName: "TextStyle",
  // },
  // {
  //   componentName: "VisuallyHidden",
  // },
];

export const rootComponentId = "root";
export const parentComponentList: ComponentName[] = ["ButtonGroup"];

export const acceptComponentsMap: Partial<
  Record<ComponentName, ComponentName[]>
> = {
  Divider: [],
  Button: [],
  ButtonGroup: ["Button"],
};
