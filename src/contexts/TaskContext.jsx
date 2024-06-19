import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTask = async (task) => {
    try {
      const response = await axios.post(API_URL, task);
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError(err);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedTask);
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (err) {
      setError(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    console.log("useEffect");
    fetchTasks();
  }, [fetchTasks]);

  return (
    <TaskContext.Provider
      value={{
        error,
        tasks,
        fetchTasks,
        isLoading,
        updateTask,
        deleteTask,
        createTask,
        setIsLoading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);

  if (context === undefined || !context) {
    throw new Error("Task Context was used outside Task Provider.");
  }

  return context;
};
