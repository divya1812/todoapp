import React from 'react';
import axios from 'axios';

const TodoList = ({ todos, fetchTodos }) => {
  const handleDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}`);
    fetchTodos();
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.description}
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
