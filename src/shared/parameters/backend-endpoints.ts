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
    },
    timeline: {
        post: {
            getAllPosts: server+'post',
            createPost: server+'post'
        }        
    }

};