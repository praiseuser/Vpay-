export const styles = {
    card: {
      borderRadius: "16px",
      p: { xs: 2, sm: 3 },
      mt: 2.9,
      backgroundColor: "#fff",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      mb: 2,
    },
    title: {
      fontWeight: 600,
      fontSize: { xs: 24, sm: 22 },
      color: "#0C0B18",
    },
    toggle: {
      fontSize: { xs: 18, sm: 16 },
      color: "#646464",
      cursor: "pointer",
    },
    chartContainer: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
    },
    chartLabel: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-30%)",
      textAlign: "center",
    },
    labelText: {
      fontWeight: 400,
      fontSize: { xs: 16, sm: 14 },
      lineHeight: "20px",
      color: "#717171",
    },
    labelAmount: {
      fontWeight: 700,
      fontSize: { xs: 18, sm: 16 },
      lineHeight: "150%",
      color: "#1A1A1A",
    },
    monthNav: {
      display: "flex",
      justifyContent: "space-between",
      mt: 2,
    },
    navItem: {
      display: "flex",
      alignItems: "center",
      gap: 1,
    },
    navIcon: {
      width: "8px",
      height: "7.2px",
      left: "4px",
      cursor: "pointer",
    },
    navText: {
      fontWeight: 400,
      fontSize: { xs: 16, sm: 14 },
      lineHeight: "20px",
      color: "#646464",
    },
    currentMonth: {
      fontSize: { xs: 18, sm: 16 },
      fontWeight: 600,
      lineHeight: "26px",
      color: "#000000",
    },
  };