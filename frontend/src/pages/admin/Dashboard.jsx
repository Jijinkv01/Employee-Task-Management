import React from 'react'
import Navbar from '../../components/admin/Navbar'
import TotalCount from '../../components/admin/TotalCount'
import EmployeeList from '../../components/admin/EmployeeList'
import TaskManagement from '../../components/admin/TaskManagement'

const Dashboard = () => {
  return (
    <div>
        <Navbar />
        <TotalCount />
        <EmployeeList />
        <TaskManagement />

    </div>
  )
}

export default Dashboard