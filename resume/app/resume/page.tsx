import React from 'react'
import Navbar from '../components/navbar'
import Image from 'next/image'
import simpleimage from '../../public/carousel_cv20.webp'
import professionalimage from '../../public/carousel_cv14.webp'
import coolimage from '../../public/carousel_cv15.webp'

const Page = () => {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 mt-16">
      <main className="container mx-auto px-4 py-8 max-w-7xl ">
        <h1 className="text-4xl font-bold mb-8">Resume Templates</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Template Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-4">Simple Template</h2>
            <div className="aspect-w-3 aspect-h-4 mb-4">
              <Image 
                width={900}
                height={100}
                src={simpleimage} 
                alt="Professional Resume Template"
                className="object-cover rounded"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Use Template
            </button>
          </div>

           {/* Template Card */}
           <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-4">Professional Template</h2>
            <div className="aspect-w-3 aspect-h-4 mb-4">
              <Image 
                width={900}
                height={100}
                src={professionalimage} 
                alt="Professional Resume Template"
                className="object-cover rounded"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Use Template
            </button>
          </div>




           {/* Template Card */}
           <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-4">Cool Template</h2>
            <div className="aspect-w-3 aspect-h-4 mb-4">
              <Image 
                width={900}
                height={100}
                src={coolimage} 
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
    </>
  )
}

export default Page