import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, map, tap } from 'rxjs/operators';
import * as AuthActions from 'src/shared/store/actions/auth.actions';
import { User } from 'src/shared/models/auth/user.model';
import { AuthService } from 'src/shared/services/auth.service';
import * as RegisterModels from  'src/shared/models/auth/register.models';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  
    @Effect() regiser$ = this.actions$
    .pipe(
      ofType<AuthActions.Regiser>(AuthActions.Names.REGISTER),
      mergeMap(
        (data) => {          
          return this.authService.register(data.payload)
          .pipe(
            map((response) => new AuthActions.RegisterSuccess(<RegisterModels.RegisterSuccessResponse>response)),
            catchError((error: HttpErrorResponse) => {              
              
              let errorResponse: RegisterModels.RegisterErrorResponse;

              if (typeof error.error.message === 'undefined') {
                errorResponse = {
                  message : 'Unknown Error!',
                  errors: null
                };               
              } else {
                errorResponse = {
                  message: error.error.message,
                  errors: error.error.errors
                }
              }
              return of(new AuthActions.RegisterError(errorResponse));
            })
          )
        }
      )
  );

  @Effect({ dispatch: false })
    authSuccess = this.actions$.pipe(
      ofType(AuthActions.Names.REGISTER_SUCCESS),
      tap(() => {
        this.router.navigate(['/']);
      })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}