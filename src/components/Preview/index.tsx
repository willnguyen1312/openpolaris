import { Divider } from "@shopify/polaris";
import { defaultProps } from "../../defaultProps";
import { RenderedComponent } from "../../types";

export const Preview = ({ component }: { component: RenderedComponent }) => {
  const { componentName } = component;

  const defaultProp = defaultProps[componentName];

  switch (componentName) {
    case "Divider":
      return <Divider {...defaultProp} />;
    default:
      return null;
  }
};
