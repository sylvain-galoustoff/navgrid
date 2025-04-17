import { JSX, useEffect, useState } from "react";
import GridItem from "./GridItem";
import { DataType, LayoutConfigType } from "../types";
import { useGridContext } from "./GridContext";

type GridLayoutProps = {
  data: DataType[];
  gridClassName: string;
  gridContainerClassName: string;
  gridControlsClassName: string;
  gridItemClassName: string;
  gridItemSelectedClassName?: string;
  layoutConfig?: LayoutConfigType;
  showControls?: boolean;
};

function GridLayout({
  data,
  gridContainerClassName,
  gridClassName,
  gridItemClassName,
  gridItemSelectedClassName,
  gridControlsClassName,
  layoutConfig,
  showControls = true,
}: GridLayoutProps) {
  const [items, setItems] = useState<JSX.Element[]>([]);
  const { selected, setData, setLayoutConfig, changeItem } = useGridContext();

  useEffect(() => {
    if (layoutConfig) {
      setLayoutConfig(layoutConfig);
    }

    const mergeDataConfig: DataType[] = data.map((item) => ({
      ...item,
      ...(layoutConfig ? layoutConfig[item.id] : {}),
    }));

    const renderItems = mergeDataConfig.map((item) => (
      <GridItem
        data={item}
        key={item.id}
        itemNumber={item.id}
        gridItemClassName={gridItemClassName}
        gridItemSelectedClassName={gridItemSelectedClassName}
        selected={selected}
      />
    ));

    setItems(renderItems);
    setData(renderItems);
  }, [data, layoutConfig, selected]);

  return (
    <div className={gridContainerClassName ?? ""}>
      <div className={gridClassName ?? ""}>{items}</div>
      {showControls && (
        <div className={gridControlsClassName ?? ""}>
          <button onClick={() => changeItem("up")}>↑</button>
          <button onClick={() => changeItem("left")}>←</button>
          <button onClick={() => changeItem("right")}>→</button>
          <button onClick={() => changeItem("down")}>↓</button>
        </div>
      )}
    </div>
  );
}

export default GridLayout;
