import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

const apiUrl = 'https://localhost:7013/api/todo'; // ✅ correct port

  // Fetch all todos
  const fetchTodos = async () => {
    const response = await axios.get(apiUrl);
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const response = await axios.post(apiUrl, {
      title: newTodo,
      isCompleted: false
    });
    setTodos([...todos, response.data]);
    setNewTodo('');
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Toggle completion
  const toggleTodo = async (todo) => {
    const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
    await axios.put(`${apiUrl}/${todo.id}`, updatedTodo);
    setTodos(todos.map(t => (t.id === todo.id ? updatedTodo : t)));
  };

  return (
    <div className="container">
      <h2>📝 Todo App</h2>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo)}
              style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: '10px' }}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
