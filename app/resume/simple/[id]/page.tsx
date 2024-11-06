import Navbar from '@/app/components/Navbar'
import { useParams } from 'next/dist/client/components/navigation'
import React from 'react'

const page = () => {
    const {id} = useParams()
    console.log(id)
    alert(id)

    
  return (
    <>
    <Navbar />
    <div>page</div>
    </>
  )
}

export default page