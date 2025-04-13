import { JSX, useEffect, useState } from "react";
import GridItem from "../GridItem/GridItem";
import { DataType, LayoutConfigType } from "../types";
import styles from "./GridNav.module.css";
import { useGridContext } from "../context/GridContext";

type GridNavProps = {
  data: DataType[];
  gridClassName: keyof typeof styles;
  gridContainerClassName?: keyof typeof styles;
  gridControlsClassName?: keyof typeof styles;
  layoutConfig?: LayoutConfigType;
  controls?: React.ReactNode;
};

function GridNav({
  data,
  gridContainerClassName,
  gridClassName,
  gridControlsClassName,
  layoutConfig,
  controls,
}: GridNavProps) {
  const [items, setItems] = useState<JSX.Element[]>([]);
  const { selected, setData, setLayoutConfig } = useGridContext();

  useEffect(() => {
    setData(items);
  }, [items]);

  useEffect(() => {
    if (layoutConfig) {
      setLayoutConfig(layoutConfig); // <-- cette ligne synchronise la config avec le contexte

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
  }, [data, layoutConfig, selected]);

  return (
    <div className={`${styles.gridNav} ${gridContainerClassName}`}>
      <div className={`${styles.items} ${gridClassName}`}>{items}</div>
      {controls && (
        <div className={`${styles.controls} ${gridControlsClassName}`}>{controls}</div>
      )}
    </div>
  );
}

export default GridNav;
