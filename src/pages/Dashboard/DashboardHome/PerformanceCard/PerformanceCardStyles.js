export const styles = {
  card: {
    mt: 3,
    borderRadius: "16px",
    p: { xs: 1.5, sm: 2 }, 
    backgroundColor: "#fff",
    border: "1px solid #E0E0E0",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0px 12px 24px rgba(0,0,0,0.12)",
      transform: "translateY(-2px)",
    },
  },

  header: {
    display: "flex",
    flexDirection: "column",
    mb: 2,
  },
  title: {
    fontFamily: "Mada, sans-serif",
    fontWeight: 600,
    fontSize: { xs: 16, sm: 18 },
    color: "#0C0B18",
  },
  accent: {
    width: "40px",
    height: "3px",
    borderRadius: "2px",
    backgroundColor: "#26A69A",
    mt: "4px",
  },
  cryptoContainer: {
    mt: 2,
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  cryptoItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    p: 1,
    borderRadius: "8px",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#F9FAFB",
    },
  },
   cryptoAvatar: {
    width: 28, 
    height: 28,
    borderRadius: "50%",
  },
  cryptoName: {
    fontFamily: "Mada, sans-serif",
    fontWeight: 500,
    fontSize: { xs: 13, sm: 13 },
    color: "#0C0B18",
  },
  cryptoPrice: {
    fontFamily: "Mada, sans-serif",
    fontWeight: 400,
    fontSize: { xs: 11, sm: 11 },
    color: "#646464",
  },
  cryptoChange: {
    fontFamily: "Mada, sans-serif",
    fontSize: { xs: 12, sm: 12 },
    fontWeight: 500,
    mr: 2,
  },
  cryptoAmount: {
    fontFamily: "Mada, sans-serif",
    color: "#646464",
    fontWeight: 500,
    fontSize: { xs: 13, sm: 12 },
  },
  divider: {
    my: 0.5,
    opacity: 0.5,
  },
};
