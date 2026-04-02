import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import TaskInput from './components/TaskInput/TaskInput';
import TaskList from './components/TaskList/TaskList';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (error) {
        console.error('Error parsing tasks from localStorage', error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <main className="app-container glass">
      <Header 
        total={tasks.length} 
        completed={completedCount} 
      />
      <TaskInput onAddTask={addTask} />
      <TaskList 
        tasks={tasks} 
        onToggle={toggleTask} 
        onDelete={deleteTask} 
      />
    </main>
  );
};

export default App;
