import React, { useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const TodoContext = React.createContext();

export function useTodo() {
  return useContext(TodoContext);
}

export default function TodoProvider({ children }) {
  const { currentUser } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  function resetLoading() {
    setLoading(false);
  }

  async function getTodos() {
    setLoading(true);
    const res = await axios.get(
      "https://nnorbert09-todo.herokuapp.com/todos",
      {
        headers: {
          token: currentUser.token,
          username: currentUser.username,
        },
      },

      { withCredentials: true }
    );
    setTodos(res.data);
    setLoading(false);
  }

  async function createTodo(arg) {
    setLoading(true);
    await axios.post("https://nnorbert09-todo.herokuapp.com/todos", {
      title: arg.title,
      description: arg?.description,
      token: currentUser.token,
      createdBy: currentUser.username,
    });
    setLoading(false);
  }

  async function deleteTodo(arg) {
    setLoading(true);
    await axios.delete(
      `https://nnorbert09-todo.herokuapp.com/todos/${arg.id}`,
      {
        headers: {
          _id: arg.id,
          token: currentUser.token,
        },
      }
    );
    setLoading(false);
  }

  async function updateTodo(arg) {
    setLoading(true);
    await axios.put(`https://nnorbert09-todo.herokuapp.com/todos/${arg.id}`, {
      token: currentUser.token,
      _id: arg.id,
      title: arg?.title,
      description: arg?.description,
    });
    setLoading(false);
  }

  async function toggleTodo(arg) {
    setLoading(true);
    await axios.put(`https://nnorbert09-todo.herokuapp.com/todos/${arg.id}`, {
      _id: arg.id,
      completed: arg.completed,
      token: currentUser.token,
    });
    setLoading(false);
  }

  const value = {
    updateTodo,
    resetLoading,
    deleteTodo,
    createTodo,
    getTodos,
    toggleTodo,
    todos,
    loading,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
