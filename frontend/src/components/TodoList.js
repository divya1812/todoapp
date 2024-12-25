import React from 'react';
import axios from 'axios';

const TodoList = ({ todos, fetchTodos }) => {
  const handleDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}`);
    fetchTodos();
  };

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <span className="todo-text">{todo.description}</span>
          <button className="delete-button" onClick={() => handleDelete(todo.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;