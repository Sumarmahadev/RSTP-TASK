import React, { useState } from "react";

const VideoTest = () => {
  const [streamUrl, setStreamUrl] = useState("");
  const [play, setPlay] = useState(false);

  const handlePlay = () => {
    if (!streamUrl.trim()) {
      alert("Please enter a valid video URL.");
      return;
    }
    setPlay(true);
  };

  return (
    <div style={{ padding: 20, background: "#001f3f", color: "#0ff" }}>
      <h2>🎥 Native Video Player Test</h2>
      <input
        type="text"
        placeholder="Enter MP4 or HLS URL"
        value={streamUrl}
        onChange={(e) => setStreamUrl(e.target.value)}
        style={{ padding: 10, width: "80%", marginBottom: 10 }}
      />
      <button onClick={handlePlay} style={{ padding: "10px 20px" }}>
        ▶️ Play Video
      </button>

      <div style={{ marginTop: 20, width: "100%", maxWidth: 800 }}>
        {play && streamUrl && (
          <video
            src={streamUrl}
            controls
            autoPlay
            muted
            style={{ width: "100%", height: 450, backgroundColor: "#000" }}
            onError={() =>
              alert("❌ Could not play the video. Please check the URL format.")
            }
          />
        )}
      </div>
    </div>
  );
};

export default VideoTest;
