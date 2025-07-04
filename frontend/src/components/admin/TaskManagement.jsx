import React from 'react'
import { useTask } from '../../context/TaskContext';
import { useState,useEffect } from 'react';

const TaskManagement = () => {
    const { users, task, setTask, createTask, fetchTasks, tasks, loading, error, deleteTask  } = useTask();

   const [isModalOpen, setIsModalOpen] = useState(false)

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createTask()
    setIsModalOpen(false)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Task Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white text-xl rounded-lg px-4 py-2 hover:bg-green-700 font-semibold"
        >
          Assign New Task
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Assign New Task</h2>

            <form onSubmit={handleSubmit}>
              <label className="block mb-2">Select Employee</label>
              <select
                name="assignedTo"
                value={task.assignedTo}
                onChange={handleChange}
                className="w-full px-4 py-2 mb-4 bg-gray-700 rounded text-white"
                required
              >
                <option value="">-- Select Employee --</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username} ({user.email})
                  </option>
                ))}
              </select>

              <label className="block mb-2">Task Name</label>
              <input
                type="text"
                name="name"
                value={task.name}
                onChange={handleChange}
                className="w-full px-4 py-2 mb-4 rounded bg-gray-700 text-white"
                required
              />

              <label className="block mb-2">Description</label>
              <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                className="w-full px-4 py-2 mb-4 rounded bg-gray-700 text-white"
                required
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
                >
                  Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="mt-10">
  <h2 className="text-2xl font-bold mb-6">Recently Added Tasks</h2>

  {loading ? (
    <p className="text-gray-400">Loading tasks...</p>
  ) : error ? (
    <p className="text-red-400">{error}</p>
  ) : tasks.length === 0 ? (
    <p className="text-gray-400">No tasks available.</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead>
          <tr className="text-left border-b border-gray-700">
            <th className="px-4 py-3">Sl. No</th>
            <th className="px-4 py-3">Task Name</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Assigned To</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr
              key={task._id}
              className="border-t border-gray-700 hover:bg-gray-700 transition"
            >
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">{task.name}</td>
              <td className="px-4 py-3">{task.description}</td>
              <td className="px-4 py-3">{task.assignedTo?.username || 'Unknown'}</td>
              <td className={`px-4 py-3 font-semibold ${task.status?.toLowerCase() === 'finished' ? 'text-green-500' : 'text-red-500'}`}>
                {task.status || 'Pending'}
              </td>
              <td className='pl-4'>
                <button  onClick={()=>{
                  const confirmDelete = window.confirm("Are you sure you want to delete this task?");
                  if (confirmDelete) {
                  deleteTask(task._id);}
                }} className='bg-red-500 rounded-lg px-2 cursor-pointer'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
    </div>
  )
}

export default TaskManagement