import {
  AccountConnectionProps,
  BleedProps,
  BlockStackProps,
  ButtonGroupProps,
  ButtonProps,
  DividerProps,
  PageActionsProps,
} from "@shopify/polaris";

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

  Divider: {
    borderColor: "border-magic" as DividerProps["borderColor"],
    borderWidth: "100" as DividerProps["borderWidth"],
  } as DividerProps,
};
