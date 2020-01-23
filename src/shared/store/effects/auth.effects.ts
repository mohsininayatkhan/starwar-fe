import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, map, tap } from 'rxjs/operators';
import * as AuthActions from 'src/shared/store/actions/auth.actions';
import { User } from 'src/shared/models/auth/user.model';
import { AuthService } from 'src/shared/services/auth.service';
import * as AuthModels from  'src/shared/models/auth/auth.models';
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
            map(
              (response) => { 
                this.storeUserInLocalStorage(<AuthModels.AuthSuccessResponse>response);
                return new AuthActions.AuthSuccess(<AuthModels.AuthSuccessResponse>response);
              }
            ),
            catchError((error: HttpErrorResponse) => {              
              return handleErrors(error);
            })
          )
        }
      )
  );

  @Effect() login$ = this.actions$
    .pipe(
      ofType<AuthActions.Register>(AuthActions.Names.LOGIN),
      mergeMap(
        (data) => {       
          return this.authService.login(data.payload)
          .pipe(
            map(
              (response) => {  
                this.storeUserInLocalStorage(<AuthModels.AuthSuccessResponse>response);
                return new AuthActions.AuthSuccess(<AuthModels.AuthSuccessResponse>response);
              }
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
    ofType(AuthActions.Names.AUTH_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  );  

  @Effect({ dispatch: false })
  $logout$ = this.actions$.pipe(
    ofType(AuthActions.Names.LOGOUT),
    tap(() => {
      this.authService.clearLocalStorageUser();
      this.router.navigate(['/login']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.Names.AUTO_LOGIN),
    map(() => {      
      const user = this.authService.getLocalStorageUser();
      if (!user) {
        return { type: 'DUMMY' };
      }

      const data = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          updated_at: '',
          created_at: ''
        },
        access_token: user.token,
        expires_at: user._tokenExpiryDate,
      };
      return new AuthActions.AuthSuccess(data);       
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  storeUserInLocalStorage(userInfo: AuthModels.AuthSuccessResponse)
  {
    const user = new User(
      userInfo.user.id,       
      userInfo.user.email, 
      userInfo.user.name, 
      userInfo.access_token,
      new Date(userInfo.expires_at)
    );
    this.authService.storeLocalStorageUser(user);
  }
}


const handleErrors = (error: HttpErrorResponse) => {
  let errorResponse: AuthModels.AuthErrorResponse;

  if (typeof error.error.message === 'undefined') {
    errorResponse = {
      message : 'Something went wrong.',
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
  return of(new AuthActions.AuthError(errorResponse));
};