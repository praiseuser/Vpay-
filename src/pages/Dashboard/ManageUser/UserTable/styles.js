import { styled, Switch } from "@mui/material";

export const StyledTableCell = styled("span")({
    fontFamily: "Mada",
    "&.table-text": {
        color: "#888B93",
        "&.font-weight-600": { fontWeight: 600 },
        "&.font-weight-400": { fontWeight: 400 },
    },
});

export const StyledEmailPhoneCell = styled("span")({
    fontFamily: "Mada",
    "&.table-text": {
        color: "#888B93",
        "&.font-weight-500": { fontWeight: 500 },
    },
});

export const StyledSwitch = styled(Switch)(({ theme }) => ({
    width: 50,
    height: 28,
    padding: 0,
    display: "flex",
    "& .MuiSwitch-switchBase": {
        padding: 2,
        "&.Mui-checked": {
            transform: "translateX(22px)",
            color: "#fff",
            "& + .MuiSwitch-track": { backgroundColor: "#22c55e", opacity: 1 },
        },
    },
    "& .MuiSwitch-thumb": {
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        width: 22,
        height: 22,
        borderRadius: "50%",
        transition: "0.3s",
    },
    "& .MuiSwitch-track": {
        borderRadius: 15,
        backgroundColor: "#d1d5db",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], { duration: 300 }),
    },
}));
