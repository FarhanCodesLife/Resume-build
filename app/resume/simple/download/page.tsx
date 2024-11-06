'use client'
import Navbar from '@/app/components/Navbar'
import React, { useEffect } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/app/firebase/config'
import { useState } from 'react'
import { DocumentData } from 'firebase/firestore'



const page = () => {
    const [resumeData, setResumeData] = useState<DocumentData | null>(null)
    useEffect(() => {
        const fetchData = async () => {
    const q = query(collection(db, "simpleresumes"), where("id", "==", localStorage.getItem('resumeId')));

    const resumeId = localStorage.getItem('resumeId')
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    alert(doc.id)
    if(resumeId === doc.id){
        setResumeData(doc.data() as DocumentData)
    }
  // doc.data() is never undefined for query doc snapshots
console.log(doc.id, " => ", doc.data());
// setResumeData(doc.data() as DocumentData)

});
        }
        fetchData()
    }, [])
  return (
    <>
    <Navbar />
        <div>page</div>
    </>
  )
}

export default page