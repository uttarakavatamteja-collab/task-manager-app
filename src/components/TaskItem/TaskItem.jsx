import React from 'react';
import styles from './TaskItem.module.css';
import { Trash2, CheckCircle, Circle } from 'lucide-react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`${styles.item} ${task.completed ? styles.completed : ''}`}>
      <button 
        className={styles.checkButton} 
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? "Mark as pending" : "Mark as completed"}
      >
        {task.completed ? (
          <CheckCircle className={styles.checkedIcon} />
        ) : (
          <Circle className={styles.uncheckedIcon} />
        )}
      </button>
      
      <span className={styles.title}>{task.title}</span>
      
      <button 
        className={styles.deleteButton} 
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default TaskItem;
