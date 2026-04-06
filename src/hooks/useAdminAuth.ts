import { useState, useCallback } from "react";

const VALID_USER = "syed";
const VALID_PASS = "@syed55886";
const SESSION_KEY = "sah-admin-auth";

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  });

  const login = useCallback((username: string, password: string): boolean => {
    if (username === VALID_USER && password === VALID_PASS) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout };
};
