import { useDroppable } from "@dnd-kit/core";
import { parentRootId } from "../constants";
import styles from "./MainBody.module.css";

import classNames from "classnames";

export function MainBody() {
  const { isOver, setNodeRef } = useDroppable({
    id: parentRootId,
  });

  const children = <div>Children</div>;

  return (
    <div
      ref={setNodeRef}
      className={classNames(styles.wrapper, {
        [styles.isOver]: isOver,
      })}
    >
      {children}
    </div>
  );
}
