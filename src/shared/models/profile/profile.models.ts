import * as GeneralModels from 'src/shared/models/general.models';

export class Profile
{    
    id : number;
    name: string;
    email: string;
    email_verified_at?: number;
    profile_picture?: string;
    created_at: string;
    updated_at?: string;
    posts_count: number;     
}

export class ProfileErrorResponse extends GeneralModels.ErrorResponse 
{}