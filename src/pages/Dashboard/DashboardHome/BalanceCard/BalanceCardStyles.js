export const styles = {
    card: {
        height: 286,
        borderRadius: "16px",
        p: { xs: 2, sm: 3 },
        marginLeft: { xs: 0, sm: "4px" },
        boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.2)", 
    },
    
    greetingContainer: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    greeting: {
        color: "#646464",
        fontSize: { xs: 18, sm: 16 },
    },
    logo: {
        width: 24,
        height: 24,
    },
    name: {
        fontWeight: 500,
        color: "#0C0B18",
        fontSize: { xs: 18, sm: 16 },
    },
    divider: {
        my: 2,
        borderColor: "#D9D9D9",
    },
    balanceLabel: {
        color: "#646464",
        fontSize: { xs: 18, sm: 16 },
    },
    balanceAmount: {
        fontWeight: 700,
        fontSize: { xs: 24, sm: 20 },
        color: "#0C0B18",
    },
    button: {
        mt: "40px",
        width: "180px",
        height: "38px",
        borderRadius: "8px",
        backgroundColor: "#377DFF",
        textTransform: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontFamily: "Mada, sans-serif",
        fontWeight: 700,
        fontSize: "16px",
        lineHeight: "26px",
        letterSpacing: "0.5px",
        color: "#ffffff",
        verticalAlign: "middle",
        marginLeft: "8px",
    },
};