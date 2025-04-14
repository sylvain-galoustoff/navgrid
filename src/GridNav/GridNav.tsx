import { JSX, useEffect, useState } from "react";
import GridItem from "../GridItem/GridItem";
import { DataType, LayoutConfigType } from "../types";
import styles from "./GridNav.module.css";
import { useGridContext } from "../context/GridContext";

// ⚠ Correction ici : on impose que T étende un Record<string, unknown>
type GridNavProps<T extends Record<string, unknown> = Record<string, unknown>> =
	{
		data: DataType<T>[];
		gridClassName: keyof typeof styles;
		gridContainerClassName?: keyof typeof styles;
		gridControlsClassName?: keyof typeof styles;
		layoutConfig?: LayoutConfigType;
		controls?: React.ReactNode;
	};

function GridNav<T extends Record<string, unknown> = Record<string, unknown>>({
	data,
	gridContainerClassName,
	gridClassName,
	gridControlsClassName,
	layoutConfig,
	controls,
}: GridNavProps<T>) {
	const [items, setItems] = useState<JSX.Element[]>([]);
	const { selected, setData, setLayoutConfig } = useGridContext();

	useEffect(() => {
		setData(items);
	}, [items]);

	useEffect(() => {
		if (layoutConfig) {
			setLayoutConfig(layoutConfig);

			const mergeDataConfig: DataType<T>[] = data.map((item) => {
				const config = layoutConfig[item.id];
				return {
					...item,
					...config,
				};
			});

			const renderItems = mergeDataConfig.map((item, index) => (
				<GridItem
					data={item}
					key={index}
					itemNumber={index + 1}
					selected={selected}
				/>
			));
			setItems(renderItems);
		} else {
			const renderItems = data.map((item, index) => (
				<GridItem
					data={item}
					key={index}
					itemNumber={index + 1}
					selected={selected}
				/>
			));
			setItems(renderItems);
		}
	}, [data, layoutConfig, selected]);

	return (
		<div className={`${styles.gridNav} ${gridContainerClassName}`}>
			<div className={`${styles.items} ${gridClassName}`}>{items}</div>
			{controls && (
				<div className={`${styles.controls} ${gridControlsClassName}`}>
					{controls}
				</div>
			)}
		</div>
	);
}

export default GridNav;
