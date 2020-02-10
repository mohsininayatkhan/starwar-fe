import { AuthState } from './auth.state';
import { PostState } from './post.state';

export interface AppState {
    auth: AuthState;
    posts: PostState
}