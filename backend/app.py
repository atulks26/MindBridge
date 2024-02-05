from flask import Flask, jsonify
app = Flask(_name_)

@app.route('/api/data', methods = ['GET'])
def get_data():
    data = {
        "message": "Hello this is api end point"
    }
    return jsonify(data)
if _name_ == '_main_':
    app.run(host = '0.0.0.0', debug=True)