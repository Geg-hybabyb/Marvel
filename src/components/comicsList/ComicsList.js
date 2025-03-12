import { useState, useEffect, createRef } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'

import './comicsList.scss';

const duration = 700;

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(5);
    const [newItemLoading, setNewItemLoading] = useState(false)
    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(true)
            // eslint-disable-next-line
    }, [])

    const onRequest = (init) => {
        init ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(updateList)

        setOffset(offset => offset + 8)
    }

    const updateList = (comics) => {
        const newComics = comics;

        setComicsList(comics => [...comics, ...newComics])
        setNewItemLoading(false)
    }

    const renderList = comicsList.map((elem, i) => {
        const ref = createRef(elem)
        return (
            <CSSTransition
                timeout={duration} 
                nodeRef={ref} 
                key={elem.id}
                classNames='comics__item'>
                <li className="comics__item"
                    key={i}>
                    <Link to={`/comics/${elem.id}`}>
                        <img src={elem.thumbnail} alt={elem.name} className="comics__item-img"/>
                        <div className="comics__item-name">{elem.name}</div>
                        <div className="comics__item-price">{elem.price}</div>
                    </Link>
            </li>
            </CSSTransition>
        )
    })

    const spinner = loading && !newItemLoading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {renderList}
                </TransitionGroup>
            </ul>
            <button className="button button__main button__long"
                onClick={() => onRequest(false)}
                disabled={newItemLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;