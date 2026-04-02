import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import styles from './TaskList.module.css';
import { ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.emptyState}
      >
        <ClipboardList size={48} className={styles.emptyIcon} />
        <p>No tasks found. Try adjusting your filters or search.</p>
      </motion.div>
    );
  }

  return (
    <div className={styles.list}>
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onToggle={onToggle} 
            onDelete={onDelete} 
            onEdit={onEdit}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
