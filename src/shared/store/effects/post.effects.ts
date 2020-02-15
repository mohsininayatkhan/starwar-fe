import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, map, tap } from 'rxjs/operators';
import * as PostActions from 'src/shared/store/actions/post.actions';
import { PostService } from 'src/shared/services/post.service';
import * as PostModels from  'src/shared/models/timeline/post.models';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class PostEffects {

    @Effect() 
    getAllPosts$ = this.actions$
    .pipe(
      ofType<PostActions.GetAllPosts>(PostActions.Names.GET_ALL_POSTS),
      mergeMap(
        (data) => {           
          return this.postService.getAll(data.payload)
          .pipe(
            map(
              (response) => {          
                return new PostActions.GetAllPostsSuccess(<PostModels.PostSuccessResponse>response);
              }
            ),
            catchError((error: HttpErrorResponse) => {              
              let errorResponse: PostModels.PostErrorResponse = handleErrors(error);
              return of(new PostActions.GetAllPostsError(errorResponse));
            })
          )
        }
      )
  );

  @Effect() 
    createPost$ = this.actions$
    .pipe(
      ofType<PostActions.CreatePost>(PostActions.Names.CREATE_POST),
      mergeMap(
        (data) => {           
          return this.postService.createPost(data.payload)
          .pipe(
            map(
              (response) => {  
                debugger;        
                return new PostActions.CreatePostSuccess(<PostModels.Post>response);
              }
            ),
            catchError((error: HttpErrorResponse) => {              
              let errorResponse: PostModels.PostErrorResponse = handleErrors(error);
              return of(new PostActions.CreatePostError(errorResponse));
            })
          )
        }
      )
  );



  constructor(
      private actions$: Actions,
      private postService: PostService
    ) {}
}

const handleErrors = (error: HttpErrorResponse) => {
    let errorResponse: PostModels.PostErrorResponse;
  
    if (typeof error.error.message === 'undefined') {
      errorResponse = {
        message : 'Something went wrong.',
        errors: null
      };               
    } if(typeof error.error.errors === 'undefined') {
      errorResponse = {
        message: error.error.message,
        errors: null
      }
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
    return errorResponse;    
  };