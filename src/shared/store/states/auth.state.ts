import { User } from 'src/shared/models/auth/user.model';
import { RegisterErrorResponse } from 'src/shared/models/auth/register.models';

export interface AuthState {
    user: User,
    error: RegisterErrorResponse
}