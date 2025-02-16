import { Component } from 'react';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMassage/ErrorMassage';
import MarvelServices from '../../services/MarvelServices';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelServices = new MarvelServices();

    componentDidMount() {
        this.marvelServices
                .getAllCharacters()
                .then(this.updateList)
                .catch(this.onError)
    }

    updateList = (charList) => {
         this.setState({
            charList,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    renderList = () => {
        const charItem = this.state.charList.map(elem => {
            const availableImg = {objectFit: elem.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'unset' : null};
  
            return(
                <li className="char__item"
                    key={elem.id}>
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
        const {loading, error} = this.state;
        const charItem = this.renderList()

        const load = loading ? <Spinner/> : null;
        const errorMassage = error ? <ErrorMessage/> : null;
        const content = !(load || errorMassage) ? charItem : null;

        return (
            <div className="char__list">
                {load}
                {errorMassage}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;