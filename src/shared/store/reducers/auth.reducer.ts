import { Action } from '@ngrx/store';
import { AuthState } from '../states/auth.state';
import { User } from '../../models/auth/user.model';
import * as AuthActions from '../actions/auth.actions';
import { AuthService } from 'src/shared/services/auth.service';

const initialState: AuthState = {
    user: null, 
    error: null,
};

export function authReducer(state: AuthState = initialState, action: AuthActions.AuthActionTypes) {    
    switch(action.type) {
        case AuthActions.Names.REGISTER:
            return {
                ...state,
                user: null,
                error: null
            };        
        case AuthActions.Names.LOGIN:
            return {
                ...state,
                user: null,
                error: null
            };        
        case AuthActions.Names.AUTH_ERROR:
            return {
                ...state,
                user: null,
                error: action.payload
            };
        case AuthActions.Names.AUTH_SUCCESS:             
            const user = new User(
                action.payload.user.id,                 
                action.payload.user.email,
                action.payload.user.name,
                action.payload.access_token,
                new Date(action.payload.expires_at)
            );
            return {
                ...state,
                user: user,
                error: null
            };
        case AuthActions.Names.LOGOUT:
            return {
                ...state,
                user: null,
                error: null
            }            
        default:
            return state;
    }
}