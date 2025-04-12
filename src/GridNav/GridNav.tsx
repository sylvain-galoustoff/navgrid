import GridItem from "../GridItem/GridItem";
import { DataType } from "../types";
import styles from "./GridNav.module.css";

type GridNavProps = {
  data: DataType[];
  gridClassName: keyof typeof styles;
};

function GridNav({ data, gridClassName }: GridNavProps) {
  const renderItems = data.map((item, index) => <GridItem data={item} key={index} />);

  return <div className={`${styles.gridNav} ${gridClassName}`}>{renderItems}</div>;
}

export default GridNav;
