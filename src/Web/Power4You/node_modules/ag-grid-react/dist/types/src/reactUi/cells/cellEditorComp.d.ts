import React from 'react';
import type { CellCtrl, ICellEditor, ICellEditorComp } from 'ag-grid-community';
import type { EditDetails } from './interfaces';
export declare const jsxEditValue: (editDetails: EditDetails, setCellEditorRef: (cellEditor: ICellEditor | undefined) => void, eGui: HTMLElement, cellCtrl: CellCtrl, jsEditorComp: ICellEditorComp | undefined) => React.JSX.Element | null;
