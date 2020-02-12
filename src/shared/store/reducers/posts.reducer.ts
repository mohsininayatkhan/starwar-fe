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
    loading: false
});

export function postReducer(state: PostState = initialState, action: PostActions.PostActionTypes) :PostState {    
    switch(action.type) {
        case PostActions.Names.GET_ALL_POSTS:
            return {
                ...state,
                loading: true,
                error: null
            };
        case PostActions.Names.GET_ALL_POSTS_SUCCESS:
            return postAdapter.addMany(action.payload, { ...state, loading: false, error: null});
        case PostActions.Names.GET_ALL_POSTS_ERROR:             
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case PostActions.Names.CREATE_POST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case PostActions.Names.CREATE_POST_SUCCESS:
            return postAdapter.addOne(action.payload, state);
        case PostActions.Names.CREATE_POST_ERROR:
            return {
                ...state,
                loading: false,
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
    selectTotal
} = postAdapter.getSelectors();


export const selectPostIds = selectIds;
 
export const selectPostEntities = selectEntities;
 
export const selectAllPosts = selectAll;
 
export const selectPostTotal = selectTotal;