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
        this.marvelService.getAllCharacters().then(this.onCharsLoaded).catch(this.onError);
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
        const { chars, loading, error } = this.state;

        const items = this.renderItems(chars);

        const errorMessage = error ? <ErrorMessage /> : null,
            spinner = loading ? <Spinner /> : null,
            content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}

                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
