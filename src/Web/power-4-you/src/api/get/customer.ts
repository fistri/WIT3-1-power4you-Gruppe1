import type { OperationResult } from "../../interface/opertionResult";
import type { Kunde } from "../../../generated/prisma/client";

export const getCustomer = async (userId: number): Promise<OperationResult<Kunde>> => {
    try {
        const response = await fetch(`http://localhost:3000/api/customer/${userId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorBody = await response.json();
            const errorMessage = errorBody.message ?? `HTTP ${response.status}`;
            return { success: false, error: errorMessage };
        }
        const customer = await response.json();
        return { success: true, data: customer };
    } catch (error) {
        const errorMessage = `Error fetching customer data for user ${userId}: ${(error as Error).message}`;
        return { success: false, error: errorMessage };
    }
}