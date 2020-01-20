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
    //action.payload
    switch(action.type) {
        case AuthActions.Names.REGISTER:
            return {
                ...state,
                user: null,
                error: null
            };            
        case AuthActions.Names.REGISTER_SUCCESS: 
            debugger;           
            const user = new User(
                action.payload.user.id, 
                action.payload.user.name, 
                action.payload.user.email,
                action.payload.access_token,
                new Date(action.payload.expires_at)
            );
            AuthService.store(user);
            return {
                ...state,
                user: user,
                error: null
            };
        case AuthActions.Names.REGISTER_ERROR:
            return {
                ...state,
                user: null,
                error: action.payload
            };            
        default:
            return state;
    }
}