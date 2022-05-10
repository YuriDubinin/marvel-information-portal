import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";

const SingleCharPage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { loading, error, clearError, getCharacter, getComic } = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = (data) => {
        clearError();

        //checking dataType
        switch (dataType) {
            case "comic":
                getComic(id).then(onDataLoaded);
                break;
            case "character":
                getCharacter(id).then(onDataLoaded);
                break;
            default:
                return;
        }
    };

    const onDataLoaded = (data) => {
        setData(data);
    };

    //conditional rendering
    const errorMessage = error ? <ErrorMessage /> : null,
        spinner = loading ? <Spinner /> : null,
        content = !(loading || error || !data) ? <Component data={data} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

export default SingleCharPage;
