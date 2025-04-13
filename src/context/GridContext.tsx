import { JSX, createContext, useCallback, useContext, useState, ReactNode } from "react";
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

  const getItemSpan = useCallback(
    (index: number) => {
      const id = index + 1;
      const config = layoutConfig?.[id];
      return {
        rowSpan: config?.rowSpan || 1,
        colSpan: config?.colSpan || 1,
      };
    },
    [layoutConfig]
  );

  const buildGridMap = useCallback(() => {
    const gridMap: (number | null)[][] = [];
    let index = 0;
    let row = 0;

    while (index < data.length) {
      if (!gridMap[row]) gridMap[row] = [];

      let col = 0;
      while (col < columns && index < data.length) {
        if (gridMap[row][col] != null) {
          col++;
          continue;
        }

        const { rowSpan, colSpan } = getItemSpan(index);

        for (let r = 0; r < rowSpan; r++) {
          if (!gridMap[row + r]) gridMap[row + r] = [];
          for (let c = 0; c < colSpan; c++) {
            gridMap[row + r][col + c] = r === 0 && c === 0 ? index + 1 : null;
          }
        }

        col += colSpan;
        index++;
      }

      row++;
    }

    return gridMap;
  }, [data, columns, getItemSpan]);

  const changeItem = useCallback(
    (direction: DirectionType) => {
      const gridMap = buildGridMap();

      // Trouver la position actuelle
      let currentRow = -1;
      let currentCol = -1;

      for (let r = 0; r < gridMap.length; r++) {
        for (let c = 0; c < gridMap[r].length; c++) {
          if (gridMap[r][c] === selected) {
            currentRow = r;
            currentCol = c;
            break;
          }
        }
        if (currentRow !== -1) break;
      }

      let newRow = currentRow;
      let newCol = currentCol;

      switch (direction) {
        case "up":
          do {
            newRow = newRow - 1 < 0 ? gridMap.length - 1 : newRow - 1;
          } while (
            (gridMap[newRow]?.[newCol] == null || gridMap[newRow][newCol] === selected) &&
            newRow !== currentRow
          );
          break;

        case "down":
          do {
            newRow = (newRow + 1) % gridMap.length;
          } while (
            (gridMap[newRow]?.[newCol] == null || gridMap[newRow][newCol] === selected) &&
            newRow !== currentRow
          );
          break;

        case "left":
          do {
            newCol = newCol - 1 < 0 ? columns - 1 : newCol - 1;
          } while (
            (gridMap[newRow]?.[newCol] == null || gridMap[newRow][newCol] === selected) &&
            newCol !== currentCol
          );
          break;

        case "right":
          do {
            newCol = (newCol + 1) % columns;
          } while (
            (gridMap[newRow]?.[newCol] == null || gridMap[newRow][newCol] === selected) &&
            newCol !== currentCol
          );
          break;
      }

      const next = gridMap[newRow]?.[newCol];
      if (next != null && next !== selected) setSelected(next);
    },
    [selected, data, columns, buildGridMap]
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
