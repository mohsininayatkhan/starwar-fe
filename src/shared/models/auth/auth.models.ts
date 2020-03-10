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

export class UpdateProfileRequest
{
    name: string;
    gender?: string;
    profession?: string;
}

export class UpdateProfileResponse
{
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    gender?: string;
    profession?: string;
    profile_picture?: string;
    created_at: string;
    updated_at?: string;
    posts_count: string;
}

export interface AuthSuccessResponse 
{
    user: {
        id: number,
        name: string,
        email: string,
        profile_picture: string,
        gender?: string,
        profession?: string,
        updated_at: string,
        created_at: string,
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