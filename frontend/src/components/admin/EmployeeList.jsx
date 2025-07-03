import React from 'react'
import { useState } from 'react'
import { useUserList } from '../../context/UserListContext'

const EmployeeList = () => {
  const { users, deleteUser, editUser, createUser, fetchUsers, search, setSearch, page, setPage, totalPages } = useUserList()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editedUsername, setEditedUsername] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");


  const handleCreateUser = () => {
    if (!newEmail || !newUsername || !newPassword) {
      alert("All fields are required");
      return;
    }
    createUser(newEmail, newUsername, newPassword);
    setIsCreateModalOpen(false);
    setNewEmail("");
    setNewUsername("");
    setNewPassword("");
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUser(id)
    }
  }

  const handleEdit = (user) => {
    setSelectedUser(user)
    setEditedUsername(user.username)
    setIsModalOpen(true)
  }
  const handleSave = () => {
    if (selectedUser && editedUsername.trim()) {
      editUser(selectedUser._id, editedUsername)
      setIsModalOpen(false)
    }
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditedUsername("")
    setSelectedUser(null)
  }

  fetchUsers()


  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Employee Management</h2>
        <div>
          <button onClick={()=>setIsCreateModalOpen(true)} className='bg-green-600 text-white text-xl rounded-lg p-1 cursor-pointer hover:bg-green-800 font-bold'>Create New Employee</button>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          placeholder="Search by name/email..."
          className="px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
        />
      </div>

      {isCreateModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Create New Employee</h2>

      <label className="block mb-2">Email</label>
      <input
        type="email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded bg-gray-700 text-white"
      />

      <label className="block mb-2">Username</label>
      <input
        type="text"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded bg-gray-700 text-white"
      />

      <label className="block mb-2">Password</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded bg-gray-700 text-white"
      />

      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setIsCreateModalOpen(false)}
          className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={handleCreateUser}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          Create
        </button>
      </div>
    </div>
  </div>
)}

      <table className="w-full text-left bg-gray-800 rounded-lg">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-3">Sl.no</th>
            <th className="p-3">Employee Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-400">No employees found.</td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user._id} className="border-t border-gray-700 hover:bg-gray-700">
                <td className="p-3">{(page - 1) * 5 + index + 1}</td>
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 space-x-2">
                  <button onClick={() => handleEdit(user)} className="bg-yellow-500 px-3 py-1 rounded text-black hover:bg-yellow-600">Edit</button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
          className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">{page} / {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(prev => prev + 1)}
          className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Employe</h2>
            <label className="block mb-2">Employe Name</label>
            <input
              type="text"
              value={editedUsername}
              onChange={(e) => setEditedUsername(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded bg-gray-700 text-white"
            />
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={selectedUser.email}
              disabled
              className="w-full px-4 py-2 mb-4 rounded bg-gray-700 text-white opacity-50 cursor-not-allowed"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployeeList