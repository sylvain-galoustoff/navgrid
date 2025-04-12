import styles from "./GridControls.module.css";

function GridControls() {
  return (
    <div className={styles.controls}>
      <p className={styles.control}>Gauche</p>
      <div className={styles.wrapper}>
        <p className={styles.control}>Haut</p>
        <p className={styles.control}>Bas</p>
      </div>
      <p className={styles.control}>Droite</p>
    </div>
  );
}

export default GridControls;
