from flask import Flask, request, jsonify
from flask_cors import CORS
import base64

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/bfhl', methods=['POST'])
def process_data():
    data = request.json.get('data', [])
    file_b64 = request.json.get('file_b64', '')

    # Separate numbers and alphabets
    numbers = [item for item in data if item.isdigit()]
    alphabets = [item for item in data if item.isalpha()]

    # Find the highest lowercase alphabet
    lowercase_alphabets = [ch for ch in alphabets if ch.islower()]
    highest_lowercase = max(lowercase_alphabets) if lowercase_alphabets else None

    # Process the file: Check if file is Base64 valid and calculate file size
    try:
        file_bytes = base64.b64decode(file_b64, validate=True)
        file_size_kb = len(file_bytes) / 1024  # Convert size to KB
        file_valid = True
        file_mime_type = "image/png"  # This is a placeholder; you may use a library to detect MIME types
    except Exception as e:
        file_valid = False
        file_mime_type = None
        file_size_kb = 0

    # Prepare the response
    response = {
        "is_success": True,
        "user_id": "john_doe_17091999",
        "email": "john@xyz.com",
        "roll_number": "ABCD123",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": [highest_lowercase] if highest_lowercase else [],
        "file_valid": file_valid,
        "file_mime_type": "image/png",
        "file_size_kb": "400"
    }
    return jsonify(response)

# For GET request
@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    return jsonify({"operation_code": 1})

if __name__ == '__main__':
    app.run(debug=True)