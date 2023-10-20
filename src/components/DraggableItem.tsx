import { useDraggable } from "@dnd-kit/core";
import styles from "./DraggableItem.module.css";

export function DraggableItem({
  children,
  componentName,
}: {
  children: React.ReactNode;
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
