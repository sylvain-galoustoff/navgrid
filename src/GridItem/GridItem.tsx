import { DataType } from "../types";

type GridItemProps = {
  data: DataType;
  itemNumber: number;
  selected?: number;
  gridItemClassName?: string;
};

function GridItem({ data, itemNumber, gridItemClassName, selected }: GridItemProps) {
  return (
    <div
      className={`${gridItemClassName} ${itemNumber === selected ? selected : ""}`}
      style={{
        gridArea: data.area ?? undefined, // <-- Utilisation de area ici
      }}
    >
      {data.render ?? data.label ?? "Grid Item"}
    </div>
  );
}

export default GridItem;
