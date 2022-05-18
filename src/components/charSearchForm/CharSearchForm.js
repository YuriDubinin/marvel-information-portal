import { useState } from "react";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charSearchForm.scss";

//rendering the right parts of the interface depending on the process
const setContent = (process, char) => {
    const result = char ? (
        char.length > 0 ? (
            <div className="char__search-wrapper-feedback">
                <div className="char__search-successful">There is! Visit {char[0].name} page?</div>
                <Link to={`/characters/${char[0].id}`} className="button button__main" type="submit">
                    <div className="inner">to page</div>
                </Link>
            </div>
        ) : (
            <div className="char__search-error">The character was not found. Check the name and try again</div>
        )
    ) : null;

    switch (process) {
        case "waiting":
            return;
        case "loading":
            return <div style={{ textAlign: "center", color: "green", marginTop: "15px" }}>Searching..</div>;
        case "confirmed":
            return result;
        case "error":
            return <ErrorMessage />;
        default:
            throw new Error("Unexpected process state");
    }
};

const CharSearchForm = () => {
    const [char, setChar] = useState(null);

    const { clearError, getCharacterByName, process, setProcess } = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const updateChar = (charName) => {
        clearError();

        if (!charName) {
            return;
        }

        getCharacterByName(charName)
            .then((char) => onCharLoaded(char))
            .then(() => setProcess("confirmed"));
    };

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{
                    charName: "",
                }}
                validationSchema={Yup.object({
                    charName: Yup.string().required("This field is required").max(40, "It`s too long"),
                })}
                onSubmit={({ charName }) => {
                    updateChar(charName);
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="name">
                        Or find a character by name:
                    </label>
                    <Field
                        className="char__search-input"
                        id="charName"
                        name="charName"
                        type="text"
                        placeholder="Enter name"
                    />
                    <button
                        className="char__search-button button button__secondary"
                        type="submit"
                        disabled={process === "loading" ? true : false}
                    >
                        <div className="inner">find</div>
                    </button>
                    <FormikErrorMessage className="char__search-error" name="charName" component="div" />
                </Form>
            </Formik>

            {setContent(process, char)}
        </div>
    );
};

export default CharSearchForm;
