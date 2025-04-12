import { DataType } from "../types";
import styles from "./GridItem.module.css";

type GridItemProps = {
  data: DataType;
};

function GridItem({ data }: GridItemProps) {
  return (
    <div
      className={styles.gridItem}
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
