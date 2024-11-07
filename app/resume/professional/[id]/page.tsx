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
    const [copySuccess, setCopySuccess] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resumeId = typeof window !== 'undefined' ? localStorage.getItem('resumeId') : null;
                
                if (!resumeId) {
                    setError('No resume ID found');
                    return;
                }

                const q = query(collection(db, "professionalresumes"), where("id", "==", resumeId));
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

    const handlePdfDownload = () => {
        const element = document.getElementById('resume-content');
        const opt = {
            margin: [0, 0, 0, 0],
            filename: `${resumeData?.personalInfo.fullName || 'resume'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    };

    const handleShareLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
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
                        <div id="resume-content" className="bg-white p-8 rounded-lg">
                            {/* Header Section - Updated styling */}
                            <div className="text-center mb-6">
                                <h1 className="text-4xl font-bold text-[#33A9DE]">{resumeData.personalInfo.fullName.toUpperCase()}</h1>
                                <div className="flex justify-center gap-8 mt-2 text-sm">
                                    <p>{resumeData.personalInfo.address}</p>
                                    <p>{resumeData.personalInfo.email}</p>
                                    <p>{resumeData.personalInfo.phone}</p>
                                </div>
                            </div>

                            {/* Professional Summary - Updated styling */}
                            <div className="mb-6">
                                <h2 className="bg-[#33A9DE] text-white py-1 px-4 mb-2">PROFESSIONAL SUMMARY</h2>
                                <p className="text-sm leading-relaxed">{resumeData?.professionalSummary}</p>
                            </div>

                            {/* Employment History - Updated styling */}
                            <div className="mb-6">
                                <h2 className="bg-[#33A9DE] text-white py-1 px-4 mb-2">EMPLOYMENT HISTORY</h2>
                                {resumeData.employmentHistory?.map((job: any, index: number) => (
                                    <div key={index} className="mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#33A9DE] text-sm">●</span>
                                            <div className="flex-1">
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
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Education - Updated styling */}
                            <div className="mb-6">
                                <h2 className="bg-[#33A9DE] text-white py-1 px-4 mb-2">EDUCATION</h2>
                                {resumeData.education && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-[#33A9DE] text-sm">●</span>
                                        <div className="flex-1">
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
                                )}
                            </div>

                            {/* Add this new section before the Links section */}
                            {resumeData.skills && resumeData.skills.length > 0 && (
                                <div className="mb-6">
                                    <h2 className="bg-[#33A9DE] text-white py-1 px-4 mb-2">SKILLS</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {resumeData.skills.map((skill: string, index: number) => (
                                            skill && (  // Only render if skill is not an empty string
                                                <span 
                                                    key={index} 
                                                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                                                >
                                                    {skill}
                                                </span>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Links section continues below ... */}
                            {resumeData.links && (
                                <div className="mb-6">
                                    <h2 className="bg-[#33A9DE] text-white py-1 px-4 mb-2">LINKS</h2>
                                    {resumeData.links.map((link: any, index: number) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <span className="text-[#33A9DE] text-sm">●</span>
                                            <div className="flex-1">
                                                <a href={link.url} className="font-bold hover:text-[#33A9DE] transition-colors">
                                                    {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                                                </a>
                                            </div>
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