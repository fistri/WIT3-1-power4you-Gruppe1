import type { FilterDisplay, FilterDisplayParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import { CustomComponentWrapper } from './customComponentWrapper';
import type { CustomFilterDisplayCallbacks, CustomFilterDisplayProps } from './interfaces';
export declare class FilterDisplayComponentWrapper extends CustomComponentWrapper<FilterDisplayParams, CustomFilterDisplayProps, CustomFilterDisplayCallbacks> implements FilterDisplay {
    private resolveSetMethodsCallback;
    private awaitSetMethodsCallback;
    refresh(newParams: FilterDisplayParams): boolean;
    afterGuiAttached(params?: IAfterGuiAttachedParams): void;
    protected getOptionalMethods(): string[];
    protected setMethods(methods: CustomFilterDisplayCallbacks): void;
}
