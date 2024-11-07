'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { onAuthStateChanged, User, signOut  } from 'firebase/auth'
import { auth } from '../firebase/config'
import logo from '../../public/resumebuild.webp'

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null)
    const [login, setLogin] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
    
    function handleSignOut() {
  signOut(auth).then(() => {
    setLogin(false)
    // Sign-out successful.
  }).catch((error) => {
    console.log(error)
    // An error happened.
  });
}

  return (
    <>
{/* Navigation Bar */}
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex  items-center">
                <Image
                  src={logo}
                  alt="ResumeBuild"
                  width={140}
                  height={140}
                />
              </Link>
            </div>
            
            <div className="md:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/resume" className="text-gray-600 hover:text-gray-900">
                Resumes
              </Link>
              <Link href="/coverlater" className="text-gray-600 hover:text-gray-900">
                Cover Letters
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                Career Blog
              </Link>
              {login ? (
                <div className="relative">
                  <button onClick={() => setShowDropdown(!showDropdown)} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
                    {user?.email?.slice(0, 6)}...
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
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

        {isMobileMenuOpen && (
            <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link href="/resume" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                        Resumes
                    </Link>
                    <Link href="/coverlater" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                        Cover Letters
                    </Link>
                    <Link href="/blog" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                        Career Blog
                    </Link>
                    {login ? (
                        <div className="px-3 py-2">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">{user?.email?.slice(0, 6)}...</span>
                                <button
                                    onClick={handleSignOut}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link href="/signup" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                            Sign in
                        </Link>
                    )}
                    <Link href="/login" className="block px-3 py-2 text-base font-medium bg-orange-500 text-white hover:bg-orange-600 rounded-md">
                        Build Resume
                    </Link>
                </div>
            </div>
        )}
      </nav>

    </>
    
  )
}