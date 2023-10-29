import parserBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import * as prettier from "prettier/standalone";

import { ComponentName, RenderedComponent } from "../types";

const specialComponentWithDefaultTrueProps: Partial<
  Record<ComponentName, any>
> = {
  InlineStack: ["wrap"],
  ProgressBar: ["animated"],
  Form: ["implicitSubmit"],
};

const traverse = (
  node: RenderedComponent,
  visit: (node: RenderedComponent) => void,
) => {
  visit(node);
  node.children.forEach((child) => traverse(child, visit));
};

export const generateCode = async (value: RenderedComponent[]) => {
  const importedComponents = new Set<ComponentName>([]);
  const importedIcons = new Set<string>();

  value.forEach((item) => {
    traverse(item, (node) => {
      // Toast component requires Frame component to be imported
      // if (node.componentName === "Toast") {
      //   importedComponents.add("Frame" as ComponentName);
      // }

      if (node.props?.icon) {
        importedIcons.add(node.props.icon);
      }

      if (node.componentName.includes(".")) {
        importedComponents.add(
          node.componentName.split(".")[0] as ComponentName,
        );
      } else {
        importedComponents.add(node.componentName);
      }
    });
  });

  // function normalizePropValue(value: any, key = "", isParentObject = false) {
  function normalizePropValue({
    value,
    key = "",
    isParentObject = false,
  }: {
    value: any;
    key?: string;
    isParentObject?: boolean;
  }) {
    if (typeof value === "string") {
      if (key === "icon") {
        importedIcons.add(value);
        return isParentObject ? value : `{${value}}`;
      }
      return `"${value}"`;
    }

    if (typeof value === "number") {
      return isParentObject ? `${value}` : `{${value}}`;
    }

    if (typeof value === "boolean") {
      return `${value}`;
    }

    if (Array.isArray(value)) {
      let result = value.length ? JSON.stringify(value.filter(Boolean)) : "";
      const iconRegex = /"icon":("[A-z]+")/gi;

      result = result.replace(iconRegex, (match) => {
        const iconName = match.split(":")[1].replace(/"/g, "");
        importedIcons.add(iconName);
        return `"icon":${iconName}`;
      });

      const emptyRegex = /"[A-z]+":"",?/gi;
      result = result.replace(emptyRegex, "");

      const falsyRegex = /"[A-z]+":false,?/gi;
      result = result.replace(falsyRegex, "");

      return result.length > 2 ? result : "";
    }

    if (typeof value === "object") {
      let result = "{";

      Object.keys(value).forEach((key) => {
        if (value[key]) {
          result += `${key}:${normalizePropValue({
            value: value[key],
            key,
            isParentObject: true,
          })},`;
        }
      });
      result = result.slice(0, -1) + "}";
      return result.length > 2 ? result : "";
    }
  }

  function buildComponentProps(component: RenderedComponent) {
    const { props, componentName } = component;
    let result = "";

    if (props) {
      const keys = Object.keys(props);

      keys.forEach((key) => {
        const value = props[key];

        // Ad-hoc for Icon component
        if (key === "source" && componentName === "Icon") {
          importedIcons.add(value);
          result += `${key}={${value}} `;
          return;
        }

        if (typeof value === "string" && value) {
          result += `${key}=${normalizePropValue({
            value,
            key,
          })} `;
        } else if (typeof value === "number" && !Number.isNaN(value)) {
          result += `${key}=${normalizePropValue({ value })} `;
        } else if (typeof value === "boolean") {
          const isNotSkip =
            specialComponentWithDefaultTrueProps[
              component.componentName as ComponentName
            ]?.includes(key);

          if (!value && isNotSkip) {
            result += `${key}={${value}}`;
            return;
          }

          if (!value) {
            return;
          }

          result += `${key} `;
        } else if (typeof value === "object" && Object.keys(value).length) {
          if (Array.isArray(value)) {
            const normalizedPropValue = normalizePropValue({ value });
            if (normalizedPropValue) {
              result += `${key}={${normalizedPropValue}} `;
            }
          } else {
            const normalizedPropValue = normalizePropValue({ value });
            if (normalizedPropValue) {
              result += `${key}={${normalizedPropValue}} `;
            }
          }
        }
      });
    }

    return result;
  }

  function buildComponentToJsx(node: RenderedComponent) {
    let result = `<${node.componentName} `;

    if (node.props) {
      result += buildComponentProps(node);
    }

    if (node.children.length === 0) {
      return result + "/>";
    }

    result += ">";

    node.children.forEach((child) => {
      result += buildComponentToJsx(child);
    });

    return result + `</${node.componentName}>`;
  }

  const code = value.reduce((acc, item) => {
    acc += buildComponentToJsx(item);
    return acc;
  }, "");

  const result = `
    import {${[...importedComponents, "AppProvider"]
      .sort()
      .join(",")}} from '@shopify/polaris'; ${
      [...importedIcons].length
        ? `import { ${[...importedIcons]
            .sort()
            .join(",")} } from "@shopify/polaris-icons";`
        : ""
    }
    import "@shopify/polaris/build/esm/styles.css";
    import enTranslations from "@shopify/polaris/locales/en.json";

    export default function App() {
      return <AppProvider i18n={enTranslations}>${code}</AppProvider>;
    };
    `;

  const formattedResult = await prettier.format(result, {
    parser: "babel-ts",
    plugins: [parserBabel, prettierPluginEstree],
    semi: true,
    trailingComma: "all",
  });

  return formattedResult;
};
