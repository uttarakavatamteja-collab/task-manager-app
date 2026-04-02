import React, { useState } from 'react';
import styles from './TaskItem.module.css';
import { Trash2, CheckCircle, Circle, Edit2, Check, X, Calendar, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleEdit = () => {
    if (editedTitle.trim() && editedTitle !== task.title) {
      onEdit(task.id, { title: editedTitle });
    }
    setIsEditing(false);
  };

  const priorityColors = {
    High: '#ef4444',
    Medium: '#f59e0b',
    Low: '#22c55e'
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`${styles.item} ${task.completed ? styles.completed : ''}`}
    >
      <button 
        className={styles.checkButton} 
        onClick={() => onToggle(task.id)}
      >
        {task.completed ? (
          <CheckCircle className={styles.checkedIcon} />
        ) : (
          <Circle className={styles.uncheckedIcon} />
        )}
      </button>
      
      <div className={styles.content}>
        {isEditing ? (
          <div className={styles.editWrapper}>
            <input 
              type="text" 
              className={styles.editInput}
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
            />
            <div className={styles.editActions}>
              <button onClick={handleEdit} className={styles.saveBtn}><Check size={16} /></button>
              <button onClick={() => setIsEditing(false)} className={styles.cancelBtn}><X size={16} /></button>
            </div>
          </div>
        ) : (
          <>
            <span className={styles.title}>{task.title}</span>
            <div className={styles.meta}>
              <span className={styles.priority} style={{ color: priorityColors[task.priority] }}>
                <Flag size={12} /> {task.priority}
              </span>
              {task.dueDate && (
                <span className={styles.dueDate}>
                  <Calendar size={12} /> {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </>
        )}
      </div>
      
      <div className={styles.actions}>
        {!isEditing && (
          <button 
            className={styles.actionBtn} 
            onClick={() => setIsEditing(true)}
            aria-label="Edit task"
          >
            <Edit2 size={16} />
          </button>
        )}
        <button 
          className={styles.deleteBtn} 
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskItem;
