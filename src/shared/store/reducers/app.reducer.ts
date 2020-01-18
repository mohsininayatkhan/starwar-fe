import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from './auth.reducer';
import { AppState } from '../states/app.state';

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer    
}