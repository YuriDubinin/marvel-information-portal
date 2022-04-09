import img from "./error.gif";

const ErrorMessague = () => {
    return (
        <div className="error-message">
            <img
                style={{
                    display: "block",
                    width: "250px",
                    height: "250px",
                    objectFit: "contain",
                    margin: "0 auto",
                    borderRadius: "5px",
                }}
                src={img}
                alt="error message"
            />
        </div>
    );
};

export default ErrorMessague;
