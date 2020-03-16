import { Action } from '@ngrx/store';
import { PostState, selectedPostId, sortById } from '../states/post.state';
import * as PostActions from '../actions/post.actions';
import { Post } from 'src/shared/models/timeline/post.models';
import {createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export const postAdapter: EntityAdapter<Post> = createEntityAdapter<Post>({
    selectId: selectedPostId,
    sortComparer: sortById,
});

const initialState = postAdapter.getInitialState({
    selectedPostId: null,
    error: null,
    processing: false,
    current_page: null,
    first_page_url: null,
    from: null,
    next_page_url: null,
    path: null,
    per_page: null,
    prev_page_url: null,
    to: null,
});

export function postReducer(state: PostState = initialState, action: PostActions.PostActionTypes) :PostState {    
    switch(action.type) {
        case PostActions.Names.RESET_POSTS:
            return initialState;
        case PostActions.Names.GET_ALL_POSTS:
            return {
                ...state,
                processing: true,
                error: null,
                current_page: null,
                first_page_url: null, 
                from: null, 
                next_page_url: null, 
                path: null, 
                per_page: null, 
                prev_page_url: null, 
                to: null
            };
        case PostActions.Names.GET_ALL_POSTS_SUCCESS:
            return postAdapter.addMany(
                action.payload.data, { 
                    ...state, 
                    processing: false, 
                    error: null,
                    current_page: action.payload.current_page,
                    first_page_url: action.payload.first_page_url, 
                    from: action.payload.from, 
                    next_page_url: action.payload.next_page_url, 
                    path: action.payload.path, 
                    per_page: action.payload.per_page, 
                    prev_page_url: action.payload.prev_page_url, 
                    to: action.payload.to
                });
        case PostActions.Names.GET_ALL_POSTS_ERROR:             
            return {
                ...state,
                processing: false,
                error: action.payload
            };
        case PostActions.Names.CREATE_POST:
        case PostActions.Names.UPLOAD_PHOTOS:
            return {
                ...state,
                processing: true,
                error: null
            };
        case PostActions.Names.CREATE_POST_SUCCESS:
            return postAdapter.addOne(action.payload, {...state, processing: false, error: null});
        case PostActions.Names.CREATE_POST_ERROR:        
            return {
                ...state,
                processing: false,
                error: action.payload
            };
        case PostActions.Names.DELETE_POST:
            return {
                ...state,
                processing: true,
                error: null
            };
        case PostActions.Names.DELETE_POST_SUCCESS:
            return postAdapter.removeOne(action.payload, {...state, processing: false, error: null});
        case PostActions.Names.DELETE_POST_ERROR:
            return {
                ...state,
                processing: false,
                error: action.payload
            };
        default:
            return state;
    }
}

const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal,
} = postAdapter.getSelectors();


export const selectPostIds = selectIds;
 
export const selectPostEntities = selectEntities;
 
export const selectAllPosts = selectAll;
 
export const selectPostTotal = selectTotal;