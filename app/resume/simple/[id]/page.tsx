'use client'
import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/app/firebase/config'
import { DocumentData } from 'firebase/firestore'
import { FaFilePdf, FaLink } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';

const Page = () => {
    const [resumeData, setResumeData] = useState<DocumentData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resumeId = typeof window !== 'undefined' ? localStorage.getItem('resumeId') : null;
                
                if (!resumeId) {
                    setError('No resume ID found');
                    return;
                }

                const q = query(collection(db, "simpleresumes"), where("id", "==", resumeId));
                const querySnapshot = await getDocs(q);
                
                if (querySnapshot.empty) {
                    setError('Resume not found');
                    return;
                }

                const doc = querySnapshot.docs[0];
                setResumeData(doc.data());
            } catch (err) {
                setError('Error fetching resume data');
                console.error(err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!isGoogleAPILoaded) {
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/api.js';
            script.onload = () => setGoogleAPILoaded(true);
            document.body.appendChild(script);
        }
    }, [isGoogleAPILoaded]);

    const handlePdfDownload = () => {
        const element = document.getElementById('resume-content');
        const opt = {
            margin: [0, 0, 0, 0], // top, right, bottom, left margins
            filename: `${resumeData?.personalInfo.fullName || 'resume'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    };

    const handleGoogleDriveExport = async () => {
        try {
            // First generate the PDF
            const element = document.getElementById('resume-content');
            const opt = {
                margin: [0, 0, 0, 0],
                filename: `${resumeData?.personalInfo.fullName || 'resume'}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };

            // Generate PDF blob
            const pdfBlob = await html2pdf().set(opt).from(element).output('blob');

            // Create file metadata
            const fileName = `${resumeData?.personalInfo.fullName || 'resume'}.pdf`;
            
            // Initialize Google Drive API
            const accessToken = await getGoogleAccessToken(); // We'll implement this
            
            if (!accessToken) {
                throw new Error('Failed to get Google access token');
            }

            // Create form data
            const formData = new FormData();
            formData.append('metadata', new Blob([JSON.stringify({
                name: fileName,
                mimeType: 'application/pdf'
            })], { type: 'application/json' }));
            formData.append('file', pdfBlob);

            // Upload to Google Drive
            const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload to Google Drive');
            }

            alert('Successfully exported to Google Drive!');
        } catch (error) {
            console.error('Error exporting to Google Drive:', error);
            alert('Failed to export to Google Drive. Please try again.');
        }
    };

    const getGoogleAccessToken = async () => {
        // This will trigger Google OAuth flow
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        if (!clientId) {
            throw new Error('Google Client ID is not configured');
        }

        // Load the Google API client
        await new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/api.js';
            script.onload = resolve;
            document.body.appendChild(script);
        });

        // Initialize the Google API client
        await new Promise<void>((resolve) => {
            window.gapi.load('client:auth2', () => resolve());
        });

        // Initialize the client
        await window.gapi.client.init({
            clientId: clientId,
            scope: 'https://www.googleapis.com/auth/drive.file'
        });

        // Get the auth instance
        const authInstance = window.gapi.auth2.getAuthInstance();

        // Sign in if not already signed in
        if (!authInstance.isSignedIn.get()) {
            await authInstance.signIn();
        }

        // Get the access token
        const currentUser = authInstance.currentUser.get();
        const accessToken = currentUser.getAuthResponse().access_token;
        
        return accessToken;
    };

    return (
        <>
            <div className="container mt-10 mx-auto p-4 max-w-3xl">
                {error && <div className="text-red-500">{error}</div>}
                {resumeData && (
                    <>
                        <div className="flex gap-4 mb-4">
                            <button
                                onClick={handlePdfDownload}
                                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                <FaFilePdf /> Download PDF
                            </button>
                            <button
                                onClick={handleShareLink}
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                <FaLink /> {copySuccess ? 'Copied!' : 'Copy Share Link'}
                            </button>
                        </div>
                        <div id="resume-content" className='bg-white p-8 rounded-lg space-y-6'>
                            {/* Header Section */}
                            <div className="space-y-2">
                                <h1 className='text-3xl font-bold text-blue-600'>{resumeData.personalInfo.fullName.toUpperCase()}</h1>
                                <div className="text-sm">
                                    <p>{resumeData.personalInfo.address}</p>
                                    <p>{resumeData.personalInfo.email}</p>
                                </div>
                            </div>

                            {/* Professional Summary */}
                            <div>
                                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">PROFESSIONAL SUMMARY</h2>
                                 <p className="text-sm">{resumeData?.professionalSummary}</p>
                            </div>

                            {/* Skills */}
                            <div>
                                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">SKILLS</h2>
                                <div className="flex flex-wrap gap-2">
                                    {resumeData.skills?.map((skill: string, index: number) => (
                                        <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Employment History */}
                            <div>
                                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">EMPLOYMENT HISTORY</h2>
                                {resumeData.employmentHistory?.map((job: any, index: number) => (
                                    <div key={index} className="mb-4">
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className="font-bold">{job.jobTitle}</h3>
                                                <p className="text-sm">{job.responsibilities}</p>
                                            </div>
                                            <div className="text-sm">{job.location}</div>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {job.startDate} - {job.endDate}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Education */}
                            <div>
                                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">EDUCATION</h2>
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="font-bold">{resumeData.education.schoolName}</h3>
                                            <p className="text-sm">{resumeData.education.qualifications}</p>
                                        </div>
                                        <div className="text-sm">{resumeData.education.location}</div>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {resumeData.education.startDate} - {resumeData.education.endDate}
                                    </div>
                                </div>
                            </div>

                            {/* Links */}
                            {resumeData.links && resumeData.links.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">LINKS</h2>
                                    {resumeData.links.map((link: any, index: number) => (
                                        <div key={index} className="mb-2">
                                            <a href={link.url} target="_blank" rel="noopener noreferrer" 
                                               className="text-blue-600 hover:underline">
                                                {link.platform}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Page