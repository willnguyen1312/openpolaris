import { useDraggable } from "@dnd-kit/core";
import { ReactNode } from "react";
import styles from "./DraggableItem.module.css";

export function DraggableItem({
  children,
  componentName,
}: {
  children: ReactNode;
  componentName: string;
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: componentName,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={styles.wrapper}
    >
      {children}
    </div>
  );
}
