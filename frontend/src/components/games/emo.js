import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./emo.css";

const EmotionGuessingGame = () => {
    const emotions = [
        "Happy",
        "Sad",
        "Angry",
        "Surprised",
        "Fearful",
        "Disgusted",
    ];
    const [prompts, setPrompts] = useState([]);
    const [guess, setGuess] = useState("");
    const [result, setResult] = useState("");
    const [correctEmotion, setCorrectEmotion] = useState("");
    const [selectedEmotions, setSelectedEmotions] = useState([]);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function startGame() {
        const nums = [];
        const numberOfPrompts = getRandomInt(3, 6);
        // const selectedEmotions = [];

        while (selectedEmotions.length < numberOfPrompts) {
            const randomIndex = getRandomInt(0, emotions.length - 1);

            if (!nums.includes(randomIndex)) {
                nums.push(randomIndex);
                selectedEmotions.push(emotions[randomIndex]);
            }
        }

        setSelectedEmotions(selectedEmotions);

        const randomCorrectIndex = getRandomInt(0, selectedEmotions.length - 1);
        setCorrectEmotion(selectedEmotions[randomCorrectIndex]);
        setPrompts(selectedEmotions);
    }

    useEffect(() => {
        startGame();
    }, []);

    const displayPrompt = () => {
        return `Guess the emotion: ${prompts.join(", ")}`;
    };

    const checkGuess = () => {
        if (guess.toLowerCase === correctEmotion.toLowerCase) {
            setResult("Correct! Well done!");
        } else {
            setResult("Incorrect. Try again.");
        }
    };

    return (
        <div className={classNames("body")}>
            <h1 className={classNames("title")}>Emotion Guessing Game</h1>
            <p className={classNames("prompt")}>{displayPrompt()}</p>
            <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter your guess"
                className={classNames("input")}
            />
            <button onClick={checkGuess} className={classNames("button")}>
                Check Guess
            </button>
            <p className={classNames("result")}>{result}</p>
        </div>
    );
};

export default EmotionGuessingGame;
