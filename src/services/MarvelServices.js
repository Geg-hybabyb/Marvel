class MarvelServices {
    _apiBace = 'https://gateway.marvel.com/v1/public/'
    _apiKey = 'apikey=27abe9082ce2bd688b0b9dcf1fd1403c'

    getResource = async (url) => {
        const res = await fetch(url);

        if(!res.ok){
            throw new Error(`Виникла помилка(${url} | ${res.status})`)
        }
        return await res.json()
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBace}characters?limit=9&offset=210&${this._apiKey}`)
        return res.data.results.map(this._transformChar)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBace}characters/${id}?${this._apiKey}`)
        return this._transformChar(res.data.results[0])
    }

    _transformChar = (char) => {
        return ({
            id: char.id,
            name: char.name,
            description: char.description ? char.description.slice(0, 220) : "description is not defined",
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        })
    }
}

export default MarvelServices;