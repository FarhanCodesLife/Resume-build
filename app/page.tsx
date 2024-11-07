import Link from 'next/link'
import Navbar from './components/Navbar'
import Image from 'next/image'
import simpleimage from '../public/carousel_cv14.webp'
import professionalimage from '../public/carousel_cv15.webp'
import coolimage from '../public/carousel_cv20.webp'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl px-2">
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

         
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 mb-16">
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
            <Link href="/resume/simple">
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Use Template
                    </button>
            </Link>
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
            <Link href="/resume/professional">
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Use Template
            </button>
            </Link>
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
            <Link href="/resume/cool">
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Use Template
            </button>
            </Link>
          </div>

          {/* Add more template cards here */}
        </div>
      </main>

      {/* New Features Section */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Why Choose Our Resume Builder?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            
          <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick & Easy</h3>
              <p className="text-gray-600">Create your professional resume in less than 15 minutes</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick & Easy</h3>
              <p className="text-gray-600">Create your professional resume in less than 15 minutes</p>
            </div>

            
            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick & Easy</h3>
              <p className="text-gray-600">Create your professional resume in less than 15 minutes</p>
            </div>
            {/* Add two more similar feature boxes here */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Resume Builder</h3>
              <p className="text-gray-400">Create professional resumes in minutes with our easy-to-use builder.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/templates" className="text-gray-400 hover:text-white">Templates</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white">Resume Tips</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                {/* Add more social media icons as needed */}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Resume Builder. All rights reserved.</p>
            <p>created by <a href="https://github.com/MUHAMMADFARHANHANIF" className="text-gray-400 hover:text-white">Muhammad Farhan</a></p>
          </div>
        </div>
      </footer>
    </div>
  )
} 