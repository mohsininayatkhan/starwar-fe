import { EntityState } from '@ngrx/entity';
import { Post, PostErrorResponse} from 'src/shared/models/timeline/post.models';

export interface PostState extends EntityState<Post> 
{
    selectedPostId: number,
    error: PostErrorResponse;
    loading: boolean;
    current_page: string;
    first_page_url: string;
    from: string;
    next_page_url?: string;
    path: string;
    per_page: string;
    prev_page_url?: string;
    to: string;
}

export function selectedPostId(p: Post): number 
{
    return p.id;
}

export function sortById(a: Post, b: Post): number 
{
    var result = a.id - b.id;
    return -result;
}