import { EntityState } from '@ngrx/entity';
import { Post, PostErrorResponse} from 'src/shared/models/timeline/post.models';

export interface PostState extends EntityState<Post>{    
    error: PostErrorResponse;
    loading: boolean;
}