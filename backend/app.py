from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from helmet_detection_image import detect_helmet_image
from helmet_detection_video import detect_helmet_video

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


# 🔥 IMAGE DETECTION (WITH PLATE)
@app.route("/detect", methods=["POST"])
def detect():
    file = request.files["file"]
    path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(path)

    data = detect_helmet_image(path)

    print("Sending response:", data)  # 🔥 DEBUG

    return jsonify({
        "result": data.get("result", "No Detection"),
        "plate": data.get("plate", ""),
        "challan": 1000 if data.get("result") == "Without Helmet" else 0
    })


# 🔥 VIDEO DETECTION (UNCHANGED)
@app.route("/detect-video", methods=["POST"])
def detect_video():
    file = request.files["file"]
    path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(path)

    result = detect_helmet_video(path)

    return jsonify({
        "result": result,
        "challan": 1000 if result == "Without Helmet" else 0
    })


if __name__ == "__main__":
    app.run(debug=True)