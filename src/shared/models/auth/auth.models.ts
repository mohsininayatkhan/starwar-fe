export class RegiserRequest {    
    name : string;
    email: string;
    password: string;
    password_confirmation: string;
}

export class LoginRequest {    
    email: string;
    password: string;
}

export interface AuthSuccessResponse {
    user: {
        id: number,
        name: string,
        email: string,
        updated_at: string,
        created_at: string
    },
    access_token: string,
    expires_at: string
}

export interface AuthErrorResponse {
    message: string,
    errors: any[]
}