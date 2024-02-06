import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { firestore, auth } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import "./emo.css";

const EmotionGuessingGame = () => {
    let level;

    const emotionImages = [
        [
            "https://drive.google.com/file/d/1F4Sh_Nri-uxRwL6NnPZMv2DFXwoWwAjL/view?usp=drive_link",
            "disgusted",
        ],
        [
            "https://drive.google.com/file/d/1nhr_-XU9-1-m90wrM2ehHsDo59sb3AtU/view?usp=drive_link",
            "disgusted",
        ],
        [
            "https://drive.google.com/file/d/1VC3hYqMmZ_DKnZNQ6Wq_5KlDlkyjMBrm/view?usp=drive_link",
            "disgusted",
        ],
        [
            "https://drive.google.com/file/d/1Mch2EktMNi3oVEVEYUAly0m0C_UkeGw3/view?usp=drive_link",
            "disgusted",
        ],
        [
            "https://drive.google.com/file/d/1poioOYpeS7FkIaPt6EnCRyYzPQfSchwL/view?usp=drive_link",
            "fearful",
        ],
        [
            "https://drive.google.com/file/d/1p2PhOKkOkxvDCHrsQSdH3WeV-YUvUjKp/view?usp=drive_link",
            "fearful",
        ],
        [
            "https://drive.google.com/file/d/1KL0KS5P5KGN4nSlspmJQmhHBC8xoyzDQ/view?usp=drive_link",
            "fearful",
        ],
        [
            "https://drive.google.com/file/d/1rS_3ls-4ZzFC4RpwMLio5zbUmc4lCeNw/view?usp=drive_link",
            "fearful",
        ],
        [
            "https://drive.google.com/file/d/1xwgi2vdXIVYqEpnz3aXEsXZ8ebeEtakC/view?usp=drive_link",
            "fearful",
        ],
        [
            "https://drive.google.com/file/d/1SrtauVyLojFlg08u1TrXqj2UEobz4dVr/view?usp=drive_link",
            "fearful",
        ],
        [
            "https://drive.google.com/file/d/1ZiXa7O9JRFftOGc0KZuMEIhwpHBgkVjT/view?usp=drive_link",
            "angry",
        ],
        [
            "https://drive.google.com/file/d/1o-cli1h5VFe6DiTCvb9Qmeui6i1lxzK9/view?usp=drive_link",
            "fearful",
        ],
        [
            "https://drive.google.com/file/d/1PTCnp5VhWA9h0vn2JC8ebFDUZSXgcLm9/view?usp=drive_link",
            "happy",
        ],
        [
            "https://drive.google.com/file/d/1uw0ZTtbQBj9wfOIEvb-Ms8WuUHfYmm_m/view?usp=drive_link",
            "happy",
        ],
        [
            "https://drive.google.com/file/d/10x4PID_EqEUpSdqvnk5DhaPP3wxwokg_/view?usp=drive_link",
            "happy",
        ],
        [
            "https://drive.google.com/file/d/18ZRetU0tlul1kHH_V3_BrnySSjvW-EUC/view?usp=drive_link",
            "happy",
        ],
        [
            "https://drive.google.com/file/d/1d8AqqL-X1490Z7SSjRfk2pDprrXUlIxe/view?usp=drive_link",
            "happy",
        ],
        [
            "https://drive.google.com/file/d/1cdmatq2YOslRucr5mmxKQLq88agKE-bu/view?usp=drive_link",
            "happy",
        ],
        [
            "https://drive.google.com/file/d/1alAESjGtFuFAOSu-0jxDuYuS1Klk-4Lm/view?usp=drive_link",
            "happy",
        ],
        [
            "https://drive.google.com/file/d/1DuTZBxn_MYdq2FsexqxlPit3PndR5jGL/view?usp=drive_link",
            "sad",
        ],
        [
            "https://drive.google.com/file/d/1jcGBbwmYBHMKIHCfvR2iqmCqWhlu5ks4/view?usp=drive_link",
            "sad",
        ],
        [
            "https://drive.google.com/file/d/1_3yqcCcWUQcrCIME3EBG0zh42qzOkP1n/view?usp,=drive_link",
            "angry",
        ],
        [
            "https://drive.google.com/file/d/1jSY7YP6Ffx2gGDyfHDXGhxRHOFRkHpNG/view?usp=drive_link",
            "sad",
        ],
        [
            "https://drive.google.com/file/d/1CuQt7K0dzDhzPpMh9W2TaYh-BvV7vxpE/view?usp=drive_link",
            "sad",
        ],
        [
            "https://drive.google.com/file/d/1fgR5FvwuC_mhGBBKZqsikmeTWIAPYYIy/view?usp=drive_link",
            "sad",
        ],
        [
            "https://drive.google.com/file/d/1jKrMWfBCCt6oxd78d-aaAWSfrc1h4msv/view?usp=drive_link",
            "sad",
        ],
        [
            "https://drive.google.com/file/d/14wCCclxqaZN-6suyxQodxD8bt0NQ9kP1/view?usp=drive_link",
            "sad",
        ],
        [
            "https://drive.google.com/file/d/1uDKwYq2MdUbn08-vpLJcvTxIbVMiHElD/view?usp=drive_link",
            "surprised",
        ],
        [
            "https://drive.google.com/file/d/1Z5-xOiFqD-JWuima2xDcFpnvsJmrTJQr/view?usp=drive_link",
            "surprised",
        ],
        [
            "https://drive.google.com/file/d/1q3T0rwmie_n1p_7Nh6eR6tJWZgO5kD8d/view?usp=drive_link",
            "surprised",
        ],
        [
            "https://drive.google.com/file/d/1WoggkPY0Q9aqTlVEwEzd1JqSEJE3Z3jp/view?usp=drive_link",
            "surprised",
        ],
        [
            "https://drive.google.com/file/d/16YtTaH1rDu2ZrEulQAsAveg9BSSvJC7_/view?usp=drive_link",
            "surprised",
        ],
        [
            "https://drive.google.com/file/d/1mk2I8M6mMnA8n_oMdI25ljSqibSb8ZeE/view?usp=drive_link",
            "angry",
        ],
        [
            "https://drive.google.com/file/d/15n2vGyGOAANIpP5f8IEO9cuLMdQAAqne/view?usp=drive_link",
            "surprised",
        ],
        [
            "https://drive.google.com/file/d/1lREScRcYuCBpP-c_65uDo3rvBmHKGHS6/view?usp=drive_link",
            "surprised",
        ],
        [
            "https://drive.google.com/file/d/1amN9lMsDnQLyvizG7Z6uO_66XKhLz4-w/view?usp=drive_link",
            "angry",
        ],
        [
            "https://drive.google.com/file/d/1AjUN3VGjm7xyJlH9-RAj4VJjqr_B77vz/view?usp=drive_link",
            "angry",
        ],
        [
            "https://drive.google.com/file/d/1F294DQAl114EcjxutsR9Q7rbMhZ4Pzam/view?usp=drive_link",
            "angry",
        ],
        [
            "https://drive.google.com/file/d/1w3KxtG1vOmO96xkBfS-7CAIDz1PY4zIV/view?usp=drive_link",
            "disgusted",
        ],
        [
            "https://drive.google.com/file/d/1JvRZX9cpMJN2SGz47feUtMGL8H2HatKz/view?usp=drive_link",
            "disgusted",
        ],
        [
            "https://drive.google.com/file/d/1HsEFEFUEzuUftD1vk2E7EJnXLJUwqm5c/view?usp=drive_link",
            "angry",
        ],
    ];

    const [guess, setGuess] = useState("");
    const [result, setResult] = useState("");
    const [correctEmotion, setCorrectEmotion] = useState("");
    const [link, setLink] = useState("");

    const getLevel = async () => {
        if (auth.currentUser) {
            level = auth.emoquestLevel;
        }
    };

    getLevel();

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const startGame = async () => {
        if (auth.currentUser) {
            const docRef = doc(firestore, "user-data", auth.currentUser.uid);
            let newLevel = {
                emoquestLevel: level,
            };

            try {
                const snapshot = await getDoc(docRef);
                if (snapshot.exists()) {
                    const currentData = snapshot.data();
                    const updateData = { ...currentData, ...newLevel };
                    await setDoc(docRef, updateData);
                }
            } catch (err) {
                console.log(err);
            }
        }

        const randomInt = getRandomInt(1, 41);
        if (emotionImages[randomInt]) {
            setLink(emotionImages[randomInt][0]);
            setCorrectEmotion(emotionImages[randomInt][1]);
        }
    };

    useEffect(() => {
        startGame();
    }, []);

    const checkGuess = () => {
        if (guess.toLowerCase === correctEmotion.toLowerCase) {
            setResult("Correct! Well done!");
            level++;
        } else {
            setResult("Incorrect. Try again.");
        }
    };

    return (
        <div className={classNames("body")}>
            <h1 className={classNames("title")}>Emotion Guessing Game</h1>
            <div className="emo-image">
                <img src={link} />
            </div>
            <input
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter your guess..."
                className={classNames("input")}
            ></input>
            <button onClick={checkGuess} className={classNames("button")}>
                Check Guess
            </button>
            <p className={classNames("result")}>{result}</p>
        </div>
    );
};

export default EmotionGuessingGame;
