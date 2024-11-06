'use client'
import Navbar from '@/app/components/navbar'
import React, { useState } from 'react'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '@/app/firebase/config';

const Page = () => {
  // Add state for form data
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      address: '',
      email: ''
    },
    professionalSummary: '',
    skills: '',

    employmentHistory: [{
      jobTitle: '',
      location: '', 
      startDate: '',
      endDate: '',
      responsibilities: ''
    }],
    
    education: {
      schoolName: '',
      location: '',
      startDate: '',
      endDate: '',
      qualifications: ''
    },
    links: [{
      platform: 'linkedin',
      url: ''
    }]
  })

  // Handle input changes
  const handleInputChange = (section: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      [section]: section === 'employmentHistory' || section === 'links'
        ? prev[section].map((item, index) => index === 0 ? { ...item, [field]: value } : item)
        : section === 'personalInfo' || section === 'education'
          ? { ...prev[section], [field]: value }
          : value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

// Add a new document with a generated id.
const docRef = await addDoc(collection(db, "simpleresumes"), {
  resumeData
});
console.log("Document written with ID: ", docRef.id);
    // Add your Firestore push logic here
    console.log('Resume Data:', resumeData)

  }

  return (
    <>
      <Navbar />
      <div className='min-h-screen mt-10 bg-gray-100 p-8'>
        <div className='max-w-3xl mx-auto mb-6 flex justify-end space-x-4'>
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            Preview
          </button>
         
        </div>

        <form onSubmit={handleSubmit} className='max-w-3xl mx-auto bg-white p-6 rounded-lg shadow'>
          {/* Personal Information */}
          <div className='mb-6'>
            <input
              type="text"
              placeholder="Full Name"
              value={resumeData.personalInfo.fullName}
              onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
              className="text-3xl font-bold w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Address"
              value={resumeData.personalInfo.address}
              onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={resumeData.personalInfo.email}
              onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Professional Summary */}
          <div className='mb-6'>
            <h2 className='text-xl font-bold mb-2'>PROFESSIONAL SUMMARY</h2>
            <textarea
              placeholder="Enter your professional summary..."
              value={resumeData.professionalSummary}
              onChange={(e) => handleInputChange('professionalSummary', '', e.target.value)}
              className="w-full p-2 border rounded h-32"
            />
          </div>

          {/* Employment History */}
          <div className='mb-6'>
            <h2 className='text-xl font-bold mb-2'>EMPLOYMENT HISTORY</h2>
            <div className='space-y-4'>
              <div className='border p-4 rounded'>
                <input
                  type="text"
                  placeholder="Job Title, Company"
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full mb-2 p-2 border rounded"
                />
                <div className='flex gap-2 mb-2'>
                  <input
                    type="text"
                    placeholder="Start Date"
                    className="w-1/2 p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    className="w-1/2 p-2 border rounded"
                  />
                </div>
                <textarea
                  placeholder="Job responsibilities..."
                  className="w-full p-2 border rounded h-24"
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div className='mb-6'>
            <h2 className='text-xl font-bold mb-2'>EDUCATION</h2>
            <div className='border p-4 rounded'>
              <input
                type="text"
                placeholder="School Name"
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full mb-2 p-2 border rounded"
              />
              <div className='flex gap-2 mb-2'>
                <input
                  type="text"
                  placeholder="Start Date"
                  className="w-1/2 p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="End Date"
                  className="w-1/2 p-2 border rounded"
                />
              </div>
              <input
                type="text"
                placeholder="Qualifications"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Links Section - New Addition */}
          <div className='mb-6'>
            <h2 className='text-xl font-bold mb-2'>LINKS</h2>
            <div className='space-y-2'>
              <div className='flex gap-2'>
                <select className="w-1/4 p-2 border rounded">
                  <option value="linkedin">LinkedIn</option>
                  <option value="github">GitHub</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="url"
                  placeholder="https://..."
                  className="w-3/4 p-2 border rounded"
                />
              </div>
              <button
                type="button"
                className="text-sm text-blue-500 hover:text-blue-600 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add another link
              </button>
            </div>
          </div>

          <div className='flex justify-end mt-6 space-x-4'>
            <button
              type="button"
              onClick={() => setResumeData({
                personalInfo: { fullName: '', address: '', email: '' },
                professionalSummary: '',
                employmentHistory: [{ jobTitle: '', location: '', startDate: '', endDate: '', responsibilities: '' }],
                education: { schoolName: '', location: '', startDate: '', endDate: '', qualifications: '' },
                links: [{ platform: 'linkedin', url: '' }]
              })}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Generate Resume
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Page