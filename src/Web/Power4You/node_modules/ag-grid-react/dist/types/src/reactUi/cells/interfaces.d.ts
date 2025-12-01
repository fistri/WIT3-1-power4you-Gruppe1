import type { UserCompDetails } from 'ag-grid-community';
import type { CellEditorComponentProxy } from '../../shared/customComp/cellEditorComponentProxy';
export interface RenderDetails {
    compDetails: UserCompDetails | undefined;
    value?: any;
    force?: boolean;
}
export interface EditDetails {
    compDetails: UserCompDetails;
    popup?: boolean;
    popupPosition?: 'over' | 'under';
    compProxy?: CellEditorComponentProxy;
}
export declare enum CellCompState {
    ShowValue = 0,
    EditValue = 1
}
