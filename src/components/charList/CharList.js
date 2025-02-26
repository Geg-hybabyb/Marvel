import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        offset: 210,
        endList: false,
        selectedChar: null
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

    setRef = elem => {
        this.itemRef = elem
    }

    onClickCharItem = (elem) => {
        this.props.onCharSelected(elem.id)

        this.onCharSelected(elem.id)
        this.setRef(elem);
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    renderList = () => {
        const charItem = this.state.charList.map((elem, i) => {
            const availableImg = {objectFit: elem.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'unset' : null};
            let className = 'char__item'

            if(elem.id === this.state.selectedChar) {
                className += ' char__item_selected'
            }

            return(
                <li className={className}
                    ref={this.setRef(elem)}
                    key={elem.id}
                    tabIndex={0}
                    onClick={() => this.onClickCharItem(elem)}>
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