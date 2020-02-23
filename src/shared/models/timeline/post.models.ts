export class Post {    
    id : number;
    title: string;
    description?: string;
    user_id: number;
    created_at: string;
    update_at: string;
    author?: Author;
    items: Item[];
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

export class Item {    
    id: number;
    title?: string;
    source: string;
    post_id: number;
    type: string;
    created_at: string;
    updated_at: string;
}

export class PostSuccessResponse {
    data: Post[];
    current_page: string;
    first_page_url: string;
    from: string;
    next_page_url?: string;
    path: string;
    per_page: string;
    prev_page_url?: null;
    to: string;
}

export interface PostErrorResponse {
    message: string,
    errors?: any[]
}

export interface CreatePostRequest {
    title: string,
    description?: string;
}

export class UploadPhotosRequest {
    photos: File[];
}