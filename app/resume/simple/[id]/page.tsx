'use client'
import Navbar from '@/app/components/Navbar'
import React, { useEffect } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/app/firebase/config'
import { useState } from 'react'
import { DocumentData } from 'firebase/firestore'



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

    return (
        <>
            <Navbar />
            <div className="container mt-10 mx-auto p-4">
                {error && <div className="text-red-500">{error}</div>}
                {resumeData && (
                    <div className='bg-white p-4 rounded-lg'>
                        <h1 className='text-2xl font-bold'>{resumeData.name}</h1>
                    </div>
                )}
            </div>
        </>
    );
};

export default Page