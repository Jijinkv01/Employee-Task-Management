import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [task, setTask] = useState({ assignedTo: '', name: '', description: '' });

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("adminToken")
      const res = await axios.get('http://localhost:3000/admin/getEmployeeNames',{
        headers: {
    Authorization: `Bearer ${token}`, 
  },
      });
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const createTask = async () => {
    const token = localStorage.getItem("adminToken")
    const res = await axios.post('http://localhost:3000/admin/createTask', task, {
      headers: {
    Authorization: `Bearer ${token}`, 
  },
    });
    alert(res.data.message);  
    fetchTasks()
    setTask({ assignedTo: '', name: '', description: '' });
  };

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await axios.get('http://localhost:3000/admin/fetchTasks',{
        headers: {
    Authorization: `Bearer ${token}`, 
  },
      })
      setTasks(res.data.tasks)
    } catch (error) {
      console.error(error)
      setError('Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  const deleteTask = async(id)=>{
    try {
       const token = localStorage.getItem("adminToken");
    const res = await axios.delete(`http://localhost:3000/admin/deleteTask/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert(res.data.message);
    fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    setError("Failed to delete task");
    }
  }
   return (
    <TaskContext.Provider value={{ users, task, setTask, createTask, fetchTasks, tasks, loading, error, deleteTask  }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);