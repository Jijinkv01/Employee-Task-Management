import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"

const TotalCount = () => {
  const [counts, setCounts] = useState({
    totalUsers: 0,
    totalTasks: 0,
    pendingTasks: 0,
    finishedTasks: 0,
  })

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem('adminToken')
        const res = await axios.get('http://localhost:3000/admin/dashboardCounts', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setCounts(res.data.data)
      } catch (error) {
        console.error('Error fetching dashboard counts:', error)
      }
    }

    fetchCounts()
  }, [counts])


  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 p-6">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold">Total Employee : {counts.totalUsers}</h2>
        <p className="text-5xl mt-2"></p>
      </div>
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold">Total Tasks : {counts.totalTasks}</h2>
        <p className="text-35xl mt-2"></p>
      </div>
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold">Pending Tasks : {counts.pendingTasks}</h2>
        <p className="text-5xl mt-2"></p>
      </div>
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold">Finished Tasks : {counts.finishedTasks}</h2>
        <p className="text-5xl mt-2"></p>
      </div>
    </div>
  )
}

export default TotalCount