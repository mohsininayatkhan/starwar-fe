export let apiServer = 'http://localhost:81/starwar/public/api/';

export let apiPaths = {
    film : {
        topCharacter : apiServer + 'film/character/top',
        longestCrawl : apiServer + 'film/crawl/longest',
        PilotsByPlanets : apiServer + 'film/planet/pilots',
        SpeciesByAppearance : apiServer + 'film/species',
    }
};