import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=c5d6fc8b83116d92ed468ce36bac6c62';
    const _baseOffset = 210;

    const {loading, error, request, clearError, process, setProcess} = useHttp();

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
        return res.data.results.map(_transformCharacter);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0])
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            name: comics.title,
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available',
            pageCount: comics.pageCount,
            description: comics.description ? comics.description : 'There is no description for this comic',
            language: comics.textObjects[0]?.language || "en-us"
        }
    } 

    return {
        process,
        setProcess,
        loading,
        error,
        clearError,
        getAllCharacters,
        getCharacterByName,
        getCharacter,
        getAllComics, 
        getComic
    }
}

export default useMarvelService;