import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import AppBanner from "../appBanner/AppBanner";

const SingleCharPage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { clearError, getCharacter, getComic, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateData();
        // eslint-disable-next-line
    }, [id]);

    const updateData = (data) => {
        clearError();

        //checking dataType
        switch (dataType) {
            case "comic":
                getComic(id)
                    .then(onDataLoaded)
                    .then(() => setProcess("confirmed"));
                break;
            case "character":
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setProcess("confirmed"));
                break;
            default:
                break;
        }
    };

    const onDataLoaded = (data) => {
        setData(data);
    };

    return (
        <>
            <AppBanner />
            {setContent(process, Component, data)}
        </>
    );
};

export default SingleCharPage;
