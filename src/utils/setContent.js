import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

//rendering the right parts of the interface depending on the process
const setContent = (process, Component, data) => {
    switch (process) {
        case "waiting":
            return <Skeleton />;
        case "loading":
            return <Spinner />;
        case "confirmed":
            return <Component data={data} />;
        case "error":
            return <ErrorMessage />;
        default:
            throw new Error("Unexpected process state");
    }
};

export default setContent;
