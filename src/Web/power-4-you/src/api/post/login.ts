import type { LoginResponse } from "../../interface/login";
import type { OperationResult } from "../../interface/opertionResult";

export const login = async (username: string, password: string): Promise<OperationResult<LoginResponse>> => {
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        if (!response.ok) {
            const errorBody = await response.json();
            const errorMessage = errorBody.message ?? `HTTP ${response.status}`;
            return { success: false, error: errorMessage };
        }
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        const errorMessage = `Error logging in: ${(error as Error).message}`;
        return { success: false, error: errorMessage };
    }
}