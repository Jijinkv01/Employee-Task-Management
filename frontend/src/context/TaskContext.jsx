import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [task, setTask] = useState({ assignedTo: '', name: '', description: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('http://localhost:3000/admin/getEmployeeNames');
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const createTask = async () => {
    const res = await axios.post('http://localhost:3000/admin/createTask', task);
    alert(res.data.message);
    setTask({ assignedTo: '', name: '', description: '' });
  };

   return (
    <TaskContext.Provider value={{ users, task, setTask, createTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);