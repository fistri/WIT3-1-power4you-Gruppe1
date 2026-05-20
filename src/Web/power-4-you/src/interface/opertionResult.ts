export interface OperationResult<T> {
    success: boolean;
    data?: T;
    error?: string;
}
