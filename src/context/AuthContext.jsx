import { useState, useEffect } from "react";
import { AuthContext, initializeUser } from "./auth";

export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initializeUser);

  // Initialize demo account on app load
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.length === 0) {
      const demoUsers = [{ email: "demo@example.com", password: "123456" }];
      localStorage.setItem("users", JSON.stringify(demoUsers));
    }
  }, []);

  const signup = (email, password) => {
    // Check if user already exists in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u) => u.email === email)) {
      throw new Error("User already exists");
    }

    // Store new user in users list
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Auto-login after signup
    const userData = { email, id: Date.now() };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    const userData = { email, id: Date.now() };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
