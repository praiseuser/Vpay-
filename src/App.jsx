import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme/Theme";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <CssBaseline />
                <Router />
            </BrowserRouter>
        </ThemeProvider>
    )
}