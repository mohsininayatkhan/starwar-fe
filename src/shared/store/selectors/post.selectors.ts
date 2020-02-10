import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from 'src/shared/store/states/post.state';
import * as fromPost from 'src/shared/store/reducers/posts.reducer';

export const selectPostState = createFeatureSelector<PostState>("posts");

export const selectPostIds = createSelector(
    selectPostState,
    fromPost.selectPostIds
);

export const selectPostEntities = createSelector(
    selectPostState,
    fromPost.selectPostEntities
);

export const selectAllPosts = createSelector(
    selectPostState,
    fromPost.selectAllPosts
);

export const selectPostTotal = createSelector(
    selectPostState,
    fromPost.selectPostTotal
);