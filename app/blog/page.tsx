import React from 'react'
import Navbar from '../components/Navbar'

const page = () => {
  return (
    <>
    <Navbar />  
    
    <div className='max-w-4xl mx-auto pt-20 px-4 sm:px-6 lg:px-8'>
        <h1 className='text-4xl my-auto font-bold text-gray-900 mb-8 text-center'>Career Blog</h1>
        <p className='text-gray-600 text-center'>Our career blog is designed to help you find the perfect job and career path. We provide you with the latest career advice, tips, and resources to help you succeed in your career.</p>
        
    </div>
    </>
  )
}

export default page