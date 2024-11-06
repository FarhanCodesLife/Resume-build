'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Login from '../login/page'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../firebase/config'
function navbar() {
    const [user, setUser] = useState<User | null>(null)
    const [login, setLogin] = useState(false)
    React.useEffect(() => {

        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            setLogin(true)
            console.log(uid)
            setUser(user)
            console.log(user)

  
          } 
        });
    }, [])
    


  return (
    <>
{/* Navigation Bar */}
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.svg"
                  alt="ResumeBuild"
                  width={40}
                  height={40}
                  className="h-8 w-auto"
                />
                <span className="ml-2 text-xl font-semibold">ResumeBuild</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/resume" className="text-gray-600 hover:text-gray-900">
                Resumes
              </Link>
              <Link href="/cover-letters" className="text-gray-600 hover:text-gray-900">
                Cover Letters
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                Career Blog
              </Link>
              {login ? (
              <h1 className='text-gray-600 hover:text-gray-900  rounded-md px-2 py-2 bg-blue-200 '>{user?.email?.slice(0, 6)}...</h1>
              ) : 
                <Link 
                href="/signup" 
              className="text-gray-600 hover:text-gray-900"
            >

              Sign in
            </Link>
              }
              <Link
                href="/login"
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
              >
                Build Resume
              </Link>
            </div>
          </div>
        </div>
      </nav>

    </>
    
  )
}

export default navbar