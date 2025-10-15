'''from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory storage for overlays (no DB needed)
overlays = []

@app.route("/api/overlays", methods=["GET"])
def get_overlays():
    return jsonify(overlays)

@app.route("/api/overlays", methods=["POST"])
def add_overlay():
    data = request.json
    data["_id"] = str(len(overlays) + 1)  # simple ID
    overlays.append(data)
    return jsonify({"message": "Overlay added"}), 201

@app.route("/api/overlays/<string:_id>", methods=["DELETE"])
def delete_overlay(_id):
    global overlays
    overlays = [o for o in overlays if o["_id"] != _id]
    return jsonify({"message": "Overlay deleted"}), 200

if __name__ == "__main__":
    app.run(debug=True)'''



from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app)

# Connect MongoDB
client = MongoClient("mongodb+srv://sumarchimacode_db_user:BEbu5i5eflZHhtpP@cluster2.4jv72my.mongodb.net/")
db = client["stream_app"]
collection = db["overlays"]

@app.route("/")
def home():
    return "✅ Flask backend running successfully!"

# --- READ ---
@app.route("/api/overlays", methods=["GET"])
def get_overlays():
    overlays = []
    for o in collection.find():
        o["_id"] = str(o["_id"])
        overlays.append(o)
    return jsonify(overlays)

# --- CREATE ---
@app.route("/api/overlays", methods=["POST"])
def add_overlay():
    data = request.json
    inserted = collection.insert_one(data)
    return jsonify({"_id": str(inserted.inserted_id)}), 201

# --- UPDATE ---
@app.route("/api/overlays/<string:overlay_id>", methods=["PUT"])
def update_overlay(overlay_id):
    data = request.json
    collection.update_one({"_id": ObjectId(overlay_id)}, {"$set": data})
    return jsonify({"message": "Overlay updated"}), 200

# --- DELETE ---
@app.route("/api/overlays/<string:overlay_id>", methods=["DELETE"])
def delete_overlay(overlay_id):
    collection.delete_one({"_id": ObjectId(overlay_id)})
    return jsonify({"message": "Overlay deleted"}), 200




#images 

import os
from flask import send_from_directory
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route("/api/upload", methods=["POST"])
def upload_image():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)
    return jsonify({"url": f"http://localhost:5000/uploads/{filename}"}), 200

@app.route("/uploads/<filename>")
def serve_image(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


if __name__ == "__main__":
    app.run(debug=True)

