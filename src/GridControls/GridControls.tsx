import { useGridContext } from "../context/GridContext";
import styles from "./GridControls.module.css";

function GridControls() {
  const { changeItem } = useGridContext();

  return (
    <div className={styles.controls}>
      <p onClick={() => changeItem("left")} className={styles.control}>
        Gauche
      </p>
      <div className={styles.wrapper}>
        <p onClick={() => changeItem("up")} className={styles.control}>
          Haut
        </p>
        <p onClick={() => changeItem("down")} className={styles.control}>
          Bas
        </p>
      </div>
      <p onClick={() => changeItem("right")} className={styles.control}>
        Droite
      </p>
    </div>
  );
}

export default GridControls;
