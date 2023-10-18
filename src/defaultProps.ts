import { ButtonProps, DividerProps } from "@shopify/polaris";

import { ComponentName } from "./types";

export const defaultProps: Partial<Record<ComponentName, any>> = {
  Divider: {
    borderColor: "border-magic",
    borderWidth: "100",
  } as DividerProps,
  Button: {
    children: "Button",
    size: "medium",
    textAlign: "center",
    fullWidth: false,
    disclosure: false,
    dataPrimaryLink: false,
    icon: undefined,
    tone: "success",
    variant: "primary",

    id: undefined,
    url: undefined,
    external: false,
    target: undefined,
    download: false,
    submit: false,
    disabled: false,
    loading: false,
    pressed: false,
  } as ButtonProps,
};
