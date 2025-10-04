export const styles = {
  card: {
    borderRadius: "16px",
    p: { xs: 2, sm: 3 },
    mt: 2.5,
    backgroundColor: "#fff",
    border: "1px solid #E0E0E0",
    minHeight: "280px", 
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.12)",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    mb: 1.5,
  },
  title: {
    fontWeight: 600,
    fontSize: { xs: 18, sm: 16 },
    color: "#0C0B18",
  },
  toggle: {
    fontSize: { xs: 14, sm: 13 },
    color: "#646464",
    cursor: "pointer",
    fontWeight: 500,
    "&:hover": { textDecoration: "underline" },
  },
  chartContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    height: "160px",
  },
  chartLabel: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-40%)",
    textAlign: "center",
  },
  labelText: {
    fontWeight: 400,
    fontSize: { xs: 13, sm: 12 },
    lineHeight: "18px",
    color: "#717171",
  },
  labelAmount: {
    fontWeight: 700,
    fontSize: { xs: 15, sm: 14 },
    lineHeight: "150%",
    color: "#1A1A1A",
  },
  monthNav: {
    display: "flex",
    justifyContent: "space-between",
    mt: 1.5,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    cursor: "pointer",
    "&:hover": { color: "#26A69A" },
  },
  navIcon: {
    fontSize: "18px",
  },
  navText: {
    fontWeight: 400,
    fontSize: { xs: 13, sm: 12 },
    color: "#646464",
  },
  currentMonth: {
    fontSize: { xs: 15, sm: 14 },
    fontWeight: 600,
    color: "#000000",
  },
};
