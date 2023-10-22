export const getHumanReadableName = (name: string) => {
  const addedSpace = name.replace(/([A-Z])/g, " $1").replace(".", " ");
  return addedSpace.slice(0, 1).toUpperCase() + addedSpace.slice(1);
};
