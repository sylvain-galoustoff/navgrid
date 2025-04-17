import { DataType } from "../types";
import styles from "./GridItem.module.css";

type GridItemProps = {
  data: DataType;
  itemNumber: number;
  selected?: number;
};

function GridItem({ data, itemNumber, selected }: GridItemProps) {
  return (
    <div
      className={`${styles.gridItem} ${itemNumber === selected ? styles.selected : ""}`}
      style={{
        gridArea: data.area ?? undefined, // <-- Utilisation de area ici
      }}
    >
      {data.render ?? data.label ?? "Grid Item"}
    </div>
  );
}

export default GridItem;
