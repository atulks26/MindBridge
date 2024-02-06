import React from "react";
import bg from "../images/pattern.png";
import "./landing.css";

function Landing() {
    const handleClick = async (e) => {
        e.preventDefault();

        window.location.href = "/signup";
    };

    return (
        <div className="landing">
            <img src={bg} />
            <div className="landing-content">
                <div className="landing-text">
                    <p>Mind Bridge</p>
                </div>
                <button onClick={handleClick}>Get Started</button>
            </div>
        </div>
    );
}

export default Landing;
