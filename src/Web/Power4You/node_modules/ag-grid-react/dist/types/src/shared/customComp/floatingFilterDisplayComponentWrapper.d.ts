import type { FloatingFilterDisplay, FloatingFilterDisplayParams } from 'ag-grid-community';
import { CustomComponentWrapper } from './customComponentWrapper';
import type { CustomFloatingFilterCallbacks, CustomFloatingFilterDisplayProps } from './interfaces';
export declare class FloatingFilterDisplayComponentWrapper extends CustomComponentWrapper<FloatingFilterDisplayParams, CustomFloatingFilterDisplayProps, CustomFloatingFilterCallbacks> implements FloatingFilterDisplay {
    refresh(newParams: FloatingFilterDisplayParams): void;
    protected getOptionalMethods(): string[];
}
