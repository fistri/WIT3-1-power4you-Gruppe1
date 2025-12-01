import type { MutableRefObject } from 'react';
import React from 'react';
import type { CellCtrl } from 'ag-grid-community';
export declare const SkeletonCellRenderer: ({ cellCtrl, parent, }: {
    cellCtrl: CellCtrl;
    parent: MutableRefObject<HTMLDivElement | null>;
}) => React.JSX.Element;
