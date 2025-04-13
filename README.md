# Composant React générateur de grille

**Le composant principal `GridNav` est conçu pour afficher des données - venant par exemple de votre backend - sous forme d'une grille CSS (en utilisant `display: grid`)**

## Comment l'utiliser ?

- Utilisez la props `data` pour passer les données au composant. Attention : vos objets _data_ **DOIVENT** inclure une clé _id_.
- Utilisez la props `gridClassName` pour injecter la classe CSS qui configure votre grille

### Configurer la grille

Vous pouvez configurer la disposition de la grille grâce à la props `layoutConfig` : passez un objet avec l'id de la data dont il faut modifier l'affichage afin qu'il s'étale sur plusieurs colonnes ou ligne de la grille, en utilisant `colSpan` et/ou `rowSpan`.

### Afficher vos composants

passez vos composant en tant que `render` de l'objet de configuration : `GridNav` utilise un composant `GridItem` pour définir l'affichae de la grille, puis `GridItem` va rendre le composant que vous avez configuré.

### Optionel : activez la navigation

Il est possible de parcourir la grille avec une navigation en passant un composant de votre choix.
Pour piloter la navigation, le système utilise un context React, il faudra donc envelopper le composant `GridNav` par `GridContextProvider` et passer le nombre de colonnes qui constitue votre grille en tant que props `columns`.

Ensuite, votre composant de contrôle devra utiliser la fonction `changeItem` fournie par le contexte pour informer la grille du changement de l'objet sélectionné.

## Exemple complet :

**App.jsx**

```
const data = [
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

const layoutConfig = {
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
```

```
.gridClassName {
  flex: 1;
  background-color: #d1d1d1;
  padding: 10px;
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
```

```
function GridControls() {
  const { changeItem } = useGridContext();

  return (
    <div className={styles.controls}>
      <p onClick={() => changeItem("left")} className={styles.control}>
        Gauche
      </p>
      <p onClick={() => changeItem("right")} className={styles.control}>
        Droite
      </p>
      <p onClick={() => changeItem("up")} className={styles.control}>
        Haut
      </p>
      <p onClick={() => changeItem("down")} className={styles.control}>
        Bas
      </p>
    </div>
  );
}
```

![Exemple de grille](/screenshot.png "Exemple de grille")
