import { useState } from "react";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charSearchForm.scss";

const CharSearchForm = () => {
    const [char, setChar] = useState(null);

    const { loading, error, clearError, getCharacterByName } = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const updateChar = (charName) => {
        clearError();

        if (!charName) {
            return;
        }

        getCharacterByName(charName).then((char) => onCharLoaded(char));
    };

    //conditional render
    const criticalError = error ? <ErrorMessage /> : null;

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
                    <button className="char__search-button button button__secondary" type="submit" disabled={loading}>
                        <div className="inner">find</div>
                    </button>
                    <FormikErrorMessage className="char__search-error" name="charName" component="div" />
                </Form>
            </Formik>

            {result}
            {criticalError}
        </div>
    );
};

export default CharSearchForm;
