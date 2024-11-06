import React from 'react'
import Navbar from '../components/navbar'

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Resume Templates</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Template Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-4">Professional Template</h2>
            <div className="aspect-w-3 aspect-h-4 mb-4">
              <img 
                src="/placeholder-template.jpg" 
                alt="Professional Resume Template"
                className="object-cover rounded"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Use Template
            </button>
          </div>

          {/* Add more template cards here */}
        </div>
      </main>
    </div>
  )
}

export default Page