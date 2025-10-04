export const styles = {
  card: {
    borderRadius: "16px",
    p: { xs: 2, sm: 2 },
    backgroundColor: "#fff",
    marginTop: "2px",
    border: "1px solid #E0E0E0",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    mb: 2,
  },
  title: {
    fontWeight: 600,
    fontSize: { xs: 16, sm: 14 },
    color: "#0C0B18",
    fontFamily: "Mada, sans-serif",
  },
  toggle: {
    fontSize: { xs: 14, sm: 13 },
    color: "#646464",
    cursor: "pointer",
    fontWeight: 500,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    py: 1,
    transition: "background 0.2s ease",
    "&:hover": {
      backgroundColor: "#F9F9F9",
      borderRadius: "8px",
    },
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: "#D9D9D9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mr: 2,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: 600,
    color: "#0C0B18",
    fontFamily: "Mada, sans-serif",
  },
  itemDetails: {
    flexGrow: 1,
  },
  itemName: {
    fontSize: { xs: 14, sm: 12 },
    fontWeight: 600,
    fontFamily: "Mada, sans-serif",
  },
  itemDate: {
    fontSize: { xs: 12, sm: 10 },
    color: "#646464",
    mt: 0.5,
    fontFamily: "Mada, sans-serif",
  },
  itemAmount: {
    fontSize: { xs: 14, sm: 12 },
    fontWeight: 600,
    fontFamily: "Mada, sans-serif",
  },
  divider: {
    height: "1px",
    backgroundColor: "#E0E0E0",
    my: 1,
    width: "100%",
  },
};

export const getMinCardHeight = (itemCount) => {
  const itemHeight = 72;
  const headerHeight = 48;
  const padding = 32;
  return headerHeight + padding + itemHeight * itemCount;
};
