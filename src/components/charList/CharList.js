import { Component } from 'react';
import PropTypes, { func } from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1546,
        newItemLoading: true,
        endList: false
    }

    marvelServices = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelServices
                .getAllCharacters(offset)
                .then(this.onUpdateList)
                .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onUpdateList = (newCharList) => {
        let ended = false
        if(newCharList.length < 9) {
            ended = true;
        }

        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newCharList: false,
            offset: offset + 9,
            newItemLoading: false,
            endList: ended
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    renderList = () => {
        const charItem = this.state.charList.map((elem, i) => {
            const availableImg = {objectFit: elem.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'unset' : null};

            return(
                <li className="char__item"
                    key={elem.id}
                    onClick={() => this.props.onCharSelected(elem.id)}>
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

    render() {
        const {loading, error, offset, newItemLoading, endList} = this.state;
        const charItem = this.renderList()

        const load = loading ? <Spinner/> : null;
        const errorMassage = error ? <ErrorMessage/> : null;
        const content = !(load || errorMassage) ? charItem : null;

        return (
            <div className="char__list">
                {load}
                {errorMassage}
                {content}
                <button 
                    className="button button__main button__long"
                    onClick={() => this.onRequest(offset)}
                    style={{'display': endList ? 'none' : 'block'}}
                    disabled={newItemLoading}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;