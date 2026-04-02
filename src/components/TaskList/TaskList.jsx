import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import styles from './TaskList.module.css';
import { ClipboardList } from 'lucide-react';

const TaskList = ({ tasks, onToggle, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <ClipboardList size={48} className={styles.emptyIcon} />
        <p>No tasks yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default TaskList;
