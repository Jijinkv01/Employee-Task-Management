import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const UserListContext = createContext()

export const UserListProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)



  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await axios.get(`http://localhost:3000/admin/getAllUsers?page=${page}&search=${search}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(res.data.users)
      setTotalPages(res.data.totalPages)
    } catch (err) {
      console.error("Error fetching users:", err)
    }
  }

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("adminToken")
      await axios.delete(`http://localhost:3000/admin/deleteUser/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchUsers()
    } catch (err) {
      console.error("Delete failed:", err)
    }
  }

  const editUser = async (id, username) => {
  try {
    const token = localStorage.getItem("adminToken")
    const res = await axios.put(`http://localhost:3000/admin/updateUser/${id}`, { username }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    alert(res.data.message)

    fetchUsers()
  } catch (error) {
    console.error("Error updating user:", error)
  }
}

const createUser = async(email,username,password)=>{
  try {
    const token = localStorage.getItem("adminToken");
    const res = await axios.post("http://localhost:3000/admin/createUser", {email, username, password }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    alert(res.data.message)
    fetchUsers()
  } catch (error) {
    console.error("Create user error:", error);
    alert(error.response?.data?.message || "Error creating user");
    fetchUsers();
  }
}

  useEffect(() => {
    fetchUsers()
  }, [page, search])

  return (
    <UserListContext.Provider value={{
      users,
      fetchUsers,
      editUser,
      createUser,
      deleteUser,
      search, setSearch,
      page, setPage,
      totalPages
    }}>
      {children}
    </UserListContext.Provider>
  )
}

export const useUserList = () => useContext(UserListContext)
