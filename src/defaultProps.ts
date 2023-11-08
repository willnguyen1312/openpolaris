import {
  AccountConnectionProps,
  ActionListProps,
  AvatarProps,
  BadgeProps,
  BannerProps,
  BleedProps,
  BlockStackProps,
  BoxProps,
  ButtonGroupProps,
  ButtonProps,
  CalloutCardProps,
  CardProps,
  CheckboxProps,
  ChoiceListProps,
  ColorPickerProps,
  DatePickerProps,
  DescriptionListProps,
  DividerProps,
  DropZoneProps,
  EmptyStateProps,
  ExceptionListProps,
  FooterHelpProps,
  FormLayoutProps,
  FormProps,
  FullscreenBarProps,
  GridCellProps,
  GridProps,
  IconProps,
  InlineErrorProps,
  InlineGridProps,
  InlineStackProps,
  KeyboardKeyProps,
  LayoutProps,
  LinkProps,
  ListProps,
  ListboxProps,
  ModalProps,
  OptionListProps,
  PageActionsProps,
  PageProps,
  PaginationProps,
  ProgressBarProps,
  RadioButtonProps,
  RangeSliderProps,
  SelectProps,
  SkeletonBodyTextProps,
  SkeletonDisplayTextProps,
  SkeletonPageProps,
  SkeletonTabsProps,
  SkeletonThumbnailProps,
  SpinnerProps,
  TagProps,
  TextFieldProps,
  TextProps,
  ThumbnailProps,
  TooltipProps,
} from "@shopify/polaris";

import { VideoThumbnailProps } from "@shopify/polaris/build/ts/src/components/VideoThumbnail";
import {
  ComponentName,
  DropZoneFileUploadProps,
  FormLayoutGroupProps,
  LayoutAnnotatedSectionProps,
  LayoutSectionProps,
  ListBoxActionProps,
  ListBoxHeaderProps,
  ListBoxLoadingProps,
  ListBoxOptionProps,
  ListBoxSectionProps,
  ListBoxTextOptionProps,
  ListItemProps,
  MediaCardProps,
} from "./types";

export const defaultProps: Record<ComponentName, any> = {
  // Actions
  AccountConnection: {
    title: "title",
    details: "details",
    termsOfService: "termsOfService",
    accountName: "",
    avatarUrl: "",
    connected: false,
    action: {
      id: "",
      content: "Connect",
      accessibilityLabel: "",
      url: "",
      external: false,
      target: "" as any,
    },
  } satisfies AccountConnectionProps,
  Button: {
    children: "Button",
    size: "" as ButtonProps["size"],
    textAlign: "" as ButtonProps["textAlign"],
    fullWidth: false,
    disclosure: "" as any,
    dataPrimaryLink: false,
    icon: undefined,
    tone: "" as ButtonProps["tone"],
    variant: "" as ButtonProps["variant"],
    id: "",
    url: "",
    external: false,
    target: undefined,
    download: "",
    submit: false,
    disabled: false,
    loading: false,
    pressed: false,
  } satisfies ButtonProps,
  ButtonGroup: {
    gap: "" as ButtonGroupProps["gap"],
    variant: undefined,
    fullWidth: false,
    connectedTop: false,
    noWrap: false,
    children: undefined,
  } satisfies ButtonGroupProps,
  PageActions: {
    primaryAction: {
      content: "Save",
      loading: false,
      disabled: false,
      external: false,
      id: "",
      accessibilityLabel: "",
      url: "",
      target: "" as any,
    },
    secondaryActions: [
      {
        content: "Delete",
        loading: false,
        disabled: false,
        external: false,
        id: "",
        accessibilityLabel: "",
        url: "",
        icon: undefined,
      },
    ],
  } satisfies PageActionsProps,

  // Layout and structure
  Bleed: {
    marginInline: "" as BleedProps["marginInline"],
    marginBlock: "" as BleedProps["marginBlock"],
    marginBlockStart: "" as BleedProps["marginBlockStart"],
    marginBlockEnd: "" as BleedProps["marginBlockEnd"],
    marginInlineStart: "" as BleedProps["marginInlineStart"],
    marginInlineEnd: "" as BleedProps["marginInlineEnd"],
  } satisfies BleedProps,

  BlockStack: {
    as: "" as BlockStackProps["as"],
    align: "" as BlockStackProps["align"],
    inlineAlign: "" as BlockStackProps["inlineAlign"],
    gap: "" as BlockStackProps["gap"],
    id: "",
    reverseOrder: false,
    role: "" as BlockStackProps["role"],
  } satisfies BlockStackProps,

  Box: {
    as: "" as BoxProps["as"],
    background: "" as BoxProps["background"],
    borderColor: "" as BoxProps["borderColor"],
    borderStyle: "" as BoxProps["borderStyle"],
    borderRadius: "" as BoxProps["borderRadius"],
    borderEndStartRadius: "" as BoxProps["borderEndStartRadius"],
    borderEndEndRadius: "" as BoxProps["borderEndEndRadius"],
    borderStartStartRadius: "" as BoxProps["borderStartStartRadius"],
    borderStartEndRadius: "" as BoxProps["borderStartEndRadius"],
    borderWidth: "" as BoxProps["borderWidth"],
    borderBlockStartWidth: "" as BoxProps["borderBlockStartWidth"],
    borderBlockEndWidth: "" as BoxProps["borderBlockEndWidth"],
    borderInlineStartWidth: "" as BoxProps["borderInlineStartWidth"],
    borderInlineEndWidth: "" as BoxProps["borderInlineEndWidth"],
    color: "" as BoxProps["color"],
    id: "",
    minHeight: "",
    minWidth: "",
    maxWidth: "",
    overflowX: "" as BoxProps["overflowX"],
    overflowY: "" as BoxProps["overflowY"],
    padding: "" as BoxProps["padding"],
    paddingBlockStart: "" as BoxProps["paddingBlockStart"],
    paddingBlockEnd: "" as BoxProps["paddingBlockEnd"],
    paddingInlineStart: "" as BoxProps["paddingInlineStart"],
    paddingInlineEnd: "" as BoxProps["paddingInlineEnd"],
    role: "" as BoxProps["role"],
    shadow: "" as BoxProps["shadow"],
    tabIndex: "" as unknown as BoxProps["tabIndex"],
    width: "",
    position: "" as BoxProps["position"],
    insetBlockStart: "" as BoxProps["insetBlockStart"],
    insetBlockEnd: "" as BoxProps["insetBlockEnd"],
    insetInlineStart: "" as BoxProps["insetInlineStart"],
    insetInlineEnd: "" as BoxProps["insetInlineEnd"],
    opacity: "",
    outlineColor: "" as BoxProps["outlineColor"],
    outlineStyle: "" as BoxProps["outlineStyle"],
    outlineWidth: "" as BoxProps["outlineWidth"],
    printHidden: false,
    visuallyHidden: false,
    zIndex: "",
  } satisfies BoxProps,
  CalloutCard: {
    title: "Customize the style of your checkout",
    illustration:
      "https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg",
    primaryAction: {
      id: "",
      content: "Customize checkout",
      accessibilityLabel: "",
      url: "",
      external: false,
      target: "" as any,
    },
    secondaryAction: {
      id: "",
      content: "Learn more about customizing checkout",
      accessibilityLabel: "",
      url: "",
      external: false,
      target: "" as any,
    },
  } satisfies CalloutCardProps,
  Card: {
    background: "" as CardProps["background"],
    padding: "" as CardProps["padding"],
    roundedAbove: "" as CardProps["roundedAbove"],
  } satisfies CardProps,
  Divider: {
    borderColor: "border-magic" as DividerProps["borderColor"],
    borderWidth: "100" as DividerProps["borderWidth"],
  } satisfies DividerProps,
  EmptyState: {
    heading: "Manage your inventory transfers",
    image:
      "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
    largeImage: "",
    imageContained: false,
    fullWidth: false,
    action: {
      content: "Add transfer",
      accessibilityLabel: "",
      destructive: false,
      external: false,
      disabled: false,
      icon: undefined,
      id: "",
      outline: false,
      plain: false,
      loading: false,
      url: "",
      target: "" as any,
    },
    secondaryAction: {
      content: "Learn more",
      url: "https://help.shopify.com",
      accessibilityLabel: "",
      destructive: false,
      external: false,
      disabled: false,
      icon: undefined,
      id: "",
      outline: false,
      plain: false,
      loading: false,
      target: "" as any,
    },
    footerContent: "Learn more about transfers",
  } satisfies EmptyStateProps,
  FormLayout: {} satisfies FormLayoutProps,
  "FormLayout.Group": {
    condensed: false,
    helpText: "",
    title: "",
  } satisfies FormLayoutGroupProps,
  Grid: {
    columns: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
    },
    gap: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
  } satisfies GridProps,
  "Grid.Cell": {
    columnSpan: {
      xs: 6,
      sm: 6,
      md: 6,
      lg: 4,
      xl: 6,
    },
  } satisfies GridCellProps,
  InlineGrid: {
    columns: "" as InlineGridProps["columns"],
    gap: "" as InlineGridProps["gap"],
    alignItems: "" as InlineGridProps["alignItems"],
  } satisfies InlineGridProps,
  InlineStack: {
    align: "" as InlineStackProps["align"],
    blockAlign: "" as InlineStackProps["blockAlign"],
    gap: "" as InlineStackProps["gap"],
    wrap: true,
  } satisfies InlineStackProps,
  Layout: {
    sectioned: false,
  } satisfies LayoutProps,
  "Layout.Section": {
    variant: "" as LayoutSectionProps["variant"],
  } satisfies LayoutSectionProps,
  "Layout.AnnotatedSection": {
    description:
      "Shopify and your customers will use this information to contact you.",
    title: "Store details",
    id: "",
  } satisfies LayoutAnnotatedSectionProps,

  MediaCard: {
    title: "Getting Started",
    description:
      "Discover how Shopify can power up your entrepreneurial journey.",
    primaryAction: {
      content: "Learn about getting started",
      accessibilityLabel: "",
      destructive: false,
      external: false,
      disabled: false,
      id: "",
      outline: false,
      plain: false,
      loading: false,
      url: "",
      target: "" as any,
      icon: undefined,
    },
    secondaryAction: {
      content: "",
      accessibilityLabel: "",
      destructive: false,
      external: false,
      disabled: false,
      id: "",
      outline: false,
      plain: false,
      loading: false,
      url: "",
      target: "" as any,
      icon: undefined,
    },
    popoverActions: [
      {
        content: "Dismiss",
        active: false,
        accessibilityLabel: "",
        destructive: false,
        external: false,
        disabled: false,
        id: "",
        variant: "default",
        helpText: "",
        icon: undefined,
        suffix: "",
        target: "" as any,
        truncate: false,
        url: "",
        prefix: "",
        role: "",
      },
    ] as MediaCardProps["popoverActions"],
    portrait: false,
    size: "" as MediaCardProps["size"],
  } as MediaCardProps,
  Page: {
    title: "Page title",
    subtitle: "",
    titleMetadata: "",
    additionalMetadata: "",
    compactTitle: false,
    fullWidth: false,
    narrowWidth: false,
    titleHidden: false,
    filterActions: false,
    primaryAction: {
      content: "",
      accessibilityLabel: "",
      destructive: false,
      external: false,
      disabled: false,
      id: "",
      outline: false,
      plain: false,
      loading: false,
      url: "",
      target: "" as any,
      icon: undefined,
      primary: false,
      helpText: "",
    },
    secondaryActions: [
      {
        content: "",
        loading: false,
        disabled: false,
        external: false,
        id: "",
        accessibilityLabel: "",
        url: "",
        destructive: false,
        helpText: "",
        icon: undefined,
        index: undefined,
      },
      {
        content: "",
        loading: false,
        disabled: false,
        external: false,
        id: "",
        accessibilityLabel: "",
        url: "",
        destructive: false,
        helpText: "",
        icon: undefined,
        index: undefined,
      },
    ],
    backAction: {
      url: "",
      accessibilityLabel: "",
      content: "",
      id: "",
    } as PageProps["backAction"],
    pagination: {
      hasPrevious: false,
      hasNext: false,
    } as PageProps["pagination"],
    actionGroups: [
      {
        title: "",
        actions: [{ content: "" }],
        disabled: false,
      },
    ] as PageProps["actionGroups"],
  } as PageProps,

  // Images and icons
  Avatar: {
    size: "" as AvatarProps["size"],
    name: "",
    initials: "",
    customer: false,
    source: "",
    accessibilityLabel: "",
  } satisfies AvatarProps,
  Icon: {
    source: "CirclePlusMinor",
    tone: "" as IconProps["tone"],
    accessibilityLabel: "",
  } satisfies IconProps,
  KeyboardKey: {
    children: "Polaris",
    size: "" as KeyboardKeyProps["size"],
  } satisfies KeyboardKeyProps,
  Thumbnail: {
    size: "" as ThumbnailProps["size"],
    source:
      "https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg",
    alt: "Black choker necklace",
    transparent: false,
  } satisfies ThumbnailProps,
  VideoThumbnail: {
    thumbnailUrl:
      "https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850",
    videoLength: 80,
    videoProgress: 45,
    showVideoProgress: true,
    accessibilityLabel: "",
  } as VideoThumbnailProps,

  // Typography
  Text: {
    alignment: "" as TextProps["alignment"],
    as: "p" as TextProps["as"],
    breakWord: false,
    children: "Text",
    tone: "" as TextProps["tone"],
    fontWeight: "" as TextProps["fontWeight"],
    id: "",
    numeric: false,
    truncate: false,
    variant: "" as TextProps["variant"],
    visuallyHidden: false,
    textDecorationLine: "" as TextProps["textDecorationLine"],
  } satisfies TextProps,

  // Overlays
  Tooltip: {
    content: "Tooltip content",
    active: false,
    hoverDelay: "" as unknown as TooltipProps["hoverDelay"],
    dismissOnMouseOut: false,
    preferredPosition: "" as TooltipProps["preferredPosition"],
    activatorWrapper: "",
    accessibilityLabel: "",
    width: "" as TooltipProps["width"],
    padding: "" as TooltipProps["padding"],
    borderRadius: "" as TooltipProps["borderRadius"],
    zIndexOverride: "" as unknown as TooltipProps["zIndexOverride"],
    hasUnderline: false,
    persistOnClick: false,
  } satisfies TooltipProps,
  // Popover: {
  //   preferredPosition: "" as PopoverProps["preferredPosition"],
  //   preferredAlignment: "" as PopoverProps["preferredAlignment"],
  //   active: false,
  //   preferInputActivator: false,
  //   activatorWrapper: "",
  //   zIndexOverride: 400 as PopoverProps["zIndexOverride"],
  //   preventFocusOnClose: false,
  //   sectioned: false,
  //   fullWidth: false,
  //   fullHeight: false,
  //   fluidContent: false,
  //   fixed: false,
  //   hideOnPrint: false,
  //   autofocusTarget: "" as PopoverProps["autofocusTarget"],
  //   preventCloseOnChildOverlayClick: false,
  //   captureOverscroll: false,
  // } as PopoverProps,
  Modal: {
    open: false,
    src: "",
    iFrameName: "",
    title: "Reach more shoppers with Instagram product tags",
    titleHidden: false,
    footer: "",
    instant: false,
    sectioned: false,
    size: "" as ModalProps["size"],
    limitHeight: false,
    loading: false,
    noScroll: false,
    primaryAction: {
      content: "Add Instagram",
      loading: false,
      disabled: false,
      external: false,
      destructive: false,
      icon: undefined,
      id: "",
      accessibilityLabel: "",
      url: "",
      target: "" as any,
      outline: false,
      plain: false,
    },
    secondaryActions: [
      {
        content: "Learn more",
        loading: false,
        disabled: false,
        external: false,
        id: "",
        accessibilityLabel: "",
        url: "",
        icon: undefined,
        destructive: false,
        outline: false,
        plain: false,
        target: "" as any,
      },
    ],
  } as ModalProps,

  // Lists
  ActionList: {
    items: [
      {
        content: "Import file",
        accessibilityLabel: "",
        active: false,
        destructive: false,
        disabled: false,
        external: false,
        helpText: "",
        id: "",
        prefix: "",
        suffix: "",
        role: "",
        target: "" as any,
        url: "",
        truncate: false,
        variant: "" as any,
      },
      {
        content: "Export file",
        accessibilityLabel: "",
        active: false,
        destructive: false,
        disabled: false,
        external: false,
        helpText: "",
        id: "",
        prefix: "",
        suffix: "",
        role: "",
        target: "" as any,
        url: "",
        truncate: false,
        variant: "" as any,
      },
    ],
    actionRole: "",
    allowFiltering: false,
    sections: [
      {
        title: "File options",
        items: [
          { content: "Import file", icon: "ImportMinor" },
          { content: "Export file", icon: "ExportMinor" },
        ],
      },
      {
        title: "Bulk actions",
        items: [
          { content: "Edit", icon: "EditMinor" },
          { content: "Delete", icon: "DeleteMinor" },
        ],
      },
    ],
  } satisfies ActionListProps,
  DescriptionList: {
    items: [
      {
        term: "Logistics",
        description:
          "The management of products or other resources as they travel between a point of origin and a destination.",
      },
      {
        term: "Sole proprietorship",
        description:
          "A business structure where a single individual both owns and runs the company.",
      },
      {
        term: "Discount code",
        description:
          "A series of numbers and/or letters that an online shopper may enter at checkout to get a discount or special offer.",
      },
    ],
    gap: "" as DescriptionListProps["gap"],
  } satisfies DescriptionListProps,
  List: {
    gap: "" as ListProps["gap"],
    type: "" as ListProps["type"],
  } satisfies ListProps,
  "List.Item": {} satisfies ListItemProps,
  Listbox: {
    autoSelection: "" as ListboxProps["autoSelection"],
    enableKeyboardControl: false,
    accessibilityLabel: "",
    customListId: "",
  } as ListboxProps,
  "Listbox.Option": {
    children: "Option",
    value: "value",
    accessibilityLabel: "",
    disabled: false,
    divider: false,
    selected: false,
  } satisfies ListBoxOptionProps,
  "Listbox.TextOption": {
    disabled: false,
    selected: false,
    children: "TextOption",
  } satisfies ListBoxTextOptionProps,
  "Listbox.Header": {
    children: "Header",
  } satisfies ListBoxHeaderProps,
  "Listbox.Loading": {
    accessibilityLabel: "",
  } satisfies ListBoxLoadingProps,
  "Listbox.Section": {
    title: "Section",
    divider: false,
  } satisfies ListBoxSectionProps,
  "Listbox.Action": {
    value: "value",
    accessibilityLabel: "",
    disabled: false,
    divider: false,
    icon: "AccessibilityMajor",
    selected: false,
  } satisfies ListBoxActionProps,

  OptionList: {
    id: "",
    title: "Inventory Location",
    options: [
      { value: "byward_market", label: "Byward Market" },
      { value: "centretown", label: "Centretown" },
      { value: "hintonburg", label: "Hintonburg" },
      { value: "westboro", label: "Westboro" },
    ],
    role: "",
    selected: ["byward_market"],
    allowMultiple: false,
    verticalAlign: "" as OptionListProps["verticalAlign"],
    sections: [
      {
        options: [
          { value: "type", label: "Sale item type" },
          { value: "kind", label: "Sale kind" },
        ],
      },
      {
        title: "Traffic",
        options: [
          { value: "source", label: "Traffic referrer source" },
          { value: "host", label: "Traffic referrer host" },
          { value: "path", label: "Traffic referrer path" },
        ],
      },
    ],
  } as OptionListProps,

  // Feedback indicators
  Badge: {
    children: "Badge",
    icon: undefined,
    progress: "" as BadgeProps["progress"],
    size: "" as BadgeProps["size"],
    tone: "" as BadgeProps["tone"],
    toneAndProgressLabelOverride: "",
  } satisfies BadgeProps,
  Banner: {
    title: "Order archived",
    icon: undefined,
    hideIcon: false,
    tone: "" as BannerProps["tone"],
    stopAnnouncements: false,
    action: {
      accessibilityLabel: "",
      content: "Dismiss",
      disabled: false,
      external: false,
      id: "",
      loading: false,
      target: "" as any,
      url: "",
    },
    secondaryAction: {
      accessibilityLabel: "",
      content: "",
      disabled: false,
      external: false,
      id: "",
      loading: false,
      target: "" as any,
      url: "",
    },
  } as BannerProps,
  ExceptionList: {
    items: [
      {
        status: "" as ExceptionListProps["items"][0]["status"],
        icon: undefined,
        title: "Awesome",
        description:
          "This customer is awesome. Make sure to treat them awesome!",
        truncate: false,
      },
      {
        status: "" as ExceptionListProps["items"][0]["status"],
        icon: undefined,
        title: "Great",
        description: "This customer is great. Make sure to treat them great!",
        truncate: false,
      },
    ],
  } satisfies ExceptionListProps,
  ProgressBar: {
    animated: false,
    ariaLabelledBy: "",
    progress: 41,
    size: "" as ProgressBarProps["size"],
    tone: "" as ProgressBarProps["tone"],
  } satisfies ProgressBarProps,
  Spinner: {
    accessibilityLabel: "",
    hasFocusableParent: false,
    size: "" as SpinnerProps["size"],
  } satisfies SpinnerProps,
  SkeletonBodyText: {
    lines: 3,
  } satisfies SkeletonBodyTextProps,
  SkeletonDisplayText: {
    size: "" as SkeletonDisplayTextProps["size"],
  } satisfies SkeletonDisplayTextProps,
  SkeletonPage: {
    title: "SkeletonPage",
    fullWidth: false,
    narrowWidth: false,
    primaryAction: false,
    backAction: false,
  } satisfies SkeletonPageProps,
  SkeletonTabs: {
    count: 3,
  } satisfies SkeletonTabsProps,
  SkeletonThumbnail: {
    size: "" as SkeletonThumbnailProps["size"],
  } satisfies SkeletonThumbnailProps,

  // Navigation
  Pagination: {
    nextTooltip: "Next",
    previousTooltip: "Previous",
    nextURL: "",
    previousURL: "",
    hasNext: true,
    hasPrevious: true,
    accessibilityLabel: "",
    accessibilityLabels: {
      next: "Next",
      previous: "Previous",
    },
    label: "",
    type: "" as PaginationProps["type"],
  } satisfies PaginationProps,
  Link: {
    children: "Customer support",
    id: "",
    url: "",
    target: "" as LinkProps["target"],
    monochrome: false,
    removeUnderline: false,
    accessibilityLabel: "",
    dataPrimaryLink: false,
  } satisfies LinkProps,
  FullscreenBar: {} as FullscreenBarProps,
  FooterHelp: {
    children: "Learn more about Shopify 🐻‍❄️",
  } satisfies FooterHelpProps,

  // Selection and input
  Checkbox: {
    label: "Checkbox",
    labelHidden: false,
    checked: false,
    disabled: false,
    id: "",
    name: "",
    value: "",
    labelClassName: "",
    fill: false,
    helpText: "",
    error: false,
    ariaControls: "",
    ariaDescribedBy: "",
    bleed: "" as CheckboxProps["bleed"],
    bleedBlockStart: "" as CheckboxProps["bleedBlockStart"],
    bleedBlockEnd: "" as CheckboxProps["bleedBlockEnd"],
    bleedInlineStart: "" as CheckboxProps["bleedInlineStart"],
    bleedInlineEnd: "" as CheckboxProps["bleedInlineEnd"],
  } satisfies CheckboxProps,
  ChoiceList: {
    title: "Company name",
    choices: [
      { label: "Hidden", value: "hidden" },
      { label: "Optional", value: "optional" },
      { label: "Required", value: "required" },
    ],
    selected: ["hidden"],
    name: "",
    allowMultiple: false,
    titleHidden: false,
    error: "",
    disabled: false,
  } satisfies ChoiceListProps,
  ColorPicker: {
    id: "",
    color: {
      hue: 120,
      brightness: 1,
      saturation: 1,
    },
    allowAlpha: false,
    fullWidth: false,
  } as ColorPickerProps,
  // ContextualSaveBar: {
  //   alignContentFlush: false,
  //   message: "Unsaved changes",
  //   fullWidth: false,
  //   saveAction: {
  //     content: "Save",
  //     disabled: false,
  //     loading: false,
  //     url: "#",
  //   },
  //   discardAction: {
  //     content: "Discard",
  //     disabled: false,
  //     loading: false,
  //     url: "#",
  //     discardConfirmationModal: false,
  //   },
  // } as ContextualSaveBarProps,
  DatePicker: {
    id: "",
    month: 0,
    year: 2023,
    allowRange: false,
    multiMonth: false,
    weekStartsOn: 0,
    dayAccessibilityLabelPrefix: "",
  } satisfies DatePickerProps,
  DropZone: {
    label: "DropZone",
    labelAction: {
      content: "Add files",
      accessibilityLabel: "",
      external: false,
      id: "",
      target: "" as any,
      url: "",
    },
    labelHidden: false,
    id: "",
    accept: "",
    type: "" as DropZoneProps["type"],
    active: false,
    error: false,
    outline: false,
    overlay: false,
    overlayText: "",
    errorOverlayText: "",
    allowMultiple: false,
    disabled: false,
    dropOnPage: false,
    openFileDialog: false,
    variableHeight: false,
  } satisfies DropZoneProps,
  "DropZone.FileUpload": {
    actionHint: "",
    actionTitle: "",
  } satisfies DropZoneFileUploadProps,
  Form: {
    acceptCharset: "",
    action: "",
    autoComplete: false,
    encType: "" as FormProps["encType"],
    implicitSubmit: false,
    method: "" as FormProps["method"],
    name: "",
    noValidate: false,
    preventDefault: false,
    target: "" as FormProps["target"],
  } as FormProps,
  InlineError: {
    fieldID: "myFieldID",
    message: "Store name is required",
  } satisfies InlineErrorProps,
  RadioButton: {
    bleed: "" as RadioButtonProps["bleed"],
    bleedBlockStart: "" as RadioButtonProps["bleedBlockStart"],
    bleedBlockEnd: "" as RadioButtonProps["bleedBlockEnd"],
    bleedInlineStart: "" as RadioButtonProps["bleedInlineStart"],
    bleedInlineEnd: "" as RadioButtonProps["bleedInlineEnd"],
    ariaDescribedBy: "",
    label: "RadioButton option",
    labelHidden: false,
    checked: false,
    disabled: false,
    id: "",
    name: "accounts",
    fill: false,
    helpText: "",
    value: "disabled",
  } satisfies RadioButtonProps,
  RangeSlider: {
    label: "Opacity percentage",
    labelAction: {
      id: "",
      content: "",
      accessibilityLabel: "",
      url: "",
      external: false,
      target: "" as any,
    },
    labelHidden: false,
    id: "",
    value: "" as unknown as RangeSliderProps["value"],
    min: "" as unknown as RangeSliderProps["min"],
    max: "" as unknown as RangeSliderProps["max"],
    step: "" as unknown as RangeSliderProps["step"],
    output: false,
    helpText: "",
    error: "",
    disabled: false,
    prefix: "",
    suffix: "",
  } as RangeSliderProps,
  Select: {
    options: [
      { label: "Today", value: "today" },
      { label: "Yesterday", value: "yesterday" },
      { label: "Last 7 days", value: "lastWeek" },
    ],
    label: "Date range",
    labelAction: {
      id: "",
      content: "",
      accessibilityLabel: "",
      url: "",
      external: false,
      target: "" as any,
    },
    labelHidden: false,
    labelInline: false,
    disabled: false,
    helpText: "",
    placeholder: "",
    id: "",
    name: "",
    value: "",
    error: "",
    requiredIndicator: false,
  } satisfies SelectProps,
  Tag: {
    children: "Wholesale",
    accessibilityLabel: "",
    disabled: false,
    url: "",
  } satisfies TagProps,
  TextField: {
    label: "Store name",
    name: "",
    id: "",
    variant: "" as TextFieldProps["variant"],
    value: "",
    type: "" as TextFieldProps["type"],
    autoComplete: "off",
    align: "" as TextFieldProps["align"],
    role: "",
    autoFocus: false,
    connectedRight: "",
    connectedLeft: "",
    clearButton: false,
    disabled: false,
    error: "",
    focused: false,
    helpText: "",
    inputMode: "" as TextFieldProps["inputMode"],
    labelAction: {
      id: "",
      content: "",
      accessibilityLabel: "",
      url: "",
      external: false,
      target: "" as any,
    },
    labelHidden: false,
    largeStep: "" as unknown as TextFieldProps["largeStep"],
    minLength: "" as unknown as TextFieldProps["minLength"],
    maxLength: "" as unknown as TextFieldProps["maxLength"],
    min: "" as unknown as TextFieldProps["min"],
    max: "" as unknown as TextFieldProps["max"],
    step: "" as unknown as TextFieldProps["step"],
    monospaced: false,
    multiline: false,
    pattern: "",
    placeholder: "",
    prefix: "",
    suffix: "",
    suggestion: "",
    maxHeight: "",
    readOnly: false,
    requiredIndicator: false,
    selectTextOnFocus: false,
    showCharacterCount: false,
    spellCheck: false,
    verticalContent: "",
    ariaOwns: "",
    ariaActiveDescendant: "",
    ariaAutocomplete: "",
    ariaControls: "",
    ariaExpanded: false,
  } satisfies TextFieldProps,
};
