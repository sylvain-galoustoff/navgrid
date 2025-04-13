import { useGridContext } from "../context/GridContext";
import styles from "./GridControls.module.css";

function GridControls() {
  const { changeItem } = useGridContext();

  return (
    <div className={styles.controls}>
      <p onClick={() => changeItem("left")} className={styles.control}>
        LEFT
      </p>
      <p onClick={() => changeItem("right")} className={styles.control}>
        RIGHT
      </p>
      <p onClick={() => changeItem("up")} className={styles.control}>
        UP
      </p>
      <p onClick={() => changeItem("down")} className={styles.control}>
        DOWN
      </p>
    </div>
  );
}

export default GridControls;
