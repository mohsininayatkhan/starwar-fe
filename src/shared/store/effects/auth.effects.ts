import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, map, tap } from 'rxjs/operators';
import * as AuthActions from 'src/shared/store/actions/auth.actions';
import { User } from 'src/shared/models/auth/user.model';
import { AuthService } from 'src/shared/services/auth.service';
import { ErrorHandlerService } from 'src/shared/services/error-handler.service';
import * as AuthModels from  'src/shared/models/auth/auth.models';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class AuthEffects 
{

  constructor
  (
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private spinner: NgxSpinnerService
  ) {}
  
  @Effect() 
  regiser$ = this.actions$
  .pipe(
    ofType<AuthActions.Register>(AuthActions.Names.REGISTER),
    mergeMap(
      (data) => { 
        this.spinner.show();       
        return this.authService.register(data.payload)
        .pipe(
          map(
            (response) => { 
              this.storeUserInLocalStorage(<AuthModels.AuthSuccessResponse>response);
              this.spinner.hide(); 
              return new AuthActions.AuthSuccess(<AuthModels.AuthSuccessResponse>response);
            }
          ),
          catchError((error: HttpErrorResponse) => { 
            this.spinner.hide();              
            const errorResponse: AuthModels.AuthErrorResponse = this.errorHandler.getAuthErrors(error);
            return of(new AuthActions.AuthError(errorResponse));
          })
        )
      }
    )
  );

  @Effect() 
  login$ = this.actions$
  .pipe(
    ofType<AuthActions.Login>(AuthActions.Names.LOGIN),
    mergeMap(
      (data) => { 
        this.spinner.show();       
        return this.authService.login(data.payload)
        .pipe(
          map(
            (response) => {  
              this.spinner.hide(); 
              this.storeUserInLocalStorage(<AuthModels.AuthSuccessResponse>response);
              return new AuthActions.AuthSuccess(<AuthModels.AuthSuccessResponse>response);
            }
          ),
          catchError((error: HttpErrorResponse) => { 
            this.spinner.hide();   
            const errorResponse: AuthModels.AuthErrorResponse = this.errorHandler.getAuthErrors(error);
            return of(new AuthActions.AuthError(errorResponse));
          })
        )
      }
    )
  );

  @Effect() 
  logout$ = this.actions$
    .pipe(
      ofType<AuthActions.Logout>(AuthActions.Names.LOGOUT),
      mergeMap(
        (data) => {  
          this.spinner.show();      
          return this.authService.logout()
          .pipe(
            map(
              (response) => {  
                this.spinner.hide(); 
                this.storeUserInLocalStorage(<AuthModels.AuthSuccessResponse>response);
                return new AuthActions.AuthSuccess(<AuthModels.AuthSuccessResponse>response);
              }
            ),
            catchError((error: HttpErrorResponse) => {  
              this.spinner.hide();             
              const errorResponse: AuthModels.AuthErrorResponse = this.errorHandler.getAuthErrors(error);
              return of(new AuthActions.AuthError(errorResponse));            
            })
          )
        }
      )
  );

  @Effect() 
  uploadProfilePhoto$ = this.actions$
    .pipe(
      ofType<AuthActions.UploadUserProfilePhoto>(AuthActions.Names.UPLOAD_USER_PROFILE_PHOTO),
      mergeMap(
        (data) => { 
          this.spinner.show();   
          return this.authService.uploadPhoto(data.payload)
          .pipe(
            map(
              (response) => {  
                this.spinner.hide();               
                const resPhoto = <AuthModels.uploadPhotoResponse>response;
                var localUser = this.authService.getLocalStorageUser();
                localUser.profile_picture = resPhoto.url;
                this.authService.storeLocalStorageUser(localUser);                
                return new AuthActions.UploadUserProfilePhotoSuccess(<AuthModels.uploadPhotoResponse>response);
              }
            ),
            catchError((error: HttpErrorResponse) => {              
              this.spinner.hide();
              const errorResponse: AuthModels.AuthErrorResponse = this.errorHandler.getAuthErrors(error);
              return of(new AuthActions.AuthError(errorResponse));            
            })
          )
        }
      )
  );

  @Effect() 
  updateProfile$ = this.actions$
    .pipe(
      ofType<AuthActions.UpdateUserProfile>(AuthActions.Names.UPDATE_USER_PROFILE),
      mergeMap(
        (data) => { 
          this.spinner.show();   
          return this.authService.updateProfile(data.payload)
          .pipe(
            map(
              (response) => {  
                this.spinner.hide();
                const resProfile = <AuthModels.UpdateProfileResponse>response;
                var localUser = this.authService.getLocalStorageUser();
                localUser.name = resProfile.name;
                localUser.gender = resProfile.gender;
                localUser.profession = resProfile.profession;
                this.authService.storeLocalStorageUser(localUser);
                return new AuthActions.UpdateUserProfileSuccess(resProfile);
              }
            ),
            catchError((error: HttpErrorResponse) => {               
              this.spinner.hide();
              const errorResponse: AuthModels.AuthErrorResponse = this.errorHandler.getAuthErrors(error);
              return of(new AuthActions.UpdateUserProfileError(errorResponse));            
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
          profile_picture: user.profile_picture,
          gender: user.gender,
          profession: user.profession,
          updated_at: '',
          created_at: ''
        },
        access_token: user.token,
        expires_at: user._tokenExpiryDate,
      };
      return new AuthActions.AuthSuccess(data);       
    })
  ); 

  storeUserInLocalStorage(userInfo: AuthModels.AuthSuccessResponse)
  {
    const user = new User(
      userInfo.user.id,       
      userInfo.user.email, 
      userInfo.user.name, 
      userInfo.access_token,
      new Date(userInfo.expires_at),
      userInfo.user.profile_picture,
      userInfo.user.gender,
      userInfo.user.profession
    );    
    this.authService.storeLocalStorageUser(user);
  }
}