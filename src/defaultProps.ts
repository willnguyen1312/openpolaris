import {
  AccountConnectionProps,
  BleedProps,
  BlockStackProps,
  BoxProps,
  ButtonGroupProps,
  ButtonProps,
  CalloutCardProps,
  CardProps,
  DividerProps,
  PageActionsProps,
} from "@shopify/polaris";

import { ToastProps } from "@shopify/polaris/build/ts/src/utilities/frame";
import { ComponentName } from "./types";

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
      url: "",
      external: false,
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
    url: "",
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
      url: "",
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
      url: "",
      external: false,
    },
    secondaryAction: {
      id: "",
      content: "Learn more about customizing checkout",
      accessibilityLabel: "",
      url: "",
      external: false,
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

  Toast: {} as ToastProps,
};
