import React from 'react'

const TotalCount = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 p-6">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold">Total Employee</h2>
        <p className="text-5xl mt-2"></p>
      </div>
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold">Total Tasks</h2>
        <p className="text-35xl mt-2"></p>
      </div>
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold">Pending Tasks</h2>
        <p className="text-5xl mt-2"></p>
      </div>
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold">Finished Tasks</h2>
        <p className="text-5xl mt-2"></p>
      </div>
    </div>
  )
}

export default TotalCount