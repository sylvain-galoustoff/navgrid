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

  const buildGridMap = useCallback(() => {
    // Estimation du nombre de lignes (peut être ajustée si besoin)
    const estimatedRows = Math.max(data.length, 10);
    const grid: (number | null)[][] = Array.from({ length: estimatedRows }, () =>
      Array(columns).fill(null)
    );

    let index = 0;

    while (index < data.length) {
      const id = index + 1;
      const config = layoutConfig?.[id];
      const rowSpan = config?.rowSpan || 1;
      const colSpan = config?.colSpan || 1;

      // Trouver première case libre
      let placed = false;
      for (let r = 0; r < estimatedRows; r++) {
        for (let c = 0; c < columns; c++) {
          // Est-ce qu'on peut placer ici ?
          let canPlace = true;
          for (let dy = 0; dy < rowSpan; dy++) {
            for (let dx = 0; dx < colSpan; dx++) {
              if (grid[r + dy]?.[c + dx] != null) {
                canPlace = false;
              }
            }
          }

          if (canPlace) {
            for (let dy = 0; dy < rowSpan; dy++) {
              for (let dx = 0; dx < colSpan; dx++) {
                grid[r + dy][c + dx] = id;
              }
            }
            placed = true;
            break;
          }
        }
        if (placed) break;
      }

      index++;
    }

    return grid;
  }, [data, columns, layoutConfig]);

  const changeItem = useCallback(
    (direction: DirectionType) => {
      const gridMap = buildGridMap();

      // Trouver la position actuelle
      let currentRow = -1;
      let currentCol = -1;
      outer: for (let r = 0; r < gridMap.length; r++) {
        for (let c = 0; c < gridMap[r].length; c++) {
          if (gridMap[r][c] === selected) {
            currentRow = r;
            currentCol = c;
            break outer;
          }
        }
      }

      if (currentRow === -1 || currentCol === -1) return;

      let newRow = currentRow;
      let newCol = currentCol;
      let found = false;

      const maxTries = gridMap.length * columns; // limite de sécurité

      let tries = 0;
      while (!found && tries < maxTries) {
        switch (direction) {
          case "up":
            newRow = newRow - 1 < 0 ? gridMap.length - 1 : newRow - 1;
            break;
          case "down":
            newRow = (newRow + 1) % gridMap.length;
            break;
          case "left":
            newCol = newCol - 1 < 0 ? columns - 1 : newCol - 1;
            break;
          case "right":
            newCol = (newCol + 1) % columns;
            break;
        }

        const next = gridMap[newRow]?.[newCol];
        if (next != null && next !== selected) {
          found = true;
          setSelected(next);
        }

        tries++;
      }
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
