import { Divider } from "@shopify/polaris";

import { ComponentName } from "./types";

export const defaultProps: Partial<Record<ComponentName, any>> = {
  Divider: {
    borderColor: "border-magic",
    borderWidth: "100",
  } as React.ComponentPropsWithoutRef<typeof Divider>,
};
