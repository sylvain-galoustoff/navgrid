import { DataType } from "../types";

type GridItemProps = {
  data: DataType;
  itemNumber: number;
  selected?: number;
  gridItemClassName?: string;
  gridItemSelectedClassName?: string;
};

function GridItem({
  data,
  itemNumber,
  selected,
  gridItemClassName,
  gridItemSelectedClassName,
}: GridItemProps) {
  return (
    <div
      className={`${gridItemClassName} ${
        itemNumber === selected ? gridItemSelectedClassName : ""
      }`}
      style={{
        gridArea: data.area ?? undefined, // <-- Utilisation de area ici
      }}
    >
      {data.render ?? data.label ?? "Grid Item"}
    </div>
  );
}

export default GridItem;
