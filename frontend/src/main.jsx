import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {BrowserRouter} from "react-router-dom"
import { AuthProvider } from './context/AuthContext.jsx'
import { AdminAuthProvider } from './context/AdminAuthContext.jsx'
import { UserListProvider } from './context/UserListContext.jsx'
import { TaskProvider } from './context/TaskContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
    <AdminAuthProvider>
      <UserListProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </UserListProvider>
    </AdminAuthProvider>
  </AuthProvider>
  </BrowserRouter>,
)
