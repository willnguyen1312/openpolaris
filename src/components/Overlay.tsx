import { findComponentBy, usePolarisStore } from "../store";
import { listOfComponent } from "../types";
import styles from "./Overlay.module.css";
import { Preview } from "./Preview";

export function Overlay({ id }: { id: string }) {
  const renderedComponent = usePolarisStore.use.renderedComponents();

  if (listOfComponent.find((component) => component.componentName === id)) {
    return <div className={styles.wrapper}>{id}</div>;
  }

  const component = findComponentBy(
    renderedComponent,
    (component) => component.id === id,
  );

  if (!component) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Preview component={component} />
    </div>
  );
}
