export const getHumanReadableProp = (propName: string) => {
  const addedSpace = propName.replace(/([A-Z])/g, " $1");
  return addedSpace.slice(0, 1).toUpperCase() + addedSpace.slice(1);
};
