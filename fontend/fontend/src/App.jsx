import React, { useState, useEffect } from "react";
import axios from "axios";
import OverlayItem from "./components/OverlayItem";

const API_URL = "http://localhost:5000/api/overlays";
const UPLOAD_URL = "http://localhost:5000/api/upload";

const App = () => {
  const [overlays, setOverlays] = useState([]);
  const [newOverlay, setNewOverlay] = useState("");
  const [overlayType, setOverlayType] = useState("text");
  const [streamUrl, setStreamUrl] = useState("");
  const [play, setPlay] = useState(false);

  useEffect(() => {
    fetchOverlays();
  }, []);

  const fetchOverlays = async () => {
    try {
      const res = await axios.get(API_URL);
      setOverlays(res.data);
    } catch (err) {
      console.error("Error fetching overlays:", err);
    }
  };

  const addOverlay = async () => {
    if (!newOverlay.trim()) return;
    try {
      await axios.post(API_URL, {
        type: overlayType,
        content: newOverlay,
        position: { x: 50, y: 50 },
        size: { w: 160, h: 40 },
      });
      setNewOverlay("");
      fetchOverlays();
    } catch (err) {
      console.error("Error adding overlay:", err);
    }
  };

  const deleteOverlay = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchOverlays();
    } catch (err) {
      console.error("Error deleting overlay:", err);
    }
  };

  const handlePlay = () => {
    const trimmed = streamUrl.trim();
    if (!trimmed) {
      alert("Please enter a valid video URL.");
      return;
    }

    if (trimmed.toLowerCase().startsWith("rtsp://")) {
      alert(
        "⚠️ RTSP links are not supported in browsers.\n\nUse https://rtsp.me to convert your RTSP link to a browser-friendly HTTPS stream."
      );
      return;
    }

    setPlay(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(UPLOAD_URL, formData);
      const imageUrl = res.data.url;

      await axios.post(API_URL, {
        type: "image",
        content: imageUrl,
        position: { x: 50, y: 50 },
        size: { w: 160, h: 60 },
      });

      fetchOverlays();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ Image upload failed.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎥 Livestream Player with Overlays</h1>

      <input
        type="text"
        placeholder="Enter MP4 or HLS URL"
        value={streamUrl}
        onChange={(e) => setStreamUrl(e.target.value)}
        style={styles.input}
      />
      <button onClick={handlePlay} style={styles.playButton}>
        ▶️ Play Stream
      </button>

      <div style={styles.playerWrapper}>
        {play && streamUrl && (
          <video
            src={streamUrl}
            controls
            autoPlay
            muted
            style={{ width: "100%", height: "100%", backgroundColor: "#000" }}
            onError={() =>
              alert("❌ Could not play the video. Please check the URL format.")
            }
          />
        )}

        {overlays.map((o) => (
          <OverlayItem key={o._id} overlay={o} onDelete={deleteOverlay} />
        ))}
      </div>

      <div style={styles.overlayInput}>
        <select
          value={overlayType}
          onChange={(e) => setOverlayType(e.target.value)}
          style={styles.select}
        >
          <option value="text">Text</option>
          <option value="image">Image URL</option>
        </select>
        <input
          type="text"
          placeholder={
            overlayType === "text" ? "Enter overlay text" : "Enter image URL"
          }
          value={newOverlay}
          onChange={(e) => setNewOverlay(e.target.value)}
          style={styles.overlayTextInput}
        />
        <button onClick={addOverlay} style={styles.addButton}>
          ➕ Add Overlay
        </button>
      </div>

      <div style={{ marginTop: 10 }}>
        <label style={{ color: "#0ff", fontWeight: 600 }}>
          Upload image overlay:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={styles.uploadInput}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    minHeight: "100vh",
    background: "#001f3f",
    color: "#0ff",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontWeight: 600,
    fontSize: "1.8rem",
    marginBottom: 10,
  },
  input: {
    width: "70%",
    maxWidth: 500,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    border: "none",
    fontSize: "1rem",
  },
  playButton: {
    padding: "10px 20px",
    background: "#0ff",
    color: "#000",
    borderRadius: 5,
    cursor: "pointer",
    marginBottom: 20,
    fontWeight: 600,
  },
  playerWrapper: {
    position: "relative",
    width: "90%",
    maxWidth: 800,
    height: 450,
    backgroundColor: "#000",
  },
  overlayInput: {
    marginTop: 20,
    display: "flex",
    gap: 10,
  },
  overlayTextInput: {
    padding: 10,
    borderRadius: 5,
    border: "none",
    width: 300,
    fontSize: "1rem",
  },
  select: {
    padding: 10,
    borderRadius: 5,
    border: "none",
    background: "#0ff",
    color: "#000",
    fontWeight: 600,
  },
  addButton: {
    padding: "10px 20px",
    borderRadius: 5,
    background: "#0ff",
    color: "#000",
    cursor: "pointer",
    fontWeight: 600,
  },
  uploadInput: {
    marginTop: 5,
    padding: 10,
    borderRadius: 5,
    background: "#0ff",
    color: "#000",
    cursor: "pointer",
    fontWeight: 600,
  },
};

export default App;
