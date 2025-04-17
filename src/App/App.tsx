import styles from "./App.module.css";
import { DataType, LayoutConfigType } from "../types";
import { GridContextProvider } from "../GridLayout/GridContext";
import Child1 from "../Components/Child1/Child1";
import Child2 from "../Components/Child2/Child2";
import GridLayout from "../GridLayout/GridLayout";

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
    label: "Item 6",
  },
];

const layoutConfig: LayoutConfigType = {
  1: {
    area: "item1",
  },
  2: {
    area: "child1",
    render: <Child1 />,
  },
  3: {
    area: "sidebar",
    render: <Child1 />,
  },
  4: {
    area: "item4",
    render: <Child2 />,
  },
  5: {
    area: "item5",
  },
  6: {
    area: "item6",
  },
};

function App() {
  return (
    <div className={styles.app}>
      <GridContextProvider columns={3}>
        <GridLayout
          data={data}
          layoutConfig={layoutConfig}
          gridContainerClassName={styles.container}
          gridClassName={styles.gridClassName}
          gridControlsClassName={styles.controlsContainer}
        />
      </GridContextProvider>
    </div>
  );
}

export default App;
