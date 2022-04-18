import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/",
        _apiKey = "apikey=3f144a4d08b94a489bf975a35488a98b";

    const _baseOffset = 210;

    //takes 9 characters (limit=9)
    const getAllCharacters = async (offset = _baseOffset) => {
        const response = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);

        return response.data.results.map(_transformCharacter);
    };

    //takes 1 character by id
    const getCharacter = async (id) => {
        const response = await request(`${_apiBase}characters/${id}?${_apiKey}`);

        return _transformCharacter(response.data.results[0]);
    };

    //transform the original object into the one that intresting us
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description
                ? `${char.description.slice(0, 210)}...`
                : "There is no description for this character",
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        };
    };

    //takes 1 comics by id
    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    };

    //takes 8 comics
    const getAllComics = async () => {
        const response = await request(`${_apiBase}comics?limit=8&${_apiKey}`);

        return response.data.results.map(_transformComics);
    };

    //tranform the original object into the one that intresting us
    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || "There is no description",
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : "No information about the number of pages",
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            language: comics.textObjects.language || "en-us",
            price: comics.prices.price ? `${comics.prices.price}$` : "not available",
        };
    };

    return { loading, error, clearError, getAllCharacters, getCharacter, getComics, getAllComics };
};

export default useMarvelService;
