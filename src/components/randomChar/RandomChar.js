import { useState, useEffect } from "react";

import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spiner";
import goblin from "../../resources/img/goblin.png";
import "./randomChar.scss";

const RandomChar = () => {
    const [char, setChar] = useState({}),
        [loading, setLoading] = useState(true),
        [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    };

    const onCharLoading = () => {
        setLoading(true);
    };

    const onError = () => {
        setError(true);
        setLoading(false);
    };

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); //range

        onCharLoading();
        marvelService.getCharacter(id).then(onCharLoaded).catch(onError);
    };

    //conditional rendering
    const errorMessage = error ? <ErrorMessage /> : null,
        spinner = loading ? <Spinner /> : null,
        content = !(loading || error) ? <View char={char} /> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!
                    <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">Or choose another one</p>
                <button className="button button__main">
                    <div className="inner" onClick={updateChar}>
                        try it
                    </div>
                </button>
                <img src={goblin} alt="goblin" className="randomchar__decoration" />
            </div>
        </div>
    );
};

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;

    //to check the path to the placeholder image
    const notAvalibleImgAPath = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

    return (
        <div className="randomchar__block">
            <img
                src={thumbnail}
                alt="Random character"
                className="randomchar__img"
                style={thumbnail === notAvalibleImgAPath ? { objectFit: "contain" } : { objectFit: "cover" }}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;
