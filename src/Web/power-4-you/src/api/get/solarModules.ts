import type { User } from "../../../generated/prisma";
import type { SolarModule } from "../../interface/module";
import type { OperationResult } from "../../interface/opertionResult";

export const getSolarModules = async (customerId: number, user: User): Promise<OperationResult<SolarModule[]>> => {
    try {
        const response = await fetch(`http://localhost:3000/api/solarmodule/${customerId}`, {
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
        const solarModules = await response.json();
        return { success: true, data: solarModules };
    } catch (error) {
        const errorMessage = `Error fetching solar module data for customer ${customerId}: ${(error as Error).message}`;
        return { success: false, error: errorMessage };
    }
}