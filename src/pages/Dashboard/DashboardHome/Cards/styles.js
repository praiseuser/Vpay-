// styles.js

export const container = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  padding: "10px",
  justifyContent: "space-between",
};

export const card = {
  flex: {
    xs: "1 1 100%",
    sm: "1 1 calc(50% - 12px)",
    md: "1 1 calc(25% - 12px)",
  },
  minWidth: "180px",
  minHeight: "110px", // back to compact height like before
  background: "linear-gradient(135deg, #ffffff 0%, #f9fafc 100%)",
  borderRadius: "12px",
  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  padding: "12px",
  border: "1px solid rgba(224, 224, 224, 0.7)",
  transition: "all 0.25s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-3px) scale(1.01)",
    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
  },
};

export const textContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  marginLeft: "10px",
};

export const title = {
  fontFamily: "Mada, sans-serif",
  fontWeight: "600",
  fontSize: "13px",
  color: "#374151",
};

export const value = {
  fontFamily: "Mada, sans-serif",
  fontWeight: "700",
  fontSize: "18px",
  color: "#111827",
};

export const growth = {
  fontFamily: "Mada, sans-serif",
  fontWeight: "600",
  fontSize: "11px",
  color: "#059669",
};

export const chartContainer = {
  width: "60px",
  height: "60px",
  marginRight: "12px",
};
