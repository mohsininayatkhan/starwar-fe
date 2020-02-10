import { Action } from '@ngrx/store';
import { PostState } from '../states/post.state';
import * as PostActions from '../actions/post.actions';
import { Post } from 'src/shared/models/timeline/post.models';
import {createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export const postAdapter: EntityAdapter<Post> = createEntityAdapter<Post>();

const initialState = postAdapter.getInitialState({
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