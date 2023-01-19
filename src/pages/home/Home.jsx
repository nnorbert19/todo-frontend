import { useTodo } from "../../context/TodoContext";
import { Form, Button, Alert, Card } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./home.css";

function index() {
  const {
    todos,
    getTodos,
    createTodo,
    toggleTodo,
    deleteTodo,
    loading,
    resetLoading,
    updateTodo,
  } = useTodo();
  const todoRef = useRef();
  const descriptionRef = useRef();
  const editTodoRef = useRef();
  const editDescriptionRef = useRef();
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState();
  const [edit_Id, setEdit_Id] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function fetchTodos(e) {
    try {
      await getTodos();
    } catch (error) {
      setError(error.response.data.message);
      resetLoading();
    }
  }

  async function checkTodo(id, completed) {
    try {
      await toggleTodo({
        id: id,
        completed: !completed,
      });
      await getTodos();
    } catch (error) {
      setError(error.response.data.message);
      resetLoading();
    }
  }

  async function addTodo(e) {
    e.preventDefault();
    var request;
    if (todoRef.current.value === "") return;
    if (descriptionRef.current.value === "") {
      request = { title: todoRef.current.value };
    } else {
      request = {
        title: todoRef.current.value,
        description: descriptionRef.current.value,
      };
    }
    try {
      await createTodo(request);
      handleClose();
      descriptionRef.current.value = "";
      todoRef.current.value = "";
      await getTodos();
    } catch (error) {
      setError(error.response.data.message);
      resetLoading();
    }
  }

  async function modifyTodo(e) {
    e.preventDefault();
    if (
      editTodoRef.current.value === "" &&
      editDescriptionRef.current.value === ""
    ) {
      return;
    }
    const request = {
      title: editTodoRef.current.value,
      description: editDescriptionRef.current.value,
      id: edit_Id,
    };
    try {
      await updateTodo(request);
      setEditId(null);
      editDescriptionRef.current.value = "";
      editTodoRef.current.value = "";
      await getTodos();
    } catch (error) {
      setError(error.response.data.message);
      resetLoading();
    }
  }

  async function deleteSelectedTodo(id) {
    try {
      await deleteTodo({
        id: id,
      });
      await getTodos();
    } catch (error) {
      setError(error.response.data.message);
      resetLoading;
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <Card className="p-3 d-flex align-items-center todo-card">
        {error && (
          <Card.Header>
            <Alert variant="danger">{error}</Alert>
          </Card.Header>
        )}
        <div className="todo-lister">
          {todos?.map((todo, index) => (
            <div
              key={index}
              className="d-flex align-items-center justify-content-between todo-items m-1 p-1"
            >
              <input
                checked={todo.completed}
                onChange={() => checkTodo(todo._id, todo.completed)}
                type="checkbox"
                className="checkbox m-2"
              />

              {todo.description !== "" ? (
                <>
                  {editId === index ? (
                    <>
                      <Form onSubmit={modifyTodo}>
                        <Form.Control
                          type="text"
                          ref={editTodoRef}
                          placeholder={todo.title}
                        />
                        <Form.Control
                          type="text"
                          ref={editDescriptionRef}
                          placeholder={todo.description}
                        />
                        <div className="d-flex w-100 align-items-center justify-content-center pt-1">
                          <Button type="submit" disabled={loading}>
                            Módosítás
                          </Button>
                        </div>
                      </Form>
                    </>
                  ) : (
                    <details className="d-flex justify-content-center">
                      <summary className="text-center summary">
                        {todo.title}
                      </summary>
                      <div className="p-2 px-4">{todo.description}</div>
                    </details>
                  )}
                </>
              ) : (
                <>
                  {editId === index ? (
                    <>
                      <Form onSubmit={modifyTodo}>
                        <Form.Control
                          type="text"
                          ref={editTodoRef}
                          placeholder={todo.title}
                        />
                        <Form.Control
                          type="text"
                          ref={editDescriptionRef}
                          placeholder={todo.description}
                        />
                        <div className="d-flex w-100 align-items-center justify-content-center pt-1">
                          <Button type="submit" disabled={loading}>
                            Módosítás
                          </Button>
                        </div>
                      </Form>
                    </>
                  ) : (
                    <div>{todo.title}</div>
                  )}
                </>
              )}
              <div className="todo-utility m-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-fill me-2"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    if (editId === null) {
                      setEditId(index), setEdit_Id(todo._id);
                    } else setEditId(null);
                  }}
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                  onClick={() => deleteSelectedTodo(todo._id)}
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        <Button
          className="new-todo-button"
          disabled={loading}
          onClick={() => handleShow()}
        >
          Új teendő hozzáadása
        </Button>
      </Card>
      <Modal size="md" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Teendő hozzáadása</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addTodo}>
            <Form.Label>Teendő</Form.Label>
            <Form.Control
              type="text"
              ref={todoRef}
              placeholder="cím"
              required
            />
            <Form.Label>Leírás</Form.Label>
            <Form.Control
              type="text"
              ref={descriptionRef}
              placeholder="leírás"
            />
            <div className="d-flex w-100 align-items-center justify-content-center pt-3">
              <Button type="submit" disabled={loading}>
                Hozzáadás
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default index;
