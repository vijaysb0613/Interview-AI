"use client"
import React, { useEffect } from 'react'
import { UserAnser } from '../../../../../utils/schema'
import { db } from '../../../../../utils/db'
function Feedback({params}) {
    useEffect(()=>
    {
        Getfeedback()
    },[])
    const Getfeedback=async()=>{
        const result = await db.select().from(UserAnser).where(eq(UserAnser.mockIdRef,params.interviewId)).orderBy(UserAnser.id)

    }
  return (
    <div className='p-10'>
        <h2 className='text-3xl font-bold text0green-500'>Congratulations</h2>
        <h2 className='font-bold text-2xl'> Here is your interview Feedback</h2>
        <h2 className='text-orange-500'>Your overall interview Rating: <strong>7/10</strong></h2>
   
        <h2 className='text-sm text-gray-500'>Find below interview question along with you feedback and other details</h2>
    </div>  
  )
}

export default Feedback