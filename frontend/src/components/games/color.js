import React, { useState } from "react";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import "./color.css";

function Colormaze() {
    let level;
    const colors = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"];
    let sequence = [];
    let playerSequence = [];
    let inGame = false;
    const [loading, setLoading] = useState(false);

    const levelDisplay = document.getElementById("game-level");
    const sequenceDisplay = document.getElementById("sequence-display");
    const maze = document.getElementById("maze");
    const message = document.getElementById("message");
    const redBtn = document.getElementById("redBtn");
    const blueBtn = document.getElementById("blueBtn");
    const greenBtn = document.getElementById("greenBtn");
    const yellowBtn = document.getElementById("yellowBtn");
    const purpleBtn = document.getElementById("purpleBtn");
    const orangeBtn = document.getElementById("orangeBtn");

    //start or restart
    const startGame = async () => {
        setLoading(true);

        if (auth.currentUser) {
            const docRef = doc(firestore, "user-data", auth.currentUser.uid);
            try {
                const snapshot = await getDoc(docRef);
                if (snapshot.exists()) {
                    const userData = snapshot.data();
                    level = userData.colormazeLevel;
                }
            } catch (err) {
                console.log(err);
            }
        }

        if (levelDisplay) {
            levelDisplay.textContent = `Level: ${level}`;
        }

        sequence = [];
        playerSequence = [];
        inGame = true;
        nextLevel();

        setLoading(false);
    };

    //generate random sequence
    function generateSequence() {
        for (let i = 0; i < level + 1; i++) {
            const randomIndex = Math.floor(Math.random() * colors.length);
            sequence.push(colors[randomIndex]);
        }
    }

    //display current sequence to player
    function displaySequence() {
        if (sequenceDisplay) {
            sequenceDisplay.textContent = sequence.join(" ");
            setTimeout(
                () => {
                    sequenceDisplay.textContent = "";
                    enablePlayerInput();
                },
                level <= 5 ? 3000 : 5000
            );
        }

        if (levelDisplay) {
            levelDisplay.textContent = `Level: ${level}`;
        }
    }

    //player input
    function enablePlayerInput() {
        redBtn.addEventListener("click", handleSquareClick);
        blueBtn.addEventListener("click", handleSquareClick);
        greenBtn.addEventListener("click", handleSquareClick);
        yellowBtn.addEventListener("click", handleSquareClick);
        purpleBtn.addEventListener("click", handleSquareClick);
        orangeBtn.addEventListener("click", handleSquareClick);
    }

    //handle clicks
    function handleSquareClick(event) {
        // const selectedColor = event.target;
        const selectedColor = event.target.textContent;
        playerSequence.push(selectedColor);

        if (playerSequence.length === sequence.length) {
            checkSequence();
        }
    }

    //check sequence
    const checkSequence = async () => {
        if (JSON.stringify(playerSequence) === JSON.stringify(sequence)) {
            level++; //update level in db
            playerSequence = [];

            if (auth.currentUser) {
                const docRef = doc(
                    firestore,
                    "user-data",
                    auth.currentUser.uid
                );

                let newData = {
                    colormazeLevel: level,
                };

                try {
                    const snapshot = await getDoc(docRef);
                    if (snapshot.exists()) {
                        const userData = snapshot.data();
                        const updatedData = { ...userData, ...newData };

                        await setDoc(docRef, updatedData);
                    }
                } catch (err) {
                    console.log(err);
                }
            }

            nextLevel();
        } else {
            endGame();
        }

        console.log(JSON.stringify(playerSequence));
    };

    function nextLevel() {
        sequence = [];
        playerSequence = [];
        generateSequence();
        displaySequence();
    }

    const endGame = async () => {
        if (auth.currentUser) {
            const docRef = doc(firestore, "user-data", auth.currentUser.uid);

            let newData = {
                colormazeLevel: level,
            };

            try {
                const snapshot = await getDoc(docRef);
                if (snapshot.exists()) {
                    const userData = snapshot.data();
                    const updatedData = { ...userData, ...newData };

                    await setDoc(docRef, updatedData);
                }
            } catch (err) {
                console.log(err);
            }
        }

        inGame = false;
        message.textContent = "Game Over! You got lost in the maze.";
    };

    // startGame();

    return (
        <div className="colormaze">
            <div id="sequence-display" className="sequence-display"></div>
            <div id="color-display"></div>
            <div id="message" className="message"></div>
            <div id="game-level" className="game-level"></div>
            <button id="start" onClick={startGame} disabled={loading}>
                Start
            </button>

            <div className="buttons-container">
                <button id="redBtn">Red</button>
                <button id="blueBtn">Blue</button>
                <button id="greenBtn">Green</button>
                <button id="yellowBtn">Yellow</button>
                <button id="purpleBtn">Purple</button>
                <button id="orangeBtn">Orange</button>
            </div>
        </div>
    );
}

export default Colormaze;
