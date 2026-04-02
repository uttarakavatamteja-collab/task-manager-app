import React, { useState } from 'react';
import styles from './TaskInput.module.css';
import { Plus, Calendar, Flag } from 'lucide-react';

const TaskInput = ({ onAddTask }) => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      onAddTask({ title: task, priority, dueDate });
      setTask('');
      setPriority('Low');
      setDueDate('');
      setIsExpanded(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder="Add a new task..."
          value={task}
          onFocus={() => setIsExpanded(true)}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit" className={styles.addButton} disabled={!task.trim()}>
          <Plus size={20} />
        </button>
      </div>
      
      {isExpanded && (
        <div className={styles.optionsArea}>
          <div className={styles.optionGroup}>
            <Flag size={14} className={styles.optionIcon} />
            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
              className={styles.select}
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
          </div>
          
          <div className={styles.optionGroup}>
            <Calendar size={14} className={styles.optionIcon} />
            <input 
              type="date" 
              className={styles.dateInput}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default TaskInput;
