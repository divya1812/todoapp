import React, { useState } from 'react';
import axios from 'axios';

const AddTodo = ({ fetchTodos }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description) return;

    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/todos`, { description });
    fetchTodos();
    setDescription('');
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-todo-input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a todo"
      />
      <button type="submit" className="add-todo-button">Add</button>
    </form>
  );
};

export default AddTodo;