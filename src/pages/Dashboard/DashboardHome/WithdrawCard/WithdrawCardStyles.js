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
      fontWeight: 500,
      fontSize: { xs: 18, sm: 14 },
      color: "#0C0B18",
    },
    toggle: {
      fontSize: { xs: 16, sm: 14 },
      color: "#646464",
      cursor: "pointer",
      fontWeight: 500
    },
    item: {
      display: "flex",
      alignItems: "center",
      mb: 2,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: "10px",
      backgroundColor: "#D9D9D9",
      mr: 2,
    },
    itemDetails: {
      flexGrow: 1,
    },
    itemName: {
      fontSize: { xs: 14, sm: 12 },
      fontWeight: 600,
    },
    itemDate: {
      fontSize: { xs: 12, sm: 10 },
      color: "#646464",
      mt: 1,
    },
    itemAmount: {
      fontSize: { xs: 14, sm: 12 },
      fontWeight: 600,
    },
  };
  
  export const getMinCardHeight = (itemCount) => {
    const itemHeight = 72;
    const headerHeight = 48; 
    const padding = 32; 
    return headerHeight + padding + itemHeight * itemCount;
  };