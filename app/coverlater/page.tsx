import React from 'react'
import Navbar from '../components/Navbar'

const page = () => {
  return (
    <>
    <Navbar />

    <div className='max-w-4xl items-center mx-auto pt-20 px-4 sm:px-6 lg:px-8'>
        <h1 className='text-4xl my-auto font-bold text-gray-900 mb-8 text-center'>Create Your Cover Letter Here</h1>
        <p className='text-gray-600 text-center'>Our cover letter generator is designed to help you create a professional and effective cover letter in minutes. Simply enter your information and let our AI take care of the rest.</p>
    </div>
    </>
  )
}

export default page
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   // 'use client'
    // import Navbar from '../components/Navbar'
    // import { useEffect, useState } from 'react'
    // import { collection, addDoc, updateDoc } from "firebase/firestore"
    // import { auth, db } from '../firebase/config'
    // import { useRouter } from 'next/navigation'
    // import { onAuthStateChanged } from 'firebase/auth'

    // const CoverLetter = () => {
    //   const [coverLetterData, setCoverLetterData] = useState({
    //     personalInfo: {
    //       fullName: '',
    //       email: '',
    //       phone: '',
    //       address: ''
    //     },
    //     recipientInfo: {
    //       companyName: '',
    //       hiringManager: '',
    //       companyAddress: ''
    //     },
    //     letterContent: {
    //       opening: '',
    //       body: '',
    //       closing: ''
    //     },
    //     date: new Date().toISOString().split('T')[0]
    //   })

    //   const router = useRouter()

    //   useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //       if (!user) {
    //       }
    //     })
    //   }, [router])

    //   const handleInputChange = (section: string, field: string, value: string) => {
    //     setCoverLetterData(prev => ({
    //       ...prev,
    //       [section]: {
    //          ...(prev[section as keyof typeof prev] as Record<string, string>),
    //         [field]: value
    //       }
    //     }))
    //   }

    //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()

    //     try {
    //       const docRef = await addDoc(collection(db, "coverletters"), {
    //         ...coverLetterData,
    //         createdAt: new Date(),
    //         userId: auth.currentUser?.uid
    //       })

    //       await updateDoc(docRef, {
    //         id: docRef.id
    //       })

    //       router.push(`/coverletter/${docRef.id}`)
    //     } catch (error) {
    //       console.error("Error saving cover letter: ", error)
    //     }
    //   }

    //   return (
    //     <div className="min-h-screen bg-gray-50">
    //       <Navbar />
    //       <div className="max-w-4xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
    //         <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
    //           <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Your Cover Letter</h1>
              
    //           <form onSubmit={handleSubmit} className="space-y-8">
    //             {/* Personal Information */}
    //             <div>
    //               <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
    //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //                 <input
    //                   type="text"
    //                   placeholder="Full Name"
    //                   className="w-full p-2 border rounded"
    //                   value={coverLetterData.personalInfo.fullName}
    //                   onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
    //                   required
    //                 />
    //                 <input
    //                   type="email"
    //                   placeholder="Email"
    //                   className="w-full p-2 border rounded"
    //                   value={coverLetterData.personalInfo.email}
    //                   onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
    //                   required
    //                 />
    //                 <input
    //                   type="tel"
    //                   placeholder="Phone"
    //                   className="w-full p-2 border rounded"
    //                   value={coverLetterData.personalInfo.phone}
    //                   onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
    //                   required
    //                 />
    //                 <input
    //                   type="text"
    //                   placeholder="Address"
    //                   className="w-full p-2 border rounded"
    //                   value={coverLetterData.personalInfo.address}
    //                   onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
    //                   required
    //                 />
    //               </div>
    //             </div>

    //             {/* Recipient Information */}
    //             <div>
    //               <h2 className="text-xl font-semibold mb-4">Recipient Information</h2>
    //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //                 <input
    //                   type="text"
    //                   placeholder="Company Name"
    //                   className="w-full p-2 border rounded"
    //                   value={coverLetterData.recipientInfo.companyName}
    //                   onChange={(e) => handleInputChange('recipientInfo', 'companyName', e.target.value)}
    //                   required
    //                 />
    //                 <input
    //                   type="text"
    //                   placeholder="Hiring Manager Name"
    //                   className="w-full p-2 border rounded"
    //                   value={coverLetterData.recipientInfo.hiringManager}
    //                   onChange={(e) => handleInputChange('recipientInfo', 'hiringManager', e.target.value)}
    //                 />
    //                 <input
    //                   type="text"
    //                   placeholder="Company Address"
    //                   className="w-full p-2 border rounded col-span-2"
    //                   value={coverLetterData.recipientInfo.companyAddress}
    //                   onChange={(e) => handleInputChange('recipientInfo', 'companyAddress', e.target.value)}
    //                 />
    //               </div>
    //             </div>

    //             {/* Letter Content */}
    //             <div>
    //               <h2 className="text-xl font-semibold mb-4">Letter Content</h2>
    //               <div className="space-y-4">
    //                 <textarea
    //                   placeholder="Opening Paragraph"
    //                   className="w-full p-2 border rounded h-32"
    //                   value={coverLetterData.letterContent.opening}
    //                   onChange={(e) => handleInputChange('letterContent', 'opening', e.target.value)}
    //                   required
    //                 />
    //                 <textarea
    //                   placeholder="Body Paragraphs"
    //                   className="w-full p-2 border rounded h-48"
    //                   value={coverLetterData.letterContent.body}
    //                   onChange={(e) => handleInputChange('letterContent', 'body', e.target.value)}
    //                   required
    //                 />
    //                 <textarea
    //                   placeholder="Closing Paragraph"
    //                   className="w-full p-2 border rounded h-32"
    //                   value={coverLetterData.letterContent.closing}
    //                   onChange={(e) => handleInputChange('letterContent', 'closing', e.target.value)}
    //                   required
    //                 />
    //               </div>
    //             </div>

    //             <button
    //               type="submit"
    //               className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
    //             >
    //               Generate Cover Letter
    //             </button>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   )
    // }

    // export default CoverLetter
   