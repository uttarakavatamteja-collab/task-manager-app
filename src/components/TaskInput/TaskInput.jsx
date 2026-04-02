import React, { useState } from 'react';
import styles from './TaskInput.module.css';
import { Plus } from 'lucide-react';

const TaskInput = ({ onAddTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      onAddTask(task);
      setTask('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit" className={styles.addButton} disabled={!task.trim()}>
        <Plus size={20} />
      </button>
    </form>
  );
};

export default TaskInput;
