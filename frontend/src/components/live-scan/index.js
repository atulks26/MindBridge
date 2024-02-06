import React, { useState } from "react";
import axios from "axios";
import "./index.css"

function Scan() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const predictEmotion = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("eegData", selectedFile);

        try {
            const response = await axios.post(
                "http://localhost:5000/predict",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setPrediction(response.data.emotion);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="scan">
            <h1>EEG Emotion Prediction</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={predictEmotion}>Predict Emotion</button>
            {prediction && <div>Predicted Emotion: {prediction}</div>}
        </div>
    );
}

export default Scan;
