export let apiServer = 'http://10.1.5.113:81/starwar/public/api/';
export let server = 'http://10.1.5.113:81/rec/public/api/';

export let apiPaths = {
    film : {
        topCharacter : apiServer + 'film/character/top',
        longestCrawl : apiServer + 'film/crawl/longest',
        PilotsByPlanets : apiServer + 'film/planet/pilots',
        SpeciesByAppearance : apiServer + 'film/species',
    },
    auth: {
        register: server+'register',
        login: server+'login',
        logout: server+'logout',
        uploadPhoto: server+'user/picture',
        updateProfile: server+'user',
    },
    timeline: {
        post: {
            getAllPosts: server+'post',
            createPost: server+'post',
            uploadPhotos: server+'post/image',
            deletePost: server+'post/{id}'
        }        
    },
    user: {
        post: {
            getAllPosts: server+'post?by={id}',
            getuserProfile: server+'user/{id}'
        },
        profile: {
            get: server+'user/{id}'
        }
    }
};