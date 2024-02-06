import React from "react";
import "./home.css";
import Brain from "../images/brain1.png";
import Controller from "../images/controller.png";
import Smiley from "../images/smiley.png";
import Journal from "../images/journal.png";
import Cap from "../images/cap.png";

function Home() {
    const redirectGame = async (e) => {
        e.preventDefault();

        window.location.href = "/games/colormaze";
    };

    return (
        <div className="home">
            <div className="home-desc-img">
                <div className="home-description">
                    <p className="home-desc-1">Mind Bridge</p>
                    <p className="home-desc-2">
                        Listening to the silent struggles, painting a canvas of
                        empathy for every individual touched by autism.
                    </p>
                </div>
                <div className="home-main-image">
                    <img src={Brain} />
                </div>
            </div>
            <div className="home-cards">
                <div className="feature-card" onClick={redirectGame}>
                    <img src={Controller} />
                    <p>Play and Grow</p>
                </div>
                <div className="feature-card">
                    <img src={Smiley} />
                    <p>Well Being Tracker</p>
                </div>
                <div className="feature-card">
                    <img src={Journal} />
                    <p>Progress Tracker</p>
                </div>
                <div className="feature-card">
                    <img src={Cap} />
                    <p>Routine Tracker</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
