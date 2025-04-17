import { createContext, useCallback, useContext, useState, ReactNode, JSX } from "react";
import { LayoutConfigType } from "../types";

type DirectionType = "left" | "right" | "up" | "down";

type GridContextType = {
  selected: number;
  setSelected: (selected: number) => void;
  changeItem: (direction: DirectionType) => void;
  data: JSX.Element[];
  setData: (items: JSX.Element[]) => void;
  layoutConfig?: LayoutConfigType;
  setLayoutConfig: (layout: LayoutConfigType) => void;
  columns: number;
};

export const GridContext = createContext<GridContextType>({
  selected: 1,
  setSelected: () => {},
  changeItem: () => {},
  data: [],
  setData: () => {},
  layoutConfig: {},
  setLayoutConfig: () => {},
  columns: 1,
});

export const GridContextProvider = ({
  children,
  columns = 3,
}: {
  children: ReactNode;
  columns: number;
}) => {
  const [selected, setSelected] = useState(1);
  const [data, setData] = useState<JSX.Element[]>([]);
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfigType>({});

  const changeItem = useCallback(
    (direction: DirectionType) => {
      const currentIndex = selected - 1;

      let newIndex = currentIndex;

      switch (direction) {
        case "left":
        case "up":
          newIndex = (currentIndex - 1 + data.length) % data.length;
          break;
        case "right":
        case "down":
          newIndex = (currentIndex + 1) % data.length;
          break;
      }

      setSelected(newIndex + 1);
    },
    [selected, data.length]
  );

  const valueGridContext = {
    selected,
    setSelected,
    changeItem,
    data,
    setData,
    layoutConfig,
    setLayoutConfig,
    columns,
  };

  return <GridContext.Provider value={valueGridContext}>{children}</GridContext.Provider>;
};

export const useGridContext = () => useContext(GridContext);
