import { JSX, useEffect, useState } from "react";
import GridItem from "../GridItem/GridItem";
import { DataType, LayoutConfigType } from "../types";
import styles from "./GridNav.module.css";

type GridNavProps = {
  data: DataType[];
  gridClassName: keyof typeof styles;
  layoutConfig?: LayoutConfigType;
  controls?: React.ReactNode;
};

function GridNav({ data, gridClassName, layoutConfig, controls }: GridNavProps) {
  const [items, setItems] = useState<JSX.Element[]>([]);
  const [selected, setSelected] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (layoutConfig) {
      const mergeDataConfig: DataType[] = data.map((item) => {
        const config = layoutConfig[item.id];
        return {
          ...item,
          ...config,
        };
      });
      const renderItems = mergeDataConfig.map((item, index) => (
        <GridItem data={item} key={index} itemNumber={index + 1} selected={selected} />
      ));
      setItems(renderItems);
    } else {
      const renderItems = data.map((item, index) => (
        <GridItem data={item} key={index} itemNumber={index + 1} selected={selected} />
      ));
      setItems(renderItems);
    }
  }, [data, layoutConfig]);

  return (
    <div className={`${styles.gridNav} ${gridClassName}`}>
      {items}
      {controls && controls}
    </div>
  );
}

export default GridNav;
