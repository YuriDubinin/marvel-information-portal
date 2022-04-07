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
        newItemLoading: false,
        offset: 210,
        charEnded: false,
    };

    marvelService = new MarvelService();

    //lyfecucle hooks
    componentDidMount() {
        this.onRequest();
    }

    //methods
    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset).then(this.onCharsLoaded).catch(this.onError);
    };

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        });
    };

    onCharsLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }

        this.setState(({ offset, chars }) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }));
    };

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    };

    //method for optimization
    renderItems(arr) {
        const items = arr.map((item) => {
            let imgStyle = { objectFit: "cover" };

            if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = { objectFit: "unset" };
            }

            return (
                <li
                    className="char__item"
                    key={item.id}
                    onClick={() => {
                        this.props.onCharSelected(item.id);
                    }}
                >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });
        //centring spinner & error message
        return <ul className="char__grid">{items}</ul>;
    }

    render() {
        const { chars, loading, error, offset, newItemLoading, charEnded } = this.state;

        const items = this.renderItems(chars);

        const errorMessage = error ? <ErrorMessage /> : null,
            spinner = loading ? <Spinner /> : null,
            content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}

                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{ display: charEnded ? "none" : "block" }}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
