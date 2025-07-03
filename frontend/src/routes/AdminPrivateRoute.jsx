import { Navigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'

const AdminPrivateRoute = ({ children }) => {
  const { admin } = useAdminAuth()

  if (!admin) {
    // Not logged in, redirect to admin login
    return <Navigate to="/admin/login" replace />
  }

  // If logged in, show the component
  return children
}

export default AdminPrivateRoute
