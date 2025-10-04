import { createContext, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storeUser, logoutUser } from "../store/Slices/userSlice";

export const UserContext = createContext();

export const useAuth = () => {
  return useContext(UserContext);
};

export default function UserContextProvider({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // user object
  const token = useSelector((state) => state.user.token);

  const isAuthenticated = !!user;

  const login = (userData) => {
    dispatch(storeUser({ user: userData.user, token: userData.token }));
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  const value = {
    isAuthenticated,
    user,       // ✅ include user here
    login,
    logout,
    config,
  };

  console.log("UserContext value:", value); // debug

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
