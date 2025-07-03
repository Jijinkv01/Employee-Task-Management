import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/user/Register'
import Login from './pages/user/Login'
import Home from './pages/user/Home'
import PrivateRoute from './routes/PrivateRoute'

import LoginAdmin from './pages/admin/LoginAdmin'
import Dashboard from './pages/admin/Dashboard'
import AdminPrivateRoute from './routes/AdminPrivateRoute'


const App = () => {
  return (
    <Routes>
      {/* <Route path='/register' element={<PublicRoute> <Register /> </PublicRoute>}/> */}
      <Route path='/register' element={ <Register />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/' element={<PrivateRoute> <Home /> </PrivateRoute>}/>
      <Route path='/admin/login' element={ <LoginAdmin />}/>
      <Route path='/admin/dashboard' element={<AdminPrivateRoute> <Dashboard /> </AdminPrivateRoute> }/>
     
    </Routes>
  )
}

export default App