class MarvelServices {
    _apiBace = 'https://gateway.marvel.com/v1/public/'
    _apiKey = 'apikey=c5d6fc8b83116d92ed468ce36bac6c62'

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
            description: char.description ? char.description.slice(0, 220) : "data is not defined",
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        })
    }
}

export default MarvelServices;