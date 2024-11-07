'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import {  onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

React.useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/resume')
        const uid = user.uid;
        console.log(uid)
      } 
    });
}, [router])


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Handle login logic here
    console.log('Login attempt:', formData)

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() => {
        // Signed in 
        alert('Login successful')

        router.push('/resume') 

        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage)
      })
      .finally(() => {
        setLoading(false)
      });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8 p-4 sm:p-8 bg-white rounded-lg shadow">
        <h2 className="text-center text-2xl sm:text-3xl font-bold">Sign in to your account</h2>
        <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 sm:py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-xs sm:text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login