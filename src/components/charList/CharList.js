import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [endList, setEndList] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, [])

    const onRequest = (offset, init) => {
        init ? setNewItemLoading(true) : setNewItemLoading(false)
        getAllCharacters(offset)
            .then(onUpdateList)
    }
    
    const onUpdateList = (newCharList) => {
        let ended = false
        if(newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList])
        setOffset(offset => offset + 9)
        setNewItemLoading(false)
        setEndList(ended)
    }

    const itemRef = useRef([])

    const onClickCharItem = (elem, id) => {
        props.onCharSelected(elem.id)

        itemRef.current.forEach(item => item.classList.remove('char__item_selected'))
        itemRef.current[id].classList.add('char__item_selected')
        itemRef.current[id].focus();
    }

    const renderList = () => {
        const charItem = charList.map((elem, i) => {
            const availableImg = {objectFit: elem.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'unset' : null};

            return(
                <li className='char__item'
                    ref={elem => itemRef.current[i] = elem}
                    key={elem.id}
                    tabIndex={0}
                    onClick={() => onClickCharItem(elem, i)}
                    onKeyDown={(e) => {
                        if(e.key === ' ' || e.key === 'Enter') {
                            onClickCharItem(elem, i)
                        }
                    }}
                    >
                    <img src={elem.thumbnail} alt={elem.name} style={availableImg}/>
                    <div className="char__name">{elem.name}</div>
                </li>
            )
        });

        return(
            <ul className="char__grid">
                {charItem}
            </ul>
        )
    }

    const charItem = renderList()
    
    const load = loading && newItemLoading ? <Spinner/> : null;
    const errorMassage = error ? <ErrorMessage/> : null;

    return (
        <div className="char__list">
            {load}
            {errorMassage}
            {charItem}
            <button 
                className="button button__main button__long"
                onClick={() => onRequest(offset, true)}
                style={{'display': endList ? 'none' : 'block'}}
                disabled={newItemLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;