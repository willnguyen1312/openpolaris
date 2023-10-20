import { RenderedComponent } from "../types";

export const generateCode = (tree: RenderedComponent[]) => {
  console.log(tree);

  return `import React from 'react';`;
};
