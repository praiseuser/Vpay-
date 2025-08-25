import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardRoutes from "./routes/Dashboard";
import PublicRoutes from "./routes/Public";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import theme from "./Theme/Theme";
import UserContextProvider from "./context/AuthContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor, clearPersistedState } from "./store/store";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const clearState = async () => {
      await clearPersistedState();
      console.log("Persisted state cleared");
    };
    clearState();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <CssBaseline />
            <UserContextProvider>
              <Routes>
                <Route path="/*" element={<PublicRoutes />} />
                <Route path="/dashboard/*" element={<DashboardRoutes />} /> 
              </Routes>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover
                draggable
                theme="light"
                closeButton={false}
                toastStyle={{
                  borderRadius: "8px",
                  padding: "12px 16px",
                  fontSize: "14px",
                  fontFamily: "Poppins, sans-serif",
                  color: "#fff",
                  boxShadow: "none",
                  backgroundColor: "transparent"
                }}
                bodyClassName={() => "flex items-center"}
              />
            </UserContextProvider>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;