import { createContext, useEffect, useState } from "react";
import React from "react";
import { checkisAuthenticated, authLogin, authLogout, authSignUp } from "../api-communicators/communicators";
import Loader from "../Components/Loader";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = () =>
    checkisAuthenticated()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setIsLoading(false));

  const login = (credentials) =>
    authLogin(credentials)
      .then(() => setIsAuthenticated(true))
      .catch((error) => {
        alert(error.response?.data?.message || "Login failed");
        setIsAuthenticated(false);
      });

  const signUp = (credentials) =>
    authSignUp(credentials)
      .then(() => setIsAuthenticated(true))
      .catch((error) => {
        alert(error.response?.data?.message || "Sign-up failed");
        setIsAuthenticated(false);
      });

  const logout = () => {
    authLogout()
      .then(() => setIsAuthenticated(false))
      .catch((error) => alert(error.response?.data?.message || "Logout failed"));
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if(isLoading){
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
