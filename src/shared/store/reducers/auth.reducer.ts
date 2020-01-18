import { Action } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { AuthState } from '../states/auth.state';
import { AuthUser } from '../../models/auth-user.model'

const initialState: AuthState = {
    user:  null   
};

export function authReducer(state: AuthState = initialState, action: AuthActions.AuthActionTypes) {
    //action.payload
    switch(action.type) {
        case AuthActions.Names.REGISTER:
            //const user = new AuthUser(action.payload.name, action.payload.email);
            return state;
        case AuthActions.Names.REGISTER_SUCCESS:
            console.log(action.payload);
            //const user = new AuthUser(action.payload.name, action.payload.email);
            return state;
        case AuthActions.Names.REGISTER_ERROR:
            console.log(action.payload);
            //const user = new AuthUser(action.payload.name, action.payload.email);
            return state;
        default:
            return state;
    }
}