import { User } from 'src/shared/models/auth/user.model';
import { AuthErrorResponse } from 'src/shared/models/auth/auth.models';

export interface AuthState 
{
    user: User,
    error: AuthErrorResponse
}