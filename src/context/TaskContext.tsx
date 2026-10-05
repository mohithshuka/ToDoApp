/**
 * Task Context
 * 
 * Provides task state and operations throughout the app.
 * Uses useReducer for predictable state management and Firestore for persistence.
 * 
 * Features:
 * - Real-time synchronization with Firestore
 * - CRUD operations (create, update, delete, toggle completion)
 * - Automatic subscription management (subscribes on login, unsubscribes on logout)
 * - Loading and error states
 * - Integration with AuthContext for user-scoped tasks
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { taskReducer, initialTaskState } from './taskReducer';
import { useAuth } from './AuthContext';
import {
  addTask as addTaskService,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
  toggleTaskCompletion as toggleTaskCompletionService,
  subscribeToUserTasks,
} from '../api/taskService';
import { TaskState, Task, CreateTaskPayload } from '../types';

/**
 * Task context value type
 * Includes state and all task operations
 */
interface TaskContextValue extends TaskState {
  addTask: (taskData: CreateTaskPayload) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  toggleTaskCompletion: (taskId: string, completed: boolean) => Promise<void>;
  refreshTasks: () => void;
}

/**
 * Create the context with undefined default
 * This forces consumers to use the Provider or get a runtime error
 */
const TaskContext = createContext<TaskContextValue | undefined>(undefined);

/**
 * TaskProvider Props
 */
interface TaskProviderProps {
  children: ReactNode;
}

/**
 * TaskProvider Component
 * 
 * Wraps the app (inside AuthProvider) to provide task management functionality.
 * Automatically subscribes to user's tasks when logged in.
 * Automatically unsubscribes when user logs out.
 */
export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const { user } = useAuth();

  /**
   * Real-time task subscription effect
   * 
   * Subscribes to Firestore updates when user is logged in.
   * Unsubscribes and clears tasks when user logs out.
   * Runs whenever user changes (login/logout).
   */
  useEffect(() => {
    if (!user) {
      // User logged out - clear tasks and reset state
      dispatch({ type: 'TASKS_LOADED', payload: [] });
      return;
    }

    // User logged in - subscribe to their tasks
    dispatch({ type: 'TASKS_LOADING' });

    const unsubscribe = subscribeToUserTasks(
      user.uid,
      (tasks) => {
        // Tasks updated - dispatch to reducer
        dispatch({ type: 'TASKS_LOADED', payload: tasks });
      },
      (error) => {
        // Subscription error
        console.error('Task subscription error:', error);
        dispatch({ type: 'TASKS_ERROR', payload: error.message });
      }
    );

    // Cleanup: unsubscribe when user logs out or component unmounts
    return () => {
      unsubscribe();
    };
  }, [user]);

  /**
   * Add a new task
   * 
   * Creates task in Firestore. The real-time subscription will automatically
   * update the local state when Firestore confirms the addition.
   * 
   * @param taskData - Task data without auto-generated fields
   * @throws Error if creation fails
   */
  const addTask = async (taskData: CreateTaskPayload): Promise<void> => {
    if (!user) {
      throw new Error('You must be logged in to add tasks');
    }

    try {
      // Add to Firestore (subscription will update state)
      const newTask = await addTaskService(taskData, user.uid);
      
      // Optimistic update (improves perceived performance)
      // Real-time listener will sync this shortly
      dispatch({ type: 'TASK_ADDED', payload: newTask });
    } catch (error: any) {
      dispatch({ type: 'TASKS_ERROR', payload: error.message });
      throw error; // Re-throw so UI can handle it
    }
  };

  /**
   * Update an existing task
   * 
   * Updates task in Firestore. The real-time subscription will automatically
   * update the local state when Firestore confirms the update.
   * 
   * @param taskId - ID of task to update
   * @param updates - Partial task data to update
   * @throws Error if update fails
   */
  const updateTask = async (
    taskId: string,
    updates: Partial<Task>
  ): Promise<void> => {
    if (!user) {
      throw new Error('You must be logged in to update tasks');
    }

    try {
      // Update in Firestore (subscription will update state)
      await updateTaskService(taskId, updates);
      
      // Optimistic update
      // Find the task and merge updates
      const existingTask = state.tasks.find((t) => t.id === taskId);
      if (existingTask) {
        const updatedTask = { ...existingTask, ...updates };
        dispatch({ type: 'TASK_UPDATED', payload: updatedTask });
      }
    } catch (error: any) {
      dispatch({ type: 'TASKS_ERROR', payload: error.message });
      throw error; // Re-throw so UI can handle it
    }
  };

  /**
   * Delete a task
   * 
   * Removes task from Firestore. The real-time subscription will automatically
   * update the local state when Firestore confirms the deletion.
   * 
   * @param taskId - ID of task to delete
   * @throws Error if deletion fails
   */
  const deleteTask = async (taskId: string): Promise<void> => {
    if (!user) {
      throw new Error('You must be logged in to delete tasks');
    }

    try {
      // Delete from Firestore (subscription will update state)
      await deleteTaskService(taskId);
      
      // Optimistic update
      dispatch({ type: 'TASK_DELETED', payload: taskId });
    } catch (error: any) {
      dispatch({ type: 'TASKS_ERROR', payload: error.message });
      throw error; // Re-throw so UI can handle it
    }
  };

  /**
   * Toggle task completion status
   * 
   * Convenience function to mark task as complete/incomplete.
   * 
   * @param taskId - ID of task to toggle
   * @param completed - New completion status
   * @throws Error if toggle fails
   */
  const toggleTaskCompletion = async (
    taskId: string,
    completed: boolean
  ): Promise<void> => {
    if (!user) {
      throw new Error('You must be logged in to update tasks');
    }

    try {
      // Update in Firestore
      await toggleTaskCompletionService(taskId, completed);
      
      // Optimistic update
      const existingTask = state.tasks.find((t) => t.id === taskId);
      if (existingTask) {
        const updatedTask = { ...existingTask, completed };
        dispatch({ type: 'TASK_UPDATED', payload: updatedTask });
      }
    } catch (error: any) {
      dispatch({ type: 'TASKS_ERROR', payload: error.message });
      throw error; // Re-throw so UI can handle it
    }
  };

  /**
   * Manually refresh tasks
   * 
   * Not typically needed (real-time sync handles this),
   * but useful for pull-to-refresh or error recovery.
   */
  const refreshTasks = (): void => {
    // The subscription automatically keeps tasks in sync
    // This function is a no-op but provided for API consistency
    // If needed, we could force a re-fetch here
  };

  // Context value includes state and operations
  const value: TaskContextValue = {
    ...state,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    refreshTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

/**
 * Custom hook to access task context
 * 
 * Usage: const { tasks, loading, addTask, deleteTask } = useTasks();
 * 
 * @throws Error if used outside of TaskProvider
 */
export const useTasks = (): TaskContextValue => {
  const context = useContext(TaskContext);
  
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  
  return context;
};
