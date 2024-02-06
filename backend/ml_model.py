import numpy as np
import pandas as pd

# Function to generate synthetic EEG data for a given emotion
def generate_eeg_data(emotion, duration_sec=60, sampling_rate=256):
    time_points = np.arange(0, duration_sec, 1 / sampling_rate)

    # Frequency components for different emotions (just for illustration)
    if emotion == 'happy':
        frequencies = [10, 20, 30]
    elif emotion == 'sad':
        frequencies = [5, 15, 25]
    elif emotion == 'emotional':
        frequencies = [8, 18, 28]
    elif emotion == 'fear':
        frequencies = [11, 21, 31]
    elif emotion == 'anger':
        frequencies = [6, 16, 26]
        
    else:
        raise ValueError("Invalid emotion")

    # Generate EEG signal as a sum of sine waves
    eeg_signal = sum(np.sin(2 * np.pi * f * time_points) for f in frequencies)

    return pd.DataFrame({'Time': time_points, 'EEG Signal': eeg_signal, 'Emotion': emotion})

# Generate synthetic dataset
happy_data = generate_eeg_data('happy')
sad_data = generate_eeg_data('sad')
emotional_data = generate_eeg_data('emotional')
fear_data = generate_eeg_data('fear')
anger_data = generate_eeg_data('anger')

# Combine datasets
synthetic_dataset = pd.concat([happy_data, sad_data, emotional_data, fear_data, anger_data], ignore_index=True)

# Shuffle the dataset
synthetic_dataset = synthetic_dataset.sample(frac=1).reset_index(drop=True)

# Display the first few rows of the synthetic dataset
print(synthetic_dataset.head())

# Save the synthetic dataset to a CSV file
synthetic_dataset.to_csv('synthetic_eeg_dataset.csv', index=False)