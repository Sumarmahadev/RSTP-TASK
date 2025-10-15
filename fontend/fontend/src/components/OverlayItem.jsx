import React from "react";
import { Rnd } from "react-rnd";
import axios from "axios";

const API_URL = "http://localhost:5000/api/overlays";

const OverlayItem = ({ overlay, onDelete }) => {
  const handleUpdate = async (position, size) => {
    try {
      await axios.put(`${API_URL}/${overlay._id}`, {
        ...overlay,
        position,
        size,
      });
    } catch (err) {
      console.error("Error updating overlay:", err);
    }
  };

  return (
    <Rnd
      default={{
        x: overlay.position?.x || 50,
        y: overlay.position?.y || 50,
        width: overlay.size?.w || 160,
        height: overlay.size?.h || 40,
      }}
      bounds="parent"
      onDragStop={(e, d) => {
        handleUpdate({ x: d.x, y: d.y }, overlay.size);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        handleUpdate(position, {
          w: ref.offsetWidth,
          h: ref.offsetHeight,
        });
      }}
      style={{
        background: overlay.type === "image" ? "transparent" : "rgba(0,255,255,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        borderRadius: 8,
        border: overlay.type === "image" ? "none" : "1px solid #0ff",
        backdropFilter: "blur(2px)",
        fontFamily: "'Inter', sans-serif",
        position: "absolute",
      }}
    >
      {overlay.type === "image" ? (
        <img
          src={overlay.content}
          alt="overlay"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: 8,
          }}
        />
      ) : (
        <span
          style={{
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
            padding: "0 10px",
            textAlign: "center",
          }}
        >
          {overlay.content}
        </span>
      )}
      <button
        onClick={() => onDelete(overlay._id)}
        style={{
          position: "absolute",
          top: -10,
          right: -10,
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: 20,
          height: 20,
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        X
      </button>
    </Rnd>
  );
};

export default OverlayItem;
