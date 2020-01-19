import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from 'src/shared/store/reducers/auth.reducer';
import { AppState } from 'src/shared/store/states/app.state';

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer    
}