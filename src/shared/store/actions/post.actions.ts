import { Action } from '@ngrx/store';
import * as PostModels from  'src/shared/models/Timeline/post.models';

export enum Names {
    GET_ALL_POSTS = '[Timeline Page] Get Posts', 
    GET_ALL_POSTS_SUCCESS = '[Timeline Page] Get Posts Success',
    GET_ALL_POSTS_ERROR = '[Timeline Page] Get Posts Error',
    CREATE_POST = '[Timeline Page] Create Post',
    UPLOAD_PHOTOS = '[Timeline Page] Upload Post Photos',
    CREATE_POST_SUCCESS = '[Timeline Page] Create Post Success',
    CREATE_POST_ERROR = '[Timeline Page] Create Post Error',
    RESET_POSTS = '[Timeline Page] Reset Posts',
    DELETE_POST = '[Timeline Page] Delete Post',
    DELETE_POST_SUCCESS = '[Timeline Page] Delete Post Scuccess',
    DELETE_POST_ERROR = '[Timeline Page] Delete Post Error',
}

export class ResetPosts implements Action {
    readonly type = Names.RESET_POSTS;    
}

export class GetAllPosts implements Action {
    readonly type = Names.GET_ALL_POSTS;
    constructor(public payload: string) {}
}

export class GetAllPostsSuccess implements Action {
    readonly type = Names.GET_ALL_POSTS_SUCCESS;
    constructor(public payload: PostModels.PostSuccessResponse) {}
}

export class GetAllPostsError implements Action {
    readonly type = Names.GET_ALL_POSTS_ERROR;
    constructor(public payload: PostModels.PostErrorResponse) {}
}

export class CreatePost implements Action {
    readonly type = Names.CREATE_POST;
    constructor(public payload: PostModels.CreatePostRequest) {}
}

export class UploadPhotos implements Action {
    readonly type = Names.UPLOAD_PHOTOS;
    constructor(public payload: PostModels.UploadPhotosRequest) {}
}

export class CreatePostSuccess implements Action {
    readonly type = Names.CREATE_POST_SUCCESS;
    constructor(public payload: PostModels.Post) {}
}

export class CreatePostError implements Action {
    readonly type = Names.CREATE_POST_ERROR;
    constructor(public payload: PostModels.PostErrorResponse) {}
}

export class DeletePost implements Action {
    readonly type = Names.DELETE_POST;
    constructor(public payload: number) {}
}

export class DeletePostSuccess implements Action {
    readonly type = Names.DELETE_POST_SUCCESS;
    constructor(public payload: number) {}
}

export class DeletePostError implements Action {
    readonly type = Names.DELETE_POST_ERROR;
    constructor(public payload: PostModels.PostErrorResponse) {}    
}

export type PostActionTypes = 
ResetPosts | 
GetAllPosts | 
GetAllPostsSuccess |  
GetAllPostsError | 
CreatePost | 
UploadPhotos | 
CreatePostSuccess | 
CreatePostError | 
DeletePost |
DeletePostError |
DeletePostSuccess;