import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const SinglePage = ({Component, type}) => {

    const [data, setData] = useState(null);
    const {id} = useParams()
    
    const {loading, error, getComic, clearError, getCharacter} = useMarvelService();

    useEffect(() => {
        updateComponent()
         // eslint-disable-next-line
    }, [id])

    const updateComponent = useCallback(() => {
        clearError()

        switch(type){
            case 'character':
                getCharacter(id)
                    .then(setData)
            break;
            case 'comics':
                getComic(id)
                    .then(setData)
        }
             // eslint-disable-next-line
    }, [id])

    const errorMessagrs = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
        <div className="single-comic">
           {errorMessagrs}
           {spinner}
           {content}
        </div>
    )
}

export default SinglePage;