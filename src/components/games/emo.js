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

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function isPresent(min, max, nums) {
        const randomIdx = getRandomInt(0, emotions.length - 1);
        if (nums.includes(randomIdx)) {
            isPresent(min, max, nums);
        } else {
            nums.push(randomIdx);
            return randomIdx;
        }
    }

    const startGame = () => {
        const nums = [];
        const numberOfPrompts = getRandomInt(3, 6);
        const selectedEmotions = [];
        const allEmotions = emotions;

        for (let i = 0; i < numberOfPrompts; i++) {
            const randomIndex = isPresent(0, allEmotions.length - 1, nums);

            selectedEmotions.push(allEmotions[randomIndex]);
        }

        setPrompts(selectedEmotions);
    };

    useEffect(() => {
        startGame();
    }, []);

    const displayPrompt = () => {
        return `Guess the emotion: ${prompts.join(", ")}`;
    };

    const checkGuess = () => {
        const guessedEmotions = guess
            .split(",")
            .map((emotion) => emotion.trim());
        const correctEmotions = [
            "Happy",
            "Sad",
            "Angry",
            "Surprised",
            "Fearful",
            "Disgusted",
        ];
        const correct = guessedEmotions.every((guess) =>
            correctEmotions.includes(guess)
        );

        setResult(correct ? "Correct! Well done!" : "Incorrect. Try again.");
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
