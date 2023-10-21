import sdk from "@stackblitz/sdk";
import { RenderedComponent } from "../types";
import { generateCode } from "./code";

// Reference - https://developer.stackblitz.com/guides/integration/create-with-sdk
export const openProject = async (tree: RenderedComponent[]) => {
  const code = await generateCode(tree);
  sdk.openProject(
    {
      files: {
        "index.d.ts": `declare module '@shopify/polaris/locales/en.json';`,
        "public/index.html": `<div id="app"></div>`,
        "src/index.tsx": `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('app') as HTMLDivElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);`,
        "src/App.tsx": code,
        "tsconfig.json": `{
    "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["DOM", "ES2022"],
    "moduleResolution": "node",
    "target": "ES2022",
    "resolveJsonModule": true,
    }
}`,
      },
      dependencies: {
        "@shopify/polaris": "^12.0.0",
        "@shopify/polaris-icons": "^7.9.0",
        "@types/react": "^18.2.0",
        "@types/react-dom": "^18.2.0",
      },
      template: "create-react-app",
      title: `Open Polaris Playground 🐻‍❄️`,
      description: `This is an playground exported from open polaris app 🎉`,
    },
    {
      newWindow: true,
      openFile: "src/App.tsx",
    },
  );
};
