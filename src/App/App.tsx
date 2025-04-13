import styles from "./App.module.css";
import GridNav from "../GridNav/GridNav";
import { DataType, LayoutConfigType } from "../types";
import GridControls from "../GridControls/GridControls";
import { GridContextProvider } from "../context/GridContext";

const data: DataType[] = [
  {
    id: 1,
    label: "Play",
  },
  {
    id: 2,
    label: "Rechercher",
  },
  {
    id: 3,
    label: "Playlist",
  },
  {
    id: 4,
    label: "Pause",
  },
  {
    id: 5,
    label: "Effacer 1",
  },
  {
    id: 6,
    label: "Stop",
  },
  {
    id: 7,
    label: "Effacer tout",
  },
  {
    id: 8,
    label: "suivant",
  },
];

const layoutConfig: LayoutConfigType = {
  3: {
    rowSpan: 4,
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
