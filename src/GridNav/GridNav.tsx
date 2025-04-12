import GridItem from "../GridItem/GridItem";
import { DataType } from "../types";
import styles from "./GridNav.module.css";

type GridNavProps = {
  data: DataType[];
  gridConfig: keyof typeof styles;
};

function GridNav({ data, gridConfig }: GridNavProps) {
  const renderItems = data.map((item, index) => <GridItem data={item} key={index} />);

  return <div className={`${styles.gridNav} ${gridConfig}`}>{renderItems}</div>;
}

export default GridNav;
