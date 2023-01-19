import React, { useContext, useState } from "react";

import axios from "axios";
import Loading from "../utility/Loading";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  axios.defaults.withCredentials = true;
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function login(arg) {
    setLoading(true);
    const res = await axios.post(
      "https://nnorbert09-todo.herokuapp.com/auth/login",
      {
        username: arg.username,
        password: arg.password,
      }
    );
    setCurrentUser(res.data);
    setLoading(false);
  }

  async function logout() {
    await axios.post("https://nnorbert09-todo.herokuapp.com/auth/logout", {
      token: currentUser.token,
      username: currentUser.username,
    });
    setCurrentUser(null);
  }

  async function register(arg) {
    setLoading(true);
    const res = await axios.post(
      "https://nnorbert09-todo.herokuapp.com/auth/register",
      {
        username: arg.username,
        email: arg.email,
        password: arg.password,
      },
      { withCredentials: true }
    );
    setCurrentUser(res.data);
    setLoading(false);
  }

  const value = {
    register,
    login,
    logout,
    currentUser,
    loading,
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
      {loading && <Loading />}
    </AuthContext.Provider>
  );
}
