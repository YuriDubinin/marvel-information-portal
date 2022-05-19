import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useInView } from "react-intersection-observer";

import RandomChar from "../../randomChar/RandomChar";
import CharList from "../../charList/CharList";
import CharInfo from "../../charInfo/CharInfo";
import CharSearchForm from "../../charSearchForm/CharSearchForm";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

import carnagePng from "../../../resources/img/vision.png";
import hobGoblinPng from "../../../resources/img/goblin.png";

import "./mainPage.scss";

const MainPage = () => {
    const [selectedChar, setChar] = useState(null);

    const { ref, inView } = useInView({});

    const onCharSelected = (id) => {
        setChar(id);
    };

    //conditional rendering of hob-goblin animation
    const hobGoblin = inView ? (
        <img className="hob-goblin-right-side" src={hobGoblinPng} alt="goblin" />
    ) : (
        <img className="hob-goblin-left-side" src={hobGoblinPng} alt="goblin" />
    );

    return (
        <div className="main-page">
            <Helmet>
                <meta name="description" content="Marvel information portal - it`s all about Marvel!" />
                <title>Marvel Information Portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar viewRef={ref} />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={carnagePng} alt="vision" />
            {hobGoblin}
        </div>
    );
};

export default MainPage;
