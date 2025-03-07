import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const duration = 700;

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
        init ? setNewItemLoading(false) : setNewItemLoading(true)
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

    const onClickCharItem = (id, ref) => {
        props.onCharSelected(id)

        ref.current.classList.add('char__item_selected')
        ref.current.focus();
    }

    const onBlurItem = (ref) => {
        ref.current.classList.remove('char__item_selected')
    }
    
    const renderList = () => {
        
        const charItem = charList.map((elem, i) => {
            const availableImg = {objectFit: elem.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'unset' : null};
            const ref = createRef(elem)

            return(
                <CSSTransition
                timeout={duration} 
                nodeRef={ref} 
                key={elem.id}
                classNames='char__item'>
                    <li className='char__item'
                        ref={ref}
                        tabIndex={0}
                        onClick={() => onClickCharItem(elem.id, ref)}
                        onBlur={() => onBlurItem(ref)}
                        onKeyDown={(e) => {
                            if(e.key === ' ' || e.key === 'Enter') {
                                onClickCharItem(elem.id)
                            }
                        }}
                        >
                        <img src={elem.thumbnail} alt={elem.name} style={availableImg}/>
                        <div className="char__name">{elem.name}</div>
                    </li>
                </CSSTransition>
            )
        });

        return(
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {charItem}
                </TransitionGroup>
            </ul>
        )
    }

    const charItem = renderList()
    
    const load = loading && !newItemLoading ? <Spinner/> : null;
    const errorMassage = error ? <ErrorMessage/> : null;

    return (
        <div className="char__list">
            {load}
            {errorMassage}
            {charItem}
            <button 
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
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