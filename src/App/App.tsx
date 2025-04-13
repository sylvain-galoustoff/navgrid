import styles from "./App.module.css";
import GridNav from "../GridNav/GridNav";
import { DataType, LayoutConfigType } from "../types";
import Child1 from "../Components/Child1/Child1";
import GridControls from "../GridControls/GridControls";
import { GridContextProvider } from "../context/GridContext";

const data: DataType[] = [
  {
    id: 1,
    label: "item1",
  },
  {
    id: 2,
    label: "item2",
  },
  {
    id: 3,
    label: "item3",
  },
  {
    id: 4,
    label: "item4",
  },
  {
    id: 5,
    label: "item5",
  },
  {
    id: 6,
    label: "item6",
  },
  {
    id: 7,
    label: "item7",
  },
  {
    id: 8,
    label: "item8",
  },
];

const layoutConfig: LayoutConfigType = {
  2: {
    colSpan: 2,
  },
  5: {
    render: <Child1 />,
  },
  7: {
    rowSpan: 2,
    colSpan: 2,
  },
};

function App() {
  return (
    <div className="app">
      <GridContextProvider columns={3}>
        <GridNav
          data={data}
          gridClassName={styles.gridClassName}
          layoutConfig={layoutConfig}
          controls={<GridControls />}
        />
      </GridContextProvider>
    </div>
  );
}

export default App;
