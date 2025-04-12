import styles from "./App.module.css";
import GridNav from "../GridNav/GridNav";
import { DataType } from "../types";

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

function App() {
  return (
    <div className="app">
      <GridNav data={data} gridConfig={styles.gridConfig} />
    </div>
  );
}

export default App;
