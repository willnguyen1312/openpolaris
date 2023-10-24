import {
  AccountConnectionProps,
  AvatarProps,
  BleedProps,
  BlockStackProps,
  BoxProps,
  ButtonGroupProps,
  ButtonProps,
  CalloutCardProps,
  CardProps,
  DividerProps,
  EmptyStateProps,
  FormLayoutProps,
  GridCellProps,
  GridProps,
  IconProps,
  InlineGridProps,
  InlineStackProps,
  KeyboardKeyProps,
  LayoutProps,
  PageActionsProps,
  PageProps,
  TextProps,
} from "@shopify/polaris";

import { ToastProps } from "@shopify/polaris/build/ts/src/utilities/frame";
import {
  ComponentName,
  FormLayoutGroupProps,
  LayoutSectionProps,
  MediaCardProps,
} from "./types";

export const defaultProps: Partial<Record<ComponentName, any>> = {
  // Actions
  AccountConnection: {
    title: "title",
    details: "details",
    termsOfService: "termsOfService",
    accountName: "accountName",
    avatarUrl: "avatarUrl",
    connected: false,
    action: {
      id: "id",
      content: "content",
      accessibilityLabel: "accessibilityLabel",
      url: "#",
      external: false,
      target: "" as any,
    },
  } as AccountConnectionProps,
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
    url: "#",
    external: false,
    target: undefined,
    download: "",
    submit: false,
    disabled: false,
    loading: false,
    pressed: false,
  } as ButtonProps,
  ButtonGroup: {
    gap: "" as ButtonGroupProps["gap"],
    variant: undefined,
    fullWidth: false,
    connectedTop: false,
    noWrap: false,
    children: undefined,
  } as ButtonGroupProps,
  PageActions: {
    primaryAction: {
      content: "Save",
      loading: false,
      disabled: false,
      external: false,
      id: "",
      accessibilityLabel: "",
      url: "#",
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
        url: "#",
        icon: undefined,
      },
    ],
  } as PageActionsProps,

  // Layout and structure
  Bleed: {
    marginInline: "" as BleedProps["marginInline"],
    marginBlock: "" as BleedProps["marginBlock"],
    marginBlockStart: "" as BleedProps["marginBlockStart"],
    marginBlockEnd: "" as BleedProps["marginBlockEnd"],
    marginInlineStart: "" as BleedProps["marginInlineStart"],
    marginInlineEnd: "" as BleedProps["marginInlineEnd"],
  } as BleedProps,

  BlockStack: {
    as: "" as BlockStackProps["as"],
    align: "" as BlockStackProps["align"],
    inlineAlign: "" as BlockStackProps["inlineAlign"],
    gap: "" as BlockStackProps["gap"],
    id: "",
    reverseOrder: false,
    role: "" as BlockStackProps["role"],
  } as BlockStackProps,

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
  } as BoxProps,
  CalloutCard: {
    title: "Customize the style of your checkout",
    illustration:
      "https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg",
    primaryAction: {
      id: "",
      content: "Customize checkout",
      accessibilityLabel: "",
      url: "#",
      external: false,
      target: "" as any,
    },
    secondaryAction: {
      id: "",
      content: "Learn more about customizing checkout",
      accessibilityLabel: "",
      url: "#",
      external: false,
      target: "" as any,
    },
  } as CalloutCardProps,
  Card: {
    background: "" as CardProps["background"],
    padding: "" as CardProps["padding"],
    roundedAbove: "" as CardProps["roundedAbove"],
  } as CardProps,
  Divider: {
    borderColor: "border-magic" as DividerProps["borderColor"],
    borderWidth: "100" as DividerProps["borderWidth"],
  } as DividerProps,
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
      url: "#",
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
  } as EmptyStateProps,
  FormLayout: {} as FormLayoutProps,
  "FormLayout.Group": {
    condensed: false,
    helpText: "",
    title: "",
  } as FormLayoutGroupProps,
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
  } as GridProps,
  "Grid.Cell": {
    columnSpan: {
      xs: 6,
      sm: 6,
      md: 6,
      lg: 4,
      xl: 6,
    },
  } as GridCellProps,
  InlineGrid: {
    columns: "" as InlineGridProps["columns"],
    gap: "" as InlineGridProps["gap"],
    alignItems: "" as InlineGridProps["alignItems"],
  } as InlineGridProps,
  InlineStack: {
    align: "" as InlineStackProps["align"],
    blockAlign: "" as InlineStackProps["blockAlign"],
    gap: "" as InlineStackProps["gap"],
    wrap: true,
  } as InlineStackProps,
  Layout: {
    sectioned: false,
  } as LayoutProps,
  "Layout.Section": {
    variant: "" as LayoutSectionProps["variant"],
  } as LayoutSectionProps,
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
      url: "#",
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
      url: "#",
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
        url: "#",
        prefix: "",
        role: "",
      },
    ] as MediaCardProps["popoverActions"],
    portrait: false,
    size: "" as MediaCardProps["size"],
  } as MediaCardProps,
  Page: {
    title: "3/4 inch Leather pet collar",
    subtitle: "Perfect for any pet",
    titleMetadata: "Cool",
    additionalMetadata: "Polaris 🐻‍❄️",
    compactTitle: false,
    fullWidth: false,
    narrowWidth: false,
    titleHidden: false,
    filterActions: false,
    primaryAction: {
      content: "Save",
      accessibilityLabel: "",
      destructive: false,
      external: false,
      disabled: false,
      id: "",
      outline: false,
      plain: false,
      loading: false,
      url: "#",
      target: "" as any,
      icon: undefined,
      primary: false,
      helpText: "",
    },
    secondaryActions: [
      {
        content: "First secondary",
        loading: false,
        disabled: false,
        external: false,
        id: "",
        accessibilityLabel: "",
        url: "#",
        destructive: false,
        helpText: "",
        icon: undefined,
        index: undefined,
      },
      {
        content: "Second secondary",
        loading: false,
        disabled: false,
        external: false,
        id: "",
        accessibilityLabel: "",
        url: "#",
        destructive: false,
        helpText: "",
        icon: undefined,
        index: undefined,
      },
    ],
    backAction: {
      url: "#",
      accessibilityLabel: "",
      content: "Products",
      id: "",
    } as PageProps["backAction"],
    pagination: {
      hasPrevious: true,
      hasNext: true,
    } as PageProps["pagination"],
    actionGroups: [
      {
        title: "Copy",
        actions: [{ content: "Copy to clipboard" }],
        disabled: false,
      },
    ] as PageProps["actionGroups"],
  } as PageProps,

  Toast: {} as ToastProps,

  // Images and icons
  Avatar: {
    size: "" as AvatarProps["size"],
    name: "",
    initials: "",
    customer: false,
    source: "",
    accessibilityLabel: "",
  } as AvatarProps,
  Icon: {
    source: "CirclePlusMinor",
    tone: "" as IconProps["tone"],
    accessibilityLabel: "",
  } as IconProps,
  KeyboardKey: {
    children: "Polaris",
    size: "" as KeyboardKeyProps["size"],
  } as KeyboardKeyProps,

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
  } as TextProps,
};
