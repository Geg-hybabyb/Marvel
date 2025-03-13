import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import useMarvelService from '../../services/MarvelService';
import setComponent from '../../utils/setComponent';

const SinglePage = ({Component, type}) => {

    const [data, setData] = useState(null);
    const {id} = useParams()
    
    const {getComic, clearError, getCharacter, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateComponent()
         // eslint-disable-next-line
    }, [id])

    const updateComponent = () => {
        clearError()

        switch(type){
            case 'character':
                getCharacter(id)
                    .then(setData).then(() => setProcess('confirm'))
                break;
            case 'comics':
                getComic(id)
                    .then(setData).then(() => setProcess('confirm'))
                break;
            default:
                return;
        }
    }

    return (
        <div className="single-comic">
            {setComponent(process, Component, data)}
        </div>
    )
}

export default SinglePage;