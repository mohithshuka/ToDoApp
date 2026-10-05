/**
 * Date and Time Utilities
 * 
 * Helper functions for working with dates, deadlines, and time calculations.
 * All functions work with ISO 8601 date strings (as stored in Firestore).
 */

/**
 * Check if a date is in the past
 * 
 * @param dateString - ISO 8601 date string
 * @returns true if date is before current time
 */
export const isPast = (dateString: string): boolean => {
  const date = new Date(dateString);
  const now = new Date();
  return date < now;
};

/**
 * Check if a task deadline is overdue
 * 
 * A task is overdue if:
 * - It's not completed AND
 * - The deadline has passed
 * 
 * @param deadline - ISO 8601 date string
 * @param completed - Task completion status
 * @returns true if task is overdue
 */
export const isOverdue = (deadline: string, completed: boolean): boolean => {
  if (completed) {
    return false; // Completed tasks are never overdue
  }
  return isPast(deadline);
};

/**
 * Calculate hours remaining until a deadline
 * 
 * Returns negative number if deadline has passed.
 * 
 * @param deadline - ISO 8601 date string
 * @returns Hours remaining (negative if overdue)
 */
export const hoursUntilDeadline = (deadline: string): number => {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const millisRemaining = deadlineDate.getTime() - now.getTime();
  return millisRemaining / (1000 * 60 * 60); // Convert ms to hours
};

/**
 * Format a date string for display
 * 
 * @param dateString - ISO 8601 date string
 * @returns Formatted date (e.g., "Feb 20, 2026 at 10:30 AM")
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  
  const datePart = date.toLocaleDateString('en-US', dateOptions);
  const timePart = date.toLocaleTimeString('en-US', timeOptions);
  
  return `${datePart} at ${timePart}`;
};

/**
 * Format a date for short display (no time)
 * 
 * @param dateString - ISO 8601 date string
 * @returns Formatted date (e.g., "Feb 20, 2026")
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  
  return date.toLocaleDateString('en-US', options);
};

/**
 * Get a human-readable time remaining string
 * 
 * @param deadline - ISO 8601 date string
 * @returns Formatted string (e.g., "2 hours left", "3 days left", "Overdue")
 */
export const getTimeRemainingText = (deadline: string): string => {
  const hours = hoursUntilDeadline(deadline);
  
  if (hours < 0) {
    return 'Overdue';
  }
  
  if (hours < 1) {
    const minutes = Math.floor(hours * 60);
    return `${minutes} min${minutes !== 1 ? 's' : ''} left`;
  }
  
  if (hours < 24) {
    const roundedHours = Math.floor(hours);
    return `${roundedHours} hour${roundedHours !== 1 ? 's' : ''} left`;
  }
  
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} left`;
};
