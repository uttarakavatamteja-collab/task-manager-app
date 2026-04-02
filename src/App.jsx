import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header/Header';
import TaskInput from './components/TaskInput/TaskInput';
import TaskList from './components/TaskList/TaskList';
import Filters from './components/Filters/Filters';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        // Migration to new structure if needed
        return parsed.map(t => ({
          ...t,
          priority: t.priority || 'Low',
          dueDate: t.dueDate || '',
        }));
      } catch (error) {
        console.error('Error parsing tasks', error);
        return [];
      }
    }
    return [];
  });

  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = ({ title, priority, dueDate }) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      priority,
      dueDate,
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

  const editTask = (id, updates) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        if (filter === 'Pending') return !task.completed;
        if (filter === 'Completed') return task.completed;
        return true;
      })
      .filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        // Sort by priority first: High > Medium > Low
        const priorityScore = { High: 3, Medium: 2, Low: 1 };
        if (priorityScore[b.priority] !== priorityScore[a.priority]) {
          return priorityScore[b.priority] - priorityScore[a.priority];
        }
        // Then by date
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [tasks, filter, searchQuery]);

  const totalCount = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <main className="app-container glass">
      <Header 
        total={totalCount} 
        completed={completedCount} 
      />
      <TaskInput onAddTask={addTask} />
      
      <Filters 
        activeFilter={filter} 
        onFilterChange={setFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <TaskList 
        tasks={filteredTasks} 
        onToggle={toggleTask} 
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </main>
  );
};

export default App;
