import { createContext, useContext } from "react";
import { useSelector } from "react-redux";

export const UserContext = createContext();

export const useAuth = () => {
  return useContext(UserContext);
};

export default function UserContextProvider({ children }) {
  const user = useSelector((state) => state.user.user);

  const isAuthenticated = !!user;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: user ? `Bearer ${user.token}` : "",
    },
  };

  const value = {
    isAuthenticated,
    config,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
