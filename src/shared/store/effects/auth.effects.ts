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
      ofType<AuthActions.Register>(AuthActions.Names.REGISTER),
      mergeMap(
        (data) => {          
          return this.authService.register(data.payload)
          .pipe(
            map((response) => new AuthActions.RegisterSuccess(<RegisterModels.RegisterSuccessResponse>response)
            ),
            catchError((error: HttpErrorResponse) => {              
              return handleErrors(error);
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

const handleErrors = (error: HttpErrorResponse) => {
  let errorResponse: RegisterModels.RegisterErrorResponse;

  if (typeof error.error.message === 'undefined') {
    errorResponse = {
      message : 'Unknown Error!',
      errors: null
    };               
  } else {
    const errorDetail = error.error.errors;
    const errorFields = Object.keys(errorDetail);
    let errorsList = [];

    errorFields.forEach(element => {
      const fieldErrors = errorDetail[element];
      fieldErrors.forEach(error => {
        errorsList.push(error);
      });
    });
    
    errorResponse = {
      message: error.error.message,
      errors: errorsList
    }
  }
  return of(new AuthActions.RegisterError(errorResponse));
};