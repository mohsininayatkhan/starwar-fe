import * as GeneralModels from 'src/shared/models/general.models';

export class RegiserRequest 
{
    name : string;
    email: string;
    password: string;
    password_confirmation: string;
}

export class LoginRequest 
{
    email: string;
    password: string;
}

export class UploadPhotoRequest 
{
    photo: File
}

export interface AuthSuccessResponse 
{
    user: {
        id: number,
        name: string,
        email: string,
        profile_picture: string,
        updated_at: string,
        created_at: string
    },
    access_token: string,
    expires_at: string
}

export class AuthErrorResponse extends GeneralModels.ErrorResponse 
{}

export interface uploadPhotoResponse 
{
    url: string
}