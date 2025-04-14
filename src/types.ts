// types.ts
import { ReactNode } from "react";

/**
 * Toutes les données utilisées dans les grilles doivent avoir un ID unique.
 */
export interface BaseItem {
	id: number;
}

/**
 * Options que la grille peut appliquer à un item :
 * colonnes/hauteur/rendu personnalisé
 */
export interface LayoutOptions {
	colSpan?: number;
	rowSpan?: number;
	render?: ReactNode;
	payload?: Record<string, unknown>;
}

/**
 * Un DataType est une donnée enrichie pour la grille.
 * On peut lui passer une forme personnalisée T.
 */
export type DataType<T = Record<string, unknown>> = T &
	BaseItem &
	LayoutOptions;

/**
 * Permet de définir un layout spécifique à un ensemble d’ID.
 */
export type LayoutConfigType = Record<number, LayoutOptions>;
