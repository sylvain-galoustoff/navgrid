# React Grid Generator Component

**The main component `GridNav` is designed to display data – for example, from your backend – in the form of a CSS grid (using `display: grid`).**

## How to use it?

- Use the `data` prop to pass your data to the component. Warning: your _data_ objects **MUST** include an _id_ key.
- Use the `gridClassName` prop to inject the CSS class that sets up your grid layout.

### Configure the grid

You can configure the layout of the grid using the `layoutConfig` prop: pass an object where the key is the id of the data item you want to modify, and define how many rows or columns it should span using `colSpan` and/or `rowSpan`.

### Display your components

Pass your components as `render` inside the configuration object: `GridNav` uses a `GridItem` component to define the grid display, and `GridItem` will then render the component you provided.

### Optional: enable navigation

You can navigate through the grid using a control component of your choice.  
To handle navigation, the system uses a React context, so you must wrap the `GridNav` component with `GridContextProvider` and pass the number of columns in your grid using the `columns` prop.

Then, your control component should use the `changeItem` function provided by the context to inform the grid of the selected item change.

## Full Example:

**App.jsx**

```jsx
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
    label: "Item 4",
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

**Configure grid with CSS**

```css
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

**GridControl.jsx**

```jsx
function GridControls() {
  const { changeItem } = useGridContext();

  return (
    <div className={styles.controls}>
      <p onClick={() => changeItem("left")}>LEFT</p>
      <p onClick={() => changeItem("right")}>RIGHT</p>
      <p onClick={() => changeItem("up")}>UP</p>
      <p onClick={() => changeItem("down")}>DOWN</p>
    </div>
  );
}
```
