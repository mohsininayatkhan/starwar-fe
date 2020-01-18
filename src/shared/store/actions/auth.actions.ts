import { Action } from '@ngrx/store';
import { UserRegisteration } from '../../models/user-registeration.model';
import { AuthUser } from 'src/shared/models/auth-user.model';

export enum Names {
    REGISTER = '[Register Page] Register',
    REGISTER_SUCCESS = '[Auth API] Register Success',
    REGISTER_ERROR = '[Register API] Register Error',
    LOGIN = '[Login Page] Login',
    LOGIN_SUCCESS = '[Auth API] Login Success',
    LOGIN_ERROR = '[Auth API] Login Error',
    LOGOUT = '[Logout Link] Logout',
    LOGOUT_SUCCESS = '[Auth API] Logout Success',
}

export class Regiser implements Action {
    readonly type = Names.REGISTER;

    constructor(public payload: UserRegisteration) {}
}

export class RegisterSuccess implements Action {
    readonly type = Names.REGISTER_SUCCESS;

    constructor(public payload: AuthUser) {}
}

export class RegisterError implements Action {
    readonly type = Names.REGISTER_ERROR

    constructor(public payload: Error) {}
}

export type AuthActionTypes = Regiser | RegisterSuccess | RegisterError;