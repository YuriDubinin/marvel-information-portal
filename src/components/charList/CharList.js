import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charList.scss";

const CharList = (props) => {
    const [chars, setChars] = useState([]),
        [newItemLoading, setNewItemLoading] = useState(false),
        [offset, setOffset] = useState(210),
        [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset).then(onCharsLoaded);
    };

    const onCharsLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }

        setChars((chars) => [...chars, ...newChars]);
        setNewItemLoading((setNewItemLoading) => false);
        setOffset((offset) => offset + 9);
        setCharEnded((charEnded) => ended);
    };

    //sets active card using refs
    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach((item) => item.classList.remove("char__item_selected"));
        itemRefs.current[id].classList.add("char__item_selected");
        itemRefs.current[id].focus();
    };

    //method for optimization
    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = { objectFit: "cover" };

            //choosing an image style for a placeholder image
            if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = { objectFit: "unset" };
            }

            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    ref={(el) => (itemRefs.current[i] = el)}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
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

    const items = renderItems(chars);

    //conditional rendering
    const errorMessage = error ? <ErrorMessage /> : null,
        spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {items}

            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{ display: charEnded ? "none" : "block" }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

//type checking
CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
