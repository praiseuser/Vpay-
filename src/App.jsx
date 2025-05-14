import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from "./Theme/Theme";
import UserContextProvider from "./context/AuthContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor, clearPersistedState } from "./store/store"; 
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    clearPersistedState();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <CssBaseline />
            <UserContextProvider>
              <Router />
              <ToastContainer />
            </UserContextProvider>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;