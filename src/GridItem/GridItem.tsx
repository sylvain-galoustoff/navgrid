import { DataType } from "../types";
import styles from "./GridItem.module.css";

type GridItemProps = {
  data: DataType;
};

function GridItem({ data }: GridItemProps) {
  return <div className={styles.gridItem}>{data.label ?? "Grid Item"}</div>;
}

export default GridItem;
