import React from "react";
import { AlertTriangle, X } from "lucide-react";

const CustomErrorToast = ({ closeToast, message }) => {
  return (
    <div
      style={{
        backgroundColor: "#1F2937",
        color: "#fff",
        padding: "14px 18px",
        borderRadius: "7px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: "280px",
        fontFamily: "Mada, sans-serif",
        gap: "12px",
        position: "relative"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
        <AlertTriangle color="#F87171" size={22} />
        <div>
          <div style={{ fontWeight: "600", fontSize: "15px" }}>Error</div>
          <div style={{ fontSize: "13px", color: "#E2E8F0" }}>{message}</div>
        </div>
      </div>

      <X
        size={18}
        onClick={closeToast}
        style={{
          cursor: "pointer",
          color: "#94A3B8",
          flexShrink: 0
        }}
      />
    </div>
  );
};

export default CustomErrorToast;
