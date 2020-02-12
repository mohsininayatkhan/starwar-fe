import { Action } from '@ngrx/store';
import * as PostModels from  'src/shared/models/Timeline/post.models';

export enum Names {
    GET_ALL_POSTS = '[Timeline Page] Get Posts', 
    GET_ALL_POSTS_SUCCESS = '[Timeline Page] Get Posts Success',
    GET_ALL_POSTS_ERROR = '[Timeline Page] Get Posts Error',
    CREATE_POST = '[Timeline Page] Create Post',
    CREATE_POST_SUCCESS = '[Timeline Page] Create Post Success',
    CREATE_POST_ERROR = '[Timeline Page] Create Post Error',
}

export class GetAllPosts implements Action {
    readonly type = Names.GET_ALL_POSTS;    
}

export class GetAllPostsSuccess implements Action {
    readonly type = Names.GET_ALL_POSTS_SUCCESS;
    constructor(public payload: PostModels.Post[]) {}
}

export class GetAllPostsError implements Action {
    readonly type = Names.GET_ALL_POSTS_ERROR;
    constructor(public payload: PostModels.PostErrorResponse) {}
}

export class CreatePost implements Action {
    readonly type = Names.CREATE_POST;
    constructor(public payload: PostModels.CreatePostRequest) {}
}

export class CreatePostSuccess implements Action {
    readonly type = Names.CREATE_POST_SUCCESS;
    constructor(public payload: PostModels.Post) {}
}

export class CreatePostError implements Action {
    readonly type = Names.CREATE_POST_ERROR;
    constructor(public payload: PostModels.PostErrorResponse) {}
}

export type PostActionTypes = 
GetAllPosts | 
GetAllPostsSuccess |  
GetAllPostsError | 
CreatePost | 
CreatePostSuccess | 
CreatePostError;