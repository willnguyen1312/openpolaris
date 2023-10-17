import styles from "./RightSidebar.module.css";
import { Tailor } from "./Tailor";

export function RightSideBar() {
  return (
    <div className={styles.wrapper}>
      <Tailor />
    </div>
  );
}
