import { useState, useEffect, useCallback } from 'react';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    
    const {loading, error, getCharacter, clearError} = useMarvelService();

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
             // eslint-disable-next-line
    }, [props.charId])

    const skeleton = loading || error || char ? null : <Skeleton/>;
    const errorMessagrs = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessagrs}
            {spinner}
            {content}
        </div>
    )

}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

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