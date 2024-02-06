import React, { useState, useEffect } from "react";
import "./nav.css";
import logo from "../images/logo.png";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

function Nav() {
    const handleSignout = async () => {
        if (auth.currentUser) {
            signOut(auth)
                .then(() => {
                    window.location.href = "/login";
                })
                .catch((error) => console.log(error));
        }
    };

    const element = document.getElementById("nav-signout");
    if (element) {
        if (
            window.location.pathname === "/login" ||
            window.location.pathname === "/signup"
        ) {
            signout.style.display = "none";
        } else {
            signout.style.display = "flex";
        }
    }

    const handleClick = async (e) => {
        e.preventDefault();

        window.location.href = "/home";
    };

    const handleFaq = async (e) => {
        e.preventDefault();
        window.location.href = "/faq";
    };

    return (
        <div id="nav" className="nav">
            <div className="nav-holder">
                <div className="nav-logo">
                    <img src={logo} alt="logo" onClick={handleClick} />
                </div>
                <div className="nav-buttons">
                    <button>Profile</button>
                    <button>About us</button>
                    <button onClick={handleFaq}>FAQs</button>
                    <button>Scan</button>
                </div>
                <div className="nav-signout">
                    <p onClick={handleSignout}>Signout</p>
                </div>
            </div>
        </div>
    );
}

export default Nav;
