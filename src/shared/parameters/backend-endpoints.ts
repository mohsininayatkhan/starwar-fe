
export let server = 'http://10.1.5.113:81/rec/public/';
export let basePath = server+'api/';

export let apiPaths = {    
    auth: {
        register: basePath+'register',
        login: basePath+'login',
        logout: basePath+'logout',
        uploadPhoto: basePath+'user/picture',
        updateProfile: basePath+'user',
    },
    timeline: {
        post: {
            getAllPosts: basePath+'post',
            createPost: basePath+'post',
            uploadPhotos: basePath+'post/image',
            deletePost: basePath+'post/{id}'
        }        
    },
    user: {
        post: {
            getAllPosts: basePath+'post?by={id}',
            getuserProfile: basePath+'user/{id}'
        },
        profile: {
            get: basePath+'user/{id}'
        }
    }
};