import {
  JSX,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { LayoutConfigType } from "../types";

type DirectionType = "left" | "right" | "up" | "down";

type GridContextType = {
  selected: number;
  setSelected: (selected: number) => void;
  changeItem: (direction: DirectionType) => void;
  data: JSX.Element[];
  setData: (items: JSX.Element[]) => void;
  setLayoutConfig: (layout: LayoutConfigType) => void;
  gridMap: number[][];
};

export const GridContext = createContext<GridContextType>({
  selected: 1,
  setSelected: () => {},
  changeItem: () => {},
  data: [],
  setData: () => {},
  setLayoutConfig: () => {},
  gridMap: [],
});

export const GridContextProvider = ({
  children,
  columns,
}: {
  children: ReactNode;
  columns: number;
}) => {
  const [selected, setSelected] = useState(1);
  const [data, setData] = useState<JSX.Element[]>([]);
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfigType>({});
  const [gridMap, setGridMap] = useState<number[][]>([]);

  // Génération de la grille virtuelle
  useEffect(() => {
    const map: number[][] = [];
    const filled = new Map<string, boolean>();

    let currentItem = 1;
    let row = 0;
    let col = 0;

    const isFilled = (r: number, c: number) => filled.get(`${r}-${c}`) === true;

    while (currentItem <= data.length) {
      const config = layoutConfig?.[currentItem] || {};
      const colSpan = config.colSpan || 1;
      const rowSpan = config.rowSpan || 1;

      // Trouver le prochain emplacement libre
      while (isFilled(row, col)) {
        col++;
        if (col >= columns) {
          col = 0;
          row++;
        }
      }

      // Vérifier que l’élément peut rentrer
      if (col + colSpan > columns) {
        col = 0;
        row++;
        continue;
      }

      // Étendre la grille si nécessaire
      for (let r = row; r < row + rowSpan; r++) {
        if (!map[r]) map[r] = new Array(columns).fill(undefined);
        for (let c = col; c < col + colSpan; c++) {
          map[r][c] = currentItem;
          filled.set(`${r}-${c}`, true);
        }
      }

      currentItem++;
      col++;
      if (col >= columns) {
        col = 0;
        row++;
      }
    }

    setGridMap(map);
  }, [data, layoutConfig, columns]);

  const changeItem = useCallback(
    (direction: DirectionType) => {
      if (!gridMap.length) return;

      const findCoords = (value: number): [number, number] | null => {
        for (let y = 0; y < gridMap.length; y++) {
          const x = gridMap[y].indexOf(value);
          if (x !== -1) return [x, y];
        }
        return null;
      };

      const coords = findCoords(selected);
      if (!coords) return;

      const [x, y] = coords;

      const tryMove = (dx: number, dy: number): number | undefined => {
        let newX = x + dx;
        let newY = y + dy;
        while (newY >= 0 && newY < gridMap.length && newX >= 0 && newX < columns) {
          const value = gridMap[newY]?.[newX];
          if (value !== undefined && value !== selected) return value;
          newX += dx;
          newY += dy;
        }
        return undefined;
      };

      let next: number | undefined;

      switch (direction) {
        case "right":
          next = tryMove(1, 0) ?? tryMove(-x, 0); // retour au début de la ligne
          break;
        case "left":
          next = tryMove(-1, 0) ?? tryMove(columns - 1 - x, 0); // aller à la fin de la ligne
          break;
        case "down":
          next = tryMove(0, 1);
          break;
        case "up":
          next = tryMove(0, -1);
          break;
      }

      if (next !== undefined) {
        setSelected(next);
      }
    },
    [selected, gridMap, columns]
  );

  const valueGridContext = {
    selected,
    setSelected,
    changeItem,
    data,
    setData,
    setLayoutConfig,
    gridMap,
  };

  return <GridContext.Provider value={valueGridContext}>{children}</GridContext.Provider>;
};

export const useGridContext = () => useContext(GridContext);
