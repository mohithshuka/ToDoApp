/**
 * Task Sorting and Filtering Utilities
 * 
 * Implements the smart sorting algorithm that combines:
 * - Priority weight (high > medium > low)
 * - Urgency based on time remaining until deadline
 * - Overdue status (highest priority)
 * 
 * This scoring system ensures the most important and time-sensitive tasks
 * appear at the top of the list, helping users focus on what matters most.
 */

import { Task, Priority, TaskFilter } from '../types';
import { hoursUntilDeadline } from './dateUtils';

/**
 * Priority weight map
 * 
 * Higher numbers = higher priority in sorting.
 * These weights are balanced to make priority impactful but not override urgency.
 */
const PRIORITY_WEIGHTS: Record<Priority, number> = {
  [Priority.HIGH]: 100,
  [Priority.MEDIUM]: 50,
  [Priority.LOW]: 10,
};

/**
 * Calculate a task's sort score
 * 
 * Algorithm:
 * 1. Start with priority weight (10-100)
 * 2. Add urgency score based on time remaining:
 *    - Overdue: +1000 (always sorts to top)
 *    - < 24 hours: +500
 *    - < 48 hours: +200
 *    - < 7 days: +50
 * 3. Subtract hours until deadline (earlier deadlines score higher)
 * 
 * Result: Higher score = more important = appears first in list
 * 
 * @param task - Task to score
 * @returns Numeric score (higher = more important)
 * 
 * Example scores:
 * - High priority, overdue: ~1100
 * - High priority, due in 1 hour: ~599
 * - Medium priority, due in 2 days: ~202
 * - Low priority, due in 1 week: ~60
 */
export const calculateTaskScore = (task: Task): number => {
  // Skip completed tasks - they'll be filtered or sorted to bottom
  if (task.completed) {
    return -1000; // Very low score
  }
  
  // Start with priority weight
  let score = PRIORITY_WEIGHTS[task.priority];
  
  // Calculate hours until deadline
  const hoursRemaining = hoursUntilDeadline(task.deadline);
  
  // Add urgency bonuses
  if (hoursRemaining < 0) {
    // Overdue - highest urgency
    score += 1000;
  } else if (hoursRemaining < 24) {
    // Due within 24 hours
    score += 500;
  } else if (hoursRemaining < 48) {
    // Due within 48 hours
    score += 200;
  } else if (hoursRemaining < 168) {
    // Due within 7 days (168 hours)
    score += 50;
  }
  
  // Subtract hours remaining (earlier deadlines score higher)
  // Capped to prevent distant deadlines from going negative
  score -= Math.min(hoursRemaining, 1000);
  
  return score;
};

/**
 * Sort tasks by smart scoring algorithm
 * 
 * Tasks are sorted by:
 * 1. Completion status (incomplete first)
 * 2. Score (higher first)
 * 3. Deadline (earlier first, as tiebreaker)
 * 
 * Pure function - does not mutate input array.
 * 
 * @param tasks - Array of tasks to sort
 * @returns New sorted array
 * 
 * Example usage:
 * ```ts
 * const sortedTasks = sortTasksByPriority(tasks);
 * ```
 */
export const sortTasksByPriority = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    // Completed tasks always go to bottom
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    
    // Sort by score (higher first)
    const scoreA = calculateTaskScore(a);
    const scoreB = calculateTaskScore(b);
    
    if (scoreA !== scoreB) {
      return scoreB - scoreA; // Descending order (higher score first)
    }
    
    // Tiebreaker: earlier deadline first
    const deadlineA = new Date(a.deadline).getTime();
    const deadlineB = new Date(b.deadline).getTime();
    return deadlineA - deadlineB;
  });
};

/**
 * Filter tasks by completion status
 * 
 * @param tasks - Array of tasks to filter
 * @param filter - Filter type ('all' | 'active' | 'completed')
 * @returns Filtered array
 * 
 * Example usage:
 * ```ts
 * const activeTasks = filterTasks(tasks, 'active');
 * ```
 */
export const filterTasks = (tasks: Task[], filter: TaskFilter): Task[] => {
  switch (filter) {
    case 'active':
      return tasks.filter((task) => !task.completed);
    case 'completed':
      return tasks.filter((task) => task.completed);
    case 'all':
    default:
      return tasks;
  }
};

/**
 * Sort and filter tasks in one operation
 * 
 * Applies filter first, then sorts the result.
 * This is the main function used by TaskListScreen.
 * 
 * @param tasks - Array of tasks
 * @param filter - Filter type
 * @returns Filtered and sorted array
 * 
 * Example usage:
 * ```ts
 * const displayTasks = sortAndFilterTasks(tasks, 'active');
 * ```
 */
export const sortAndFilterTasks = (
  tasks: Task[],
  filter: TaskFilter
): Task[] => {
  const filtered = filterTasks(tasks, filter);
  return sortTasksByPriority(filtered);
};

/**
 * Get task counts by completion status
 * 
 * Useful for displaying filter badges and statistics.
 * 
 * @param tasks - Array of tasks
 * @returns Object with counts
 * 
 * Example usage:
 * ```ts
 * const counts = getTaskCounts(tasks);
 * // { all: 10, active: 7, completed: 3 }
 * ```
 */
export const getTaskCounts = (
  tasks: Task[]
): Record<TaskFilter, number> => {
  return {
    all: tasks.length,
    active: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
  };
};
