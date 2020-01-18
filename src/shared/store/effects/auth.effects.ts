import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';
import { AuthUser } from 'src/shared/models/auth-user.model';
import { AuthService } from '../../services/auth.service';


@Injectable()
export class AuthEffects {
  
    @Effect() regiser$ = this.actions$
    .pipe(
      ofType<AuthActions.Regiser>(AuthActions.Names.REGISTER),
      mergeMap(
        (data) => this.authService.register(data.payload.name, data.payload.email, data.payload.password, data.payload.password_confirmation)
          .pipe(
            map((response) => new AuthActions.RegisterSuccess(<AuthUser>response)),
            catchError(error => of(new AuthActions.RegisterError(error)))
          )
      )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}