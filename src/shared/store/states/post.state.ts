import { EntityState } from '@ngrx/entity';
import { Post, PostErrorResponse} from 'src/shared/models/timeline/post.models';

export interface PostState extends EntityState<Post> {
    selectedPostId: number,
    error: PostErrorResponse;
    loading: boolean;
}

export function selectedPostId(p: Post): number {
    return p.id;
}

export function sortById(a: Post, b: Post): number {
    var result = a.id - b.id;
    return -result;
}