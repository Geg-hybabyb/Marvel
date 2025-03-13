import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const setComponent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>
        case 'loading':
            return !newItemLoading ? <Spinner/> : <Component/>
        case 'confirm':
            return <Component/>
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('Unexpected process state')
    }
}

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [endList, setEndList] = useState(false);

    const {getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, [])

    const onRequest = (offset, init) => {
        init ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onUpdateList)
            .then(() => setProcess('confirm'))
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

    const onClickCharItem = id => {
        itemRef.current.forEach(elem => elem.classList.remove('char__item_selected'))
        itemRef.current[id].classList.add('char__item_selected')
        itemRef.current[id].focus();
    }

    const renderList = () => {
        const charItem = charList.map((elem, i) => {
            const availableImg = {objectFit: elem.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'unset' : null};

            return(
                <li className='char__item'
                    ref={el => itemRef.current[i] = el}
                    tabIndex={0}
                    key={elem.id}
                    onClick={() => {
                        onClickCharItem(i)
                        props.onCharSelected(elem.id)
                    }}
                    onKeyDown={(e) => {
                        if(e.key === ' ' || e.key === 'Enter') {
                            onClickCharItem(i)
                            props.onCharSelected(elem.id)
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

    const elements = useMemo(() => {
        return setComponent(process, () => renderList(), newItemLoading)
        // eslint-disable-next-line
    }, [process])

    return (
        <div className="char__list">
            {elements}
            <button 
                className="button button__main button__long"
                onClick={() => onRequest(offset, newItemLoading)}
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