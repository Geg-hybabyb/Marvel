import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'

import './comicsList.scss';

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

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(5);
    const [newItemLoading, setNewItemLoading] = useState(false)

    const {getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(true)
            // eslint-disable-next-line
    }, [])

    const onRequest = (init) => {
        init ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(updateList)
            .then(() => setProcess('confirm'))

        setOffset(offset => offset + 8)
    }

    const updateList = (comics) => {
        const newComics = comics;

        setComicsList(comics => [...comics, ...newComics])
        setNewItemLoading(false)
    }

    const renderList = () => comicsList.map((elem, i) => {
        return (
            <li className="comics__item"
                key={i}>
                <Link to={`/comics/${elem.id}`}>
                    <img src={elem.thumbnail} alt={elem.name} className="comics__item-img"/>
                    <div className="comics__item-name">{elem.name}</div>
                    <div className="comics__item-price">{elem.price}</div>
                </Link>
            </li>
        )
    })

    return (
        <div className="comics__list">
            <ul className="comics__grid">
            {setComponent(process, () => renderList(), newItemLoading)}
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