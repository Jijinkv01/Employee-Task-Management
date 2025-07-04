import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ViewTasks = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [finishedCount, setFinishedCount] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem('adminToken')
        const userRes = await axios.get(`http://localhost:3000/admin/userRes/${id}`,{
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userRes.data.user);

        const taskRes = await axios.get(`http://localhost:3000/admin/taskRes/${id}`,{
          headers: { Authorization: `Bearer ${token}` }
        });
        const allTasks = taskRes.data.tasks;

        setPendingTasks(allTasks.filter(task => task.status === 'Pending'));

        setFinishedCount(allTasks.filter(task => task.status === 'Finished').length);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetails();
  }, [id]);

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading user details...
      </div>
    );
  }

  const handleViewCommitMessage = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };


  const handleApproveReject = async (taskId, status) => {
  try {
    const token = localStorage.getItem('adminToken')
    const res = await axios.patch(`http://localhost:3000/admin/updateTaskStatus/${taskId}`, {
      approvalStatus: status,
    },{
      headers: { Authorization: `Bearer ${token}` }
    });
     const updatedTask = res.data.task;

    // Update pendingTasks in frontend state
    setPendingTasks((prevTasks) =>
      prevTasks
        .map((task) => (task._id === taskId ? updatedTask : task))
        .filter((task) => task.status === "Pending")
    );
    if (status === "Approved") {
      setFinishedCount((prev) => prev + 1);
    }

    setIsModalOpen(false);
    setSelectedTask(null);
  } catch (err) {
    console.error("Error updating task status:", err);
  }
};



  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-200 ">
      <h1 className="text-3xl font-bold text-gray-800 flex justify-center">Task Details</h1>
      <p className="text-3xl text-blue-600 font-bold">{user.username}</p>
      <p className="text-gray-500">{user.email}</p>

      <h2 className="text-xl font-semibold mt-6 text-gray-700 mb-4">Pending Tasks</h2>
      <ul className="space-y-4">
        {pendingTasks.length > 0 ? (
          pendingTasks.map((task, idx) => (
            <li key={idx} className="p-4 bg-yellow-100 rounded shadow flex justify-between items-center">
              <div>
                <h3 className="font-bold">{task.name}</h3>
                <p>{task.description}</p>
              </div>

              {task.isCommited && (
                <button
                  onClick={() => handleViewCommitMessage(task)}
                  className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                >
                  Message
                </button>
              )}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No pending tasks 🎉</p>
        )}
      </ul>
      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Commit Message</h3>
            <p className="mb-6 text-gray-800">{selectedTask.commitMessage}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleApproveReject(selectedTask._id, "Approved")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleApproveReject(selectedTask._id, "Rejected")}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Reject
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 text-center mt-8">
        <div className="bg-green-100 p-4 rounded-xl shadow">
          <p className="text-4xl font-bold text-green-700">{finishedCount}</p>
          <p className="text-gray-600">Finished Tasks</p>
        </div>
        <div className="bg-red-100 p-4 rounded-xl shadow">
          <p className="text-4xl font-bold text-red-700">{pendingTasks.length}</p>
          <p className="text-gray-600">Pending Tasks</p>
        </div>
      </div>
    </div>

  )
}

export default ViewTasks