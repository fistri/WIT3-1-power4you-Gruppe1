import type { FloatingFilterDisplay, FloatingFilterDisplayParams } from 'ag-grid-community';
import type { CustomFloatingFilterCallbacks, CustomFloatingFilterDisplayProps } from './interfaces';
export declare class FloatingFilterDisplayComponentProxy implements FloatingFilterDisplay {
    private floatingFilterParams;
    private readonly refreshProps;
    constructor(floatingFilterParams: FloatingFilterDisplayParams, refreshProps: () => void);
    getProps(): CustomFloatingFilterDisplayProps;
    refresh(params: FloatingFilterDisplayParams): void;
    setMethods(methods: CustomFloatingFilterCallbacks): void;
    private getOptionalMethods;
}
