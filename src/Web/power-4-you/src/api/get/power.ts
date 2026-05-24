import type { Leistung, User } from "../../../generated/prisma";
import type { OperationResult } from "../../interface/opertionResult";

export const getPower = async (moduleNumber: number, user: User): Promise<OperationResult<Leistung[]>> => {
    try {
        const response = await fetch(`http://localhost:3000/api/solarmodule/${moduleNumber}/power`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.Api_key}`
            }
        });
        if (!response.ok) {
            const errorBody = await response.json();
            const errorMessage = errorBody.message ?? `HTTP ${response.status}`;
            return { success: false, error: errorMessage };
        }
        const power = await response.json();
        return { success: true, data: power };
    } catch (error) {
        const errorMessage = `Error fetching power data for module ${moduleNumber}: ${(error as Error).message}`;
        return { success: false, error: errorMessage };
    }
}