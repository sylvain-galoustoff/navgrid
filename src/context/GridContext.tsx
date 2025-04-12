import { JSX, createContext, useContext, useState } from "react";

type GridContextType = {
  selected: number;
  setSelected: (selected: number) => void;
};

export const GridContext = createContext<GridContextType>({
  selected: 1,
  setSelected: () => {},
});

export const GridContextProvider = ({ children }: { children: JSX.Element }) => {
  const [selected, setSelected] = useState(1);
  const valueGridContext = { selected, setSelected };

  return <GridContext.Provider value={valueGridContext}>{children}</GridContext.Provider>;
};

export const useGridContext = () => useContext(GridContext);
