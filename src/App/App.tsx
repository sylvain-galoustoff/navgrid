import styles from "./App.module.css";
import GridNav from "../GridNav/GridNav";
import { DataType, LayoutConfigType } from "../types";
import GridControls from "../GridControls/GridControls";
import { GridContextProvider } from "../context/GridContext";
import Child1 from "../Components/Child1/Child1";
import Child2 from "../Components/Child2/Child2";

const data: DataType[] = [
  {
    id: 1,
    label: "Item 1",
  },
  {
    id: 2,
    label: "Item 2",
  },
  {
    id: 3,
    label: "Item 3 (Full height)",
  },
  {
    id: 4,
    label: "item 4",
  },
  {
    id: 5,
    label: "Item 5",
  },
  {
    id: 6,
    label: "Item 6 colspan 2",
  },
  {
    id: 7,
    label: "Item 7",
  },
];

const layoutConfig: LayoutConfigType = {
  2: {
    render: <Child1 />,
  },
  7: {
    render: <Child2 />,
  },
  3: {
    rowSpan: 4,
  },
  6: {
    colSpan: 2,
  },
};

function App() {
  return (
    <div className={styles.app}>
      <GridContextProvider columns={3}>
        <GridNav
          data={data}
          gridContainerClassName={styles.container}
          gridClassName={styles.gridClassName}
          gridControlsClassName={styles.controlsContainer}
          layoutConfig={layoutConfig}
          controls={<GridControls />}
        />
      </GridContextProvider>
    </div>
  );
}

export default App;
