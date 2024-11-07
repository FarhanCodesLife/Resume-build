'use client'
import Navbar from '@/app/components/Navbar'
import React, { useState } from 'react'
import { collection, addDoc, updateDoc } from "firebase/firestore"; 
import { auth, db } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';


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
      email: '',
      phone: ''
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

  const router = useRouter()
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

    try {
      // First create the document to get the ID
      const docRef = await addDoc(collection(db, "professionalresumes"), {
        ...resumeData,
        createdAt: new Date(),
        userId: auth.currentUser?.uid
      });

      // Update the same document to include its ID
      await updateDoc(docRef, {
        id: docRef.id
      });

      console.log("Document written with ID: ", docRef.id);
      localStorage.setItem('resumeId', docRef.id)
      router.push(`/resume/professional/${docRef.id}`)
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  return (
    <>
      <Navbar />
      <div className='min-h-screen mt-10 bg-gray-100 p-4 sm:p-8'>
        <form onSubmit={handleSubmit} className='max-w-3xl mx-auto bg-white p-6 rounded-lg shadow'>
          {/* Personal Information - Updated Styling */}
          <div className='mb-8'>
            <input
              type="text"
              required
              placeholder="Full Name"
              value={resumeData.personalInfo.fullName}
              onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
              className="text-2xl font-bold w-full mb-4 p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <div className="flex flex-col space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <input
                  type="text"
                  required
                  placeholder="44 Shirley Ave, West Chicago, IL 60185"
                  value={resumeData.personalInfo.address}
                  onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                  className="w-full p-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <input
                  type="email"
                  required
                  placeholder="jmiller@gmail.com"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  className="w-full p-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 555-5555"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  className="w-full p-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              
              </div>
            </div>
          </div>

          {/* Professional Summary - Updated Styling */}
          <div className='mb-8'>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-500 rounded-full mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h2 className='text-xl font-bold'>Professional Summary</h2>
            </div>
            <textarea
              required
              placeholder="A highly resourceful, flexible, innovative, and enthusiastic project manager..."
              value={resumeData.professionalSummary}
              onChange={(e) => handleInputChange('professionalSummary', '', e.target.value)}
              className="w-full p-2 border-gray-300 border rounded focus:outline-none focus:border-blue-500"
              rows={4}
            />
          </div>

          {/* Skills - Updated Styling */}
          <div className='mb-8'>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-500 rounded-full mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className='text-xl font-bold'>Skills</h2>
            </div>
            <div className="space-y-2">
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="relative w-full">
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-blue-500 rounded" style={{width: '75%'}}></div>
                  </div>
                  <span className="absolute -top-6 left-0 text-sm">{skill}</span>
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add skills (comma-separated)"
              value={resumeData.skills.join(', ')}
              onChange={(e) => handleSkillsChange(e.target.value)}
              className="mt-4 w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
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
                personalInfo: { fullName: '', address: '', email: '', phone: '+1' },
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