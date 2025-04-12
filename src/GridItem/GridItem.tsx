import { DataType } from "../types";
import styles from "./GridItem.module.css";

type GridItemProps = {
  data: DataType;
  itemNumber: number;
  selected: number;
};

function GridItem({ data, itemNumber, selected }: GridItemProps) {
  return (
    <div
      className={`${styles.gridItem} ${
        itemNumber === selected ? styles.selected : undefined
      }`}
      style={{
        gridColumn: data.colSpan ? `span ${data.colSpan}` : undefined,
        gridRow: data.rowSpan ? `span ${data.rowSpan}` : undefined,
      }}
    >
      {data.render ?? "Grid Item"}
    </div>
  );
}

export default GridItem;
