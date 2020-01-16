export let apiServer = 'http://localhost:81/starwar/public/api/';
export let authServer = 'http://localhost:81/rec/public/api/';

export let apiPaths = {
    film : {
        topCharacter : apiServer + 'film/character/top',
        longestCrawl : apiServer + 'film/crawl/longest',
        PilotsByPlanets : apiServer + 'film/planet/pilots',
        SpeciesByAppearance : apiServer + 'film/species',
    },
    auth: {
        register: authServer+'register'
    }

};