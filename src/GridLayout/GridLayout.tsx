import { JSX, useEffect, useState } from "react";
import GridItem from "./GridItem";
import { DataType, LayoutConfigType } from "../types";
import { useGridContext } from "./GridContext";

type GridLayoutProps = {
  data: DataType[];
  gridClassName?: string;
  gridContainerClassName?: string;
  gridControlsClassName?: string;
  gridItemClassName?: string;
  layoutConfig?: LayoutConfigType;
};

function GridLayout({
  data,
  gridContainerClassName,
  gridClassName,
  gridItemClassName,
  gridControlsClassName,
  layoutConfig,
}: GridLayoutProps) {
  const [items, setItems] = useState<JSX.Element[]>([]);
  const { selected, setData, setLayoutConfig, changeItem } = useGridContext();

  useEffect(() => {
    setData(items);
  }, [items]);

  useEffect(() => {
    if (layoutConfig) {
      setLayoutConfig(layoutConfig);

      const mergeDataConfig: DataType[] = data.map((item) => {
        const config = layoutConfig[item.id];
        return {
          ...item,
          ...config,
        };
      });

      const renderItems = mergeDataConfig.map((item, index) => (
        <GridItem
          data={item}
          key={index}
          itemNumber={index + 1}
          gridItemClassName={gridItemClassName}
          selected={selected}
        />
      ));
      setItems(renderItems);
    } else {
      const renderItems = data.map((item, index) => (
        <GridItem
          data={item}
          key={index}
          itemNumber={index + 1}
          gridItemClassName={gridItemClassName}
          selected={selected}
        />
      ));
      setItems(renderItems);
    }
  }, [data, layoutConfig, selected]);

  return (
    <div className={gridContainerClassName ?? ""}>
      <div className={gridClassName ?? ""}>{items}</div>
      <div className={gridControlsClassName ?? ""}>
        <button onClick={() => changeItem("up")}>↑</button>
        <button onClick={() => changeItem("left")}>←</button>
        <button onClick={() => changeItem("right")}>→</button>
        <button onClick={() => changeItem("down")}>↓</button>
      </div>
    </div>
  );
}

export default GridLayout;
