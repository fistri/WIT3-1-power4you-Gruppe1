import type { FilterDisplay, ICellEditor, IFilter, IStatusPanel, IToolPanel } from 'ag-grid-community';
/**
 * Function to retrieve the React component from an instance returned by the grid.
 * @param wrapperComponent Instance component from the grid
 * @param callback Callback which is provided the underlying React custom component
 */
export declare function getInstance<TGridComponent extends IFilter | FilterDisplay | IToolPanel | ICellEditor | IStatusPanel = IFilter | FilterDisplay | IToolPanel | ICellEditor | IStatusPanel, TCustomComponent extends TGridComponent = TGridComponent>(wrapperComponent: TGridComponent, callback: (customComponent: TCustomComponent | undefined) => void): void;
export declare function warnReactiveCustomComponents(): void;
