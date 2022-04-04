import { Component } from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
    };
    marvelService = new MarvelService();

    //lyfecucle hooks
    componentDidMount() {
        this.updateChars();
    }

    //methods
    onCharsLoaded = (chars) => {
        this.setState({ chars, loading: false });
    };

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    };

    updateChars = () => {
        this.marvelService.getAllCharacters().then(this.onCharsLoaded).catch(this.onError);
    };

    render() {
        const { chars, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null,
            spinner = loading ? <Spinner /> : null;

        const elements = chars.map((item) => {
            return (
                <li className="char__item" key={item.id}>
                    <img src={item.thumbnail} alt="abyss" />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {spinner}
                    {errorMessage}
                    {elements}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
