import React from "react";
import "./home.css";
import Brain from "../images/brain.png";

function Home() {
    return (
        <div className="home">
            <div className="home-desc-img">
                <div className="home-description">
                    <p className="home-desc-1">Mind Bridge</p>
                    <p className="home-desc-2">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                    </p>
                </div>
                <div className="home-main-image">
                    <img src={Brain} />
                </div>
            </div>
        </div>
    );
}

export default Home;
