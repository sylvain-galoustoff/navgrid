import { JSX, createContext, useCallback, useContext, useState } from "react";

type DirectionType = "left" | "right" | "up" | "down";

type GridContextType = {
  selected: number;
  setSelected: (selected: number) => void;
  changeItem: (direction: DirectionType) => void;
  data: JSX.Element[];
  setData: (items: JSX.Element[]) => void;
};

export const GridContext = createContext<GridContextType>({
  selected: 1,
  setSelected: () => {},
  changeItem: () => {},
  data: [],
  setData: () => {},
});

export const GridContextProvider = ({ children }: { children: JSX.Element }) => {
  const [selected, setSelected] = useState(1);
  const [data, setData] = useState<JSX.Element[]>([]);
  let newSelection;

  const changeItem = useCallback(
    (direction: DirectionType) => {
      switch (direction) {
        case "right":
          newSelection = selected + 1;
          if (newSelection > data.length) {
            setSelected(1);
          } else {
            setSelected(newSelection);
          }
          break;

        case "left":
          newSelection = selected - 1;
          if (newSelection === 0) {
            setSelected(data.length);
          } else {
            setSelected(newSelection);
          }
          break;

        default:
          break;
      }
    },
    [selected, data]
  );

  const valueGridContext = { selected, setSelected, changeItem, data, setData };

  return <GridContext.Provider value={valueGridContext}>{children}</GridContext.Provider>;
};

export const useGridContext = () => useContext(GridContext);
