import { Action } from '@ngrx/store';
import * as AuthModels from  'src/shared/models/auth/auth.models';

export enum Names {
    REGISTER = '[Register Page] Register',    
    REGISTER_ERROR = '[Register API] Register Error',
    LOGIN = '[Login Page] Login',    
    AUTH_ERROR = '[Auth API] Auth Error',
    AUTH_SUCCESS = '[Auth API] Auth Success',
    LOGOUT = '[Logout Link] Logout',
    LOGOUT_SUCCESS = '[Auth API] Logout Success',
    AUTO_LOGIN = '[Auth] Auto Login',
    UPLOAD_USER_PROFILE_PHOTO = '[User Profile Page] Upload Photo', 
    UPLOAD_USER_PROFILE_PHOTO_SUCCESS = '[User Profile Page] Upload Photo Success',
    UPLOAD_USER_PROFILE_PHOTO_ERROR = '[User Profile Page] Upload Photo Error',
}

export class Register implements Action {
    readonly type = Names.REGISTER;

    constructor(public payload: AuthModels.RegiserRequest) {}
}

export class Login implements Action {    
    readonly type = Names.LOGIN;

    constructor(public payload: AuthModels.LoginRequest) {}
}

export class AuthError implements Action {
    readonly type = Names.AUTH_ERROR;

    constructor(public payload: AuthModels.AuthErrorResponse) {}
}

export class AuthSuccess implements Action {
    readonly type = Names.AUTH_SUCCESS;

    constructor(public payload: AuthModels.AuthSuccessResponse) {}
}

export class Logout implements Action {
    readonly type = Names.LOGOUT;
}

export class AutoLogin implements Action {
    readonly type = Names.AUTO_LOGIN;
}

export class UploadUserProfilePhoto implements Action {
    readonly type = Names.UPLOAD_USER_PROFILE_PHOTO;    
    constructor(public payload: AuthModels.UploadPhotoRequest) {}
}

export class UploadUserProfilePhotoSuccess implements Action {
    readonly type = Names.UPLOAD_USER_PROFILE_PHOTO_SUCCESS;
    constructor(public payload: AuthModels.uploadPhotoResponse) {}
}

export class UploadUserProfilePhotoError implements Action {
    readonly type = Names.UPLOAD_USER_PROFILE_PHOTO_ERROR;
    constructor(public payload: AuthModels.AuthErrorResponse) {}
}

export type AuthActionTypes = 
Register | 
Login | 
AuthSuccess | 
AuthError | 
AutoLogin | 
Logout |
UploadUserProfilePhoto | 
UploadUserProfilePhotoSuccess | 
UploadUserProfilePhotoError;