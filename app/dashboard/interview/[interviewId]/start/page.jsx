"use client"
import React, { useState } from 'react'
import { db } from '../../../../../utils/db';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MockInterview } from '../../../../../utils/schema';
import { eq } from 'drizzle-orm'
import QuestionSection from "./_components/QuestionSection";
function StartInterview(params) 
{

    const [interviewData,setInterviewData]=useState()
    const[MockInterviewQuestion,setMockInterviewQuestion]=useState()
    
    
      useEffect(()=>
      {
        GetInterviewData();
      },[])
    
      const {interviewId}=useParams()
      const GetInterviewData = async() =>
      {
        const result=await db.select().from(MockInterview).where(eq(MockInterview.mockId,interviewId))
        const jsonMockResp=JSON.parse(result[0].jsonMockResp)
        console.log(jsonMockResp)
        setInterviewData(result[0])


      }

  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2'>
        <QuestionSection MockInterviewQuestion={MockInterviewQuestion}/>
        </div>
    </div>
  )
}

export default StartInterview