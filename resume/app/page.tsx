import Link from 'next/link'
import Image from 'next/image'
import Login from './login/page'
import Navbar from './components/navbar'
export default function HomePage() {
  return (
    <div className="min-h-screen">
      
<Navbar />
      {/* Hero Section */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              MAKE A JOB-WINNING RESUME IN MINUTES WITH OUR SIMPLE RESUME BUILDER
            </h1>
            <div className="mt-8 space-y-4">
              <div className="flex items-center">
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="ml-3 text-lg text-gray-500">
                  Customizable, HR-approved, ready-to-use resume templates
                </p>
              </div>
              <div className="flex items-center">
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="ml-3 text-lg text-gray-500">
                  Step-by-step guidance and expert tips to create a targeted, job-scoring resume
                </p>
              </div>
            </div>
            <div className="mt-10">
              <Link
                href="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600"
              >
                Start Building Your Resume
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 