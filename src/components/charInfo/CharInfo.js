import { useState, useEffect, useCallback } from 'react';

import useMarvelService from '../../services/MarvelService';
import setComponent from '../../utils/setComponent'

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    
    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar()
         // eslint-disable-next-line
    }, [props.charId])

    const updateChar = useCallback(() => {
        const {charId} = props;
        
        if(!charId) {
            return;
        }

        clearError()
        getCharacter(charId)
            .then(setChar)
            .then(() => setProcess('confirm'))
             // eslint-disable-next-line
    }, [props.charId])

    return (
        <div className="char__info">
            {setComponent(process, View, char)}
        </div>
    )

}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;

    const availableImg = {objectFit: thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'contain' : null};

    let comicsRender = 'there are no comics';
    if(comics.length !== 0) {
        // eslint-disable-next-line
        comicsRender = comics.map((item, i) => {
            if(i < 10) {
                return(
                    <li className="char__comics-item"
                        key={i}>
                        {item.name}
                    </li>
                )
            }
        })
    }
    
    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} style={availableImg} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsRender}
            </ul>
        </>
    )
}

export default CharInfo;