export interface DataType {
  id: number;
  render?: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  [key: string]: string | number | boolean | React.ReactNode | undefined;
}

export type LayoutItemType = {
  render?: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
};

export type LayoutConfigType = {
  [key: number]: LayoutItemType;
};
