export const styles = {
    card: {
      borderRadius: "16px",
      p: { xs: 2, sm: 2 },
      backgroundColor: "#fff",
      marginTop: "2px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      mb: 2,
    },
    title: {
      fontWeight: 600,
      fontSize: { xs: 20, sm: 16 },
      color: "#0C0B18",
    },
    toggle: {
      fontSize: { xs: 18, sm: 16 },
      color: "#646464",
      cursor: "pointer",
    },
    item: {
      display: "flex",
      alignItems: "center",
      mb: 2,
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: "10px",
      backgroundColor: "#D9D9D9",
      mr: 2,
    },
    itemDetails: {
      flexGrow: 1,
    },
    itemName: {
      fontSize: { xs: 16, sm: 14 },
      fontWeight: 600,
    },
    itemDate: {
      fontSize: { xs: 14, sm: 12 },
      color: "#646464",
      mt: 1,
    },
    itemAmount: {
      fontSize: { xs: 16, sm: 14 },
      fontWeight: 600,
    },
  };
  
  export const getMinCardHeight = (itemCount) => {
    const itemHeight = 72;
    const headerHeight = 48; 
    const padding = 32; 
    return headerHeight + padding + itemHeight * itemCount;
  };