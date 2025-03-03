import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'

import './comicsList.scss';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(210);
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
        return (
            <li className="comics__item"
                key={i}>
            <a href={elem.url}>
                <img src={elem.thumbnail} alt={elem.name} className="comics__item-img"/>
                <div className="comics__item-name">{elem.name}</div>
                <div className="comics__item-price">{elem.price}$</div>
            </a>
        </li>
        )
    })

    const spinner = loading && !newItemLoading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            <ul className="comics__grid">
                {renderList}
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