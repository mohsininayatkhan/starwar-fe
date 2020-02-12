export class Post {    
    id : number;
    title: string;
    description?: string;
    user_id: number;
    created_at: string;
    update_at: string;
    author?: Author
}

export class Author {    
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    posts_count: number;
}

export interface PostSuccessResponse {
    posts: Post[]
}

export interface PostErrorResponse {
    message: string,
    errors?: any[]
}

export interface CreatePostRequest {
    title: string,
    description?: string;
}