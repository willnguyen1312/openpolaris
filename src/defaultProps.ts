import {
  AccountConnectionProps,
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
      url: "url",
      external: false,
    },
  } as AccountConnectionProps,
  Button: {
    children: "Button",
    size: "medium",
    textAlign: "center",
    fullWidth: false,
    disclosure: "" as any,
    dataPrimaryLink: false,
    icon: undefined,
    tone: "success",
    variant: "primary",
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
    gap: "loose",
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
      id: "id",
      accessibilityLabel: "accessibilityLabel",
      url: "url",
    },
    secondaryActions: [
      {
        content: "Delete",
        loading: false,
        disabled: false,
        external: false,
        id: "id",
        accessibilityLabel: "accessibilityLabel",
        url: "url",
      },
    ],
  } as PageActionsProps,

  Divider: {
    borderColor: "border-magic",
    borderWidth: "100",
  } as DividerProps,
};
