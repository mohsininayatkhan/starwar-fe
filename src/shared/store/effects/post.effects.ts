import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, map, tap } from 'rxjs/operators';
import * as PostActions from 'src/shared/store/actions/post.actions';
import { PostService } from 'src/shared/services/post.service';
import { ErrorHandlerService } from 'src/shared/services/error-handler.service';
import * as PostModels from  'src/shared/models/timeline/post.models';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PostEffects 
{
  constructor
  (
    private actions$: Actions,
    private postService: PostService,
    private errorHandler: ErrorHandlerService,
  ) {}

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
            const errorResponse: PostModels.PostErrorResponse = this.errorHandler.getPostErrors(error);
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
              return new PostActions.CreatePostSuccess(<PostModels.Post>response);
            }
          ),
          catchError((error: HttpErrorResponse) => { 
            const errorResponse: PostModels.PostErrorResponse = this.errorHandler.getPostErrors(error);
            return of(new PostActions.CreatePostError(errorResponse));
          })
        )
      }
    )
  );

  @Effect() 
  deletePost$ = this.actions$
  .pipe(
    ofType<PostActions.DeletePost>(PostActions.Names.DELETE_POST),
    mergeMap(
      (data) => {        
        return this.postService.removePost(data.payload)
        .pipe(
          map(
            (response) => {               
              return new PostActions.DeletePostSuccess(data.payload);
            }
          ),
          catchError((error: HttpErrorResponse) => {             
            const errorResponse: PostModels.PostErrorResponse = this.errorHandler.getPostErrors(error);
            return of(new PostActions.DeletePostError(errorResponse));
          })
        )
      }
    )
  );

  @Effect() 
    uploadPhotos$ = this.actions$
    .pipe(
      ofType<PostActions.UploadPhotos>(PostActions.Names.UPLOAD_PHOTOS),
      mergeMap(
        (data) => {           
          return this.postService.uploadPostPhotos(data.payload)
          .pipe(
            map(
              (response) => {                
                return new PostActions.CreatePostSuccess(<PostModels.Post>response);
              }
            ),
            catchError((error: HttpErrorResponse) => {               
              const errorResponse: PostModels.PostErrorResponse = this.errorHandler.getPostErrors(error);
              return of(new PostActions.CreatePostError(errorResponse));
            })
          )
        }
      )
  ); 
}