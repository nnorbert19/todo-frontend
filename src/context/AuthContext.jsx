import React, { useContext, useState } from "react";

import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function login(arg) {
    setLoading(true);
    const res = await axios.post(
      "https://nnorbert09-todo.herokuapp.com/auth/login",
      {
        username: arg.username,
        password: arg.password,
      },
      { withCredentials: true },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    console.log(res.data);
    setCurrentUser(res.data);
    console.log(currentUser);
    setLoading(false);
  }

  async function logout() {
    const res = await axios.post(
      "https://nnorbert09-todo.herokuapp.com/auth/logout",
      {
        headers: {
          access_token: "Bearer " + currentUser.token,
        },
      }
    );
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
    console.log(res);
    setCurrentUser(res.data);
    setLoading(false);
  }

  const value = {
    register,
    login,
    logout,
    currentUser,
    error,
    loading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
