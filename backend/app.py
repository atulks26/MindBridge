# app.py
from flask import Flask, request, jsonify
from ml_model import preprocess_inputs, train_and_evaluate_model


app = Flask(__name__)

@app.route('/predict_emotion', methods=['POST'])
def predict_emotion():
    try:
        # Get data from the frontend
        data = request.get_json()

        # Preprocess inputs
        X = preprocess_inputs(pd.DataFrame(data))

        # Train and evaluate model
        model, history, y_test, y_pred, cm, clr = train_and_evaluate_model(X, data['label'])

        # Return results
        return jsonify({
            'model_summary': model.summary(),
            'history': history.history,
            'confusion_matrix': cm.tolist(),
            'classification_report': clr
        })
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)