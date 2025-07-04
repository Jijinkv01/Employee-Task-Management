import React from 'react'
import Navbar from '../../components/user/Navbar'
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = (id) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [commitMessage, setCommitMessage] = useState("");

  const userId = user?._id;
  console.log("userId hahahah", userId)

  useEffect(() => {
    if (!userId) return; // Don't fetch if user is not logged in

    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/getTasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(res.data.tasks);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };
    fetchTasks();
  }, [userId]);

  const handleCommitClick = (taskId) => {
    setSelectedTaskId(taskId);
    setIsModalOpen(true);
  };

  const handleSubmitCommit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`http://localhost:3000/commitTask/${selectedTaskId}`, {
        message: commitMessage
      }, {
        headers: {
          Authorization: `Bearer ${token}` // This goes in config (3rd param)
        }
      });

      const updatedTask = response.data.task;

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === selectedTaskId ? updatedTask : task
        )
      );

      setIsModalOpen(false);
      setCommitMessage("");
      setSelectedTaskId(null);
    } catch (error) {
      console.error("Error submitting commit", error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Assigned Task for You</h2>
        <table className="min-w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">SL No</th>
              <th className="p-2 border">Task Name</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Commit</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  You don’t have any tasks
                </td>
              </tr>
            ) : (
              tasks.map((task, idx) => (
                <tr key={task._id} className="text-center">
                  <td className="p-2 border">{idx + 1}</td>
                  <td className="p-2 border">{task.name}</td>
                  <td className="p-2 border">{task.description}</td>
                  <td className="p-2 border">{task.status}</td>
                  <td className="p-2 border">
                    {task.status === "Finished" ? (
                      <span className="text-green-600 font-semibold">Approved by Admin</span>
                    ) : (
                      <>
                        {task.isCommited ? (
                          <span className="text-yellow-600 font-semibold">In Progress</span>
                        ) : (
                          <button
                            onClick={() => handleCommitClick(task._id)}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                          >
                            Commit
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-80">
              <h3 className="text-lg font-semibold mb-4">Enter Commit Message</h3>
              <input
                type="text"
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                className="w-full border px-3 py-2 mb-4 rounded"
                placeholder="Commit message"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitCommit}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home