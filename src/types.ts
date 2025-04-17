export interface DataType {
  id: number;
  render?: React.ReactNode;
  area?: string; // <-- Ajout de "area"
  [key: string]: string | number | boolean | React.ReactNode | undefined;
}

export type LayoutItemType = {
  render?: React.ReactNode;
  area?: string; // <-- Ajout ici aussi
};

export type LayoutConfigType = {
  [key: number]: LayoutItemType;
};
