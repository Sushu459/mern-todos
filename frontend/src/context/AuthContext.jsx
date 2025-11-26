import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosInstance";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("protask_user")) || null
  );
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("protask_token", res.data.token);
      localStorage.setItem("protask_user", JSON.stringify(res.data));
      setUser(res.data);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/register", { name, email, password });
      localStorage.setItem("protask_token", res.data.token);
      localStorage.setItem("protask_user", JSON.stringify(res.data));
      setUser(res.data);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("protask_token");
    localStorage.removeItem("protask_user");
    setUser(null);
  };

  const value = { user, loading, login, register, logout, setUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
