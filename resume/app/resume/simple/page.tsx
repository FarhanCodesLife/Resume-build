'use client'
import Navbar from '@/app/components/navbar'
import React, { useState } from 'react'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '@/app/firebase/config';

interface EmploymentEntry {
  jobTitle?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  responsibilities?: string;
}

const Page = () => {
  // Add state for form data
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      address: '',
      email: ''
    },
    professionalSummary: '',
    skills: [] as string[],
    employmentHistory: [{
      jobTitle: '',
      location: '',
      startDate: '',
      endDate: '',
      responsibilities: ''
    }] as EmploymentEntry[],
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

  // Add new function to handle adding links
  const handleAddLink = () => {
    setResumeData(prev => ({
      ...prev,
      links: [...prev.links, { platform: 'linkedin', url: '' }]
    }));
  }

  // Update handleInputChange to handle multiple links
  const handleInputChange = (section: string, field: string, value: string, index: number = 0) => {
    setResumeData(prev => ({
      ...prev,
      [section]: section === 'employmentHistory' || section === 'links'
        ? prev[section].map((item, i) => i === index ? { ...item, [field]: value } : item)
        : section === 'personalInfo' || section === 'education'
          ? { ...prev[section], [field]: value }
          : value
    }))
  }

  // Add new function to handle skills
  const handleSkillsChange = (value: string) => {
    const skillsArray = value.split(',').map(skill => skill.trim());
    setResumeData(prev => ({
      ...prev,
      skills: skillsArray
    }));
  }

  // Add new function to handle adding employment entries
  const handleAddEmployment = () => {
    setResumeData(prev => ({
      ...prev,
      employmentHistory: [...prev.employmentHistory, {
        jobTitle: '',
        location: '',
        startDate: '',
        endDate: '',
        responsibilities: ''
      }]
    }));
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
    alert(`Resume saved with ID: ${docRef.id}`);
    

  }

  return (
    <>
      <Navbar />
      <div className='min-h-screen mt-10 bg-gray-100 p-4 sm:p-8'>
        <div className='max-w-3xl mx-auto mb-6 flex justify-end space-x-4 px-2 sm:px-0'>
          <button
            type="button"
            className="bg-green-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded hover:bg-green-600 flex items-center text-sm sm:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            Preview
          </button>
        </div>

        <form onSubmit={handleSubmit} className='max-w-3xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow'>
          {/* Personal Information */}
          <div className='mb-4 sm:mb-6'>
            <input
              type="text"
              required
              placeholder="Full Name"
              value={resumeData.personalInfo.fullName}
              onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
              className="text-2xl sm:text-3xl font-bold w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              required
              placeholder="Address"
              value={resumeData.personalInfo.address}
              onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="email"
              required
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
              required
              placeholder="Enter your professional summary..."
              value={resumeData.professionalSummary}
              onChange={(e) => handleInputChange('professionalSummary', '', e.target.value)}
              className="w-full p-2 border rounded h-32"
            />
          </div>

          {/* Add Skills section after Professional Summary */}
          <div className='mb-6'>
            <h2 className='text-xl font-bold mb-2'>SKILLS</h2>
            <textarea
              required
              placeholder="Enter your skills (comma-separated)..."
              value={resumeData.skills.join(', ')}
              onChange={(e) => handleSkillsChange(e.target.value)}
              className="w-full p-2 border rounded h-24"
            />
            <p className="text-sm text-gray-500 mt-1">
              Separate skills with commas (e.g., JavaScript, React, Node.js)
            </p>
          </div>

          {/* Employment History */}
          <div className='mb-4 sm:mb-6'>
            <h2 className='text-xl font-bold mb-2'>EMPLOYMENT HISTORY</h2>
            <div className='space-y-4'>
              {resumeData.employmentHistory.map((job, index) => (
                <div key={index} className='border p-3 sm:p-4 rounded'>
                  <input
                    type="text"
                    placeholder="Job Title, Company"
                    value={job.jobTitle}
                    onChange={(e) => handleInputChange('employmentHistory', 'jobTitle', e.target.value, index)}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={job.location}
                    onChange={(e) => handleInputChange('employmentHistory', 'location', e.target.value, index)}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <div className='flex flex-col sm:flex-row gap-2 mb-2'>
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={job.startDate}
                      onChange={(e) => handleInputChange('employmentHistory', 'startDate', e.target.value, index)}
                      className="w-full sm:w-1/2 p-2 border rounded"
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      value={job.endDate}
                      onChange={(e) => handleInputChange('employmentHistory', 'endDate', e.target.value, index)}
                      className="w-full sm:w-1/2 p-2 border rounded"
                    />
                  </div>
                  <textarea
                    placeholder="Job responsibilities..."
                    value={job.responsibilities}
                    onChange={(e) => handleInputChange('employmentHistory', 'responsibilities', e.target.value, index)}
                    className="w-full p-2 border rounded h-24"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddEmployment}
                className="text-sm text-blue-500 hover:text-blue-600 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add another employment
              </button>
            </div>
          </div>

          {/* Education */}
          <div className='mb-6'>
            <h2 className='text-xl font-bold mb-2'>EDUCATION</h2>
            <div className='border p-4 rounded'>
              <input
                type="text"
                required
                placeholder="School Name"
                value={resumeData.education.schoolName}
                onChange={(e) => handleInputChange('education', 'schoolName', e.target.value)}
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="text"
                required
                placeholder="Location"
                value={resumeData.education.location}
                onChange={(e) => handleInputChange('education', 'location', e.target.value)}
                className="w-full mb-2 p-2 border rounded"
              />
              <div className='flex gap-2 mb-2'>
                <input
                  type="date"
                  placeholder="Start Date"
                  value={resumeData.education.startDate}
                  onChange={(e) => handleInputChange('education', 'startDate', e.target.value)}
                  className="w-1/2 p-2 border rounded"
                />
                <input
                  type="date"
                  placeholder="End Date"
                  value={resumeData.education.endDate}
                  onChange={(e) => handleInputChange('education', 'endDate', e.target.value)}
                  className="w-1/2 p-2 border rounded"
                />
              </div>
              <input
                type="text"
                required
                placeholder="Qualifications"
                value={resumeData.education.qualifications}
                onChange={(e) => handleInputChange('education', 'qualifications', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Links Section - New Addition */}
          <div className='mb-4 sm:mb-6'>
            <h2 className='text-xl font-bold mb-2'>LINKS</h2>
            <div className='space-y-2'>
              {resumeData.links.map((link, index) => (
                <div key={index} className='flex flex-col sm:flex-row gap-2'>
                  <select 
                    required
                    className="w-full sm:w-1/4 p-2 border rounded"
                    value={link.platform}
                    onChange={(e) => handleInputChange('links', 'platform', e.target.value, index)}
                  >
                    <option value="linkedin">LinkedIn</option>
                    <option value="github">GitHub</option>
                    <option value="portfolio">Portfolio</option>
                    <option value="other">Other</option>
                  </select>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={link.url}
                    onChange={(e) => handleInputChange('links', 'url', e.target.value, index)}
                    className="w-full sm:w-3/4 p-2 border rounded"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddLink}
                className="text-sm text-blue-500 hover:text-blue-600 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add another link
              </button>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row justify-end mt-6 space-y-2 sm:space-y-0 sm:space-x-4'>
            <button
              type="button"
              onClick={() => setResumeData({
                personalInfo: { fullName: '', address: '', email: '' },
                professionalSummary: '',
                skills: [] as string[],
                employmentHistory: [{
                  jobTitle: '',
                  location: '',
                  startDate: '',
                  endDate: '',
                  responsibilities: ''
                }] as EmploymentEntry[],
                education: { 
                  schoolName: '', 
                  location: '', 
                  startDate: '', 
                  endDate: '', 
                  qualifications: '' 
                },
                links: [{ platform: 'linkedin', url: '' }]
              })}
              className="w-full sm:w-auto bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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