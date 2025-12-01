import type { IRenderStatusService } from 'ag-grid-community';
import { BeanStub } from 'ag-grid-community';
export declare class RenderStatusService extends BeanStub implements IRenderStatusService {
    postConstruct(): void;
    private queueResizeOperationsForTick;
    areHeaderCellsRendered(): boolean;
    areCellsRendered(): boolean;
}
