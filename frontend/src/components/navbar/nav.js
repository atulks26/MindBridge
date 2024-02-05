import React from "react";
import "./nav.css";

function Nav() {
    return (
        <div className="nav">
            <div className="nav-logo">
                <img src="" alt="logo" />
            </div>
            <div className="nav-buttons">
                <button>Profile</button>
                <button>About us</button>
                <button>FAQs</button>
                <button>Scan</button>
            </div>
            <div className="nav-signout">
                <p>Sign Out</p>
            </div>
        </div>
    );
}

export default Nav;
