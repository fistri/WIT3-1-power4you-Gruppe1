import type { User } from '../../generated/prisma/client';

export interface LoginResponse {
    isLoggedIn: boolean;
    user?: User;
}