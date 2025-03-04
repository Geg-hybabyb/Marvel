import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom/cjs/react-router-dom.min';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './singleComicPage.scss';

const SingleComicPage = () => {

    const [comic, setComic] = useState(null);
    const {comicId} = useParams()
    
    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic()
         // eslint-disable-next-line
    }, [comicId])

    const updateComic = useCallback(() => {
        clearError()
        getComic(comicId)
            .then(setComic)

             // eslint-disable-next-line
    }, [comicId])

    const errorMessagrs = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <div className="single-comic">
           {errorMessagrs}
           {spinner}
           {content}
        </div>
    )
}

const View = ({comic}) => {

        const {name, thumbnail, price, pageCount, description} = comic;

    return (
        <>
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleComicPage;