import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/",
        _apiKey = "apikey=3f144a4d08b94a489bf975a35488a98b";

    const _baseOffset = 210;

    //takes 9 characters (limit=9)
    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);

        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

        return _transformCharacter(res.data.results[0]);
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

    return { loading, error, clearError, getAllCharacters, getCharacter };
};

export default useMarvelService;
