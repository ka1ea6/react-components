import { useState, useEffect } from 'react';

// Define the task data interface
export interface TaskData {
  id: number;
  name: string;
  description: string;
  status: 'backlog' | 'todo' | 'inProgress' | 'done' | 'cancelled';
  dateLogged: string;
  project?: {
    id: number;
    name: string;
  };
}

/**
 * Hook to fetch task data from Payload CMS with background polling
 * @param taskId The ID of the task to fetch
 * @param polling Whether to poll for updates (default: false)
 * @param system The system to use for fetching the task (default: 'payload')
 * @returns The task data and loading state
 */
interface UseTaskParams {
  taskId: number | null;
  polling?: boolean;
  system?: string;
}

export function useTask({ taskId, polling = true, system = 'payload' }: UseTaskParams) {
  const [task, setTask] = useState<TaskData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Function to fetch task data with visible loading state
  const fetchTask = async (showLoading = true) => {
    if (!taskId) return;
    
    if (showLoading) {
      setLoading(true);
    }
    
    try {
      // Fetch task data from Payload CMS
      const response = await fetch(`/api/tasks/${taskId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch task: ${response.statusText}`);
      }
      
      const data = await response.json();
      setTask(data);
    } catch (err) {
      console.error('Error fetching task:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  const pollTask = () => fetchTask(false);

  useEffect(() => {
    // Initial fetch with loading indicator
    if (taskId) {
      fetchTask(true);
    }
    
    // Set up polling if enabled
    let intervalId: NodeJS.Timeout | null = null;
    
    if (taskId && polling) {
      // Poll every 5 seconds without showing loading state
      intervalId = setInterval(pollTask, 5000);
    }
    
    // Cleanup function
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [taskId, polling]);

  return { task, loading, error };
}