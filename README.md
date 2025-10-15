# 🎥 Livestream Overlay Dashboard

This project is a full-stack livestream dashboard that allows users to:

- Play MP4 or HLS video streams in the browser
- Add draggable and resizable text or image overlays
- Upload local images (e.g., logos) as overlays
- Persist overlay positions and sizes to a MongoDB database via a Flask API


## 🧱 Tech Stack

- **Frontend:** React, react-rnd, Axios  
- **Backend:** Flask, Flask-CORS, PyMongo  
- **Database:** MongoDB   (curd operations)
- **Video:** Native HTML5 `<video>` tag (supports MP4, HLS)  

---

### Getting Started
### 1. Clone the repository

```bash
git clone https://github.com/Sumarmahadev/RSTP-TASK


2) Backend Setup (Flask)
cd backend
pip install -r requirements.txt


Run Flask server
python app.py

Backend will start at: http://localhost:5000

3. Frontend Setup (React)
cd frontend
npm install
npm start


Frontend will run at: http://localhost:3000

📂 Project Structure
.
├── backend/
│   ├── app.py
│   ├── uploads/
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   │   └── OverlayItem.js
│   │   └── ...
│   └── public/
│       └── index.html
└── README.md


Features
----------
# Add text overlays with custom content

# Add image overlays via URL or file upload

#  Drag and resize overlays on top of the video

# Save overlay position and size to MongoDB

# Upload and serve images from Flask backend



Requirements

Python 3.8+

Node.js 16+

MongoDB (local or cloud)

blinker==1.9.0
click==8.3.0
colorama==0.4.6
dnspython==2.8.0
Flask==3.1.2
flask-cors==6.0.1
itsdangerous==2.2.0
Jinja2==3.1.6
MarkupSafe==3.0.3
pymongo==4.15.3
python-dotenv==1.1.1
Werkzeug==3.1.3











API Endpoints
---------------------------------------------------------
| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| GET    | /api/overlays       | Get all overlays        |
| POST   | /api/overlays       | Add new overlay         |
| PUT    | /api/overlays/<id>  | Update overlay position |
| DELETE | /api/overlays/<id>  | Delete overlay          |
| POST   | /api/upload         | Upload image file       |
| GET    | /uploads/<filename> | Serve uploaded image    |
----------------------------------------------------------