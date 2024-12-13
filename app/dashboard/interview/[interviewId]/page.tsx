"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../../../../utils/db'
import { MockInterview } from '../../../../utils/schema'
import { eq } from 'drizzle-orm'

function Interview({params}) {
  // const[interviewData,setInterviewData]=useState([]);
  useEffect(()=>
  {
    GetInterviewData();
  },[])
  const GetInterviewData = async() =>
  {
    const result=await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))
    console.log(result)
    // setInterviewData(result[0])
  }
  return (
    <div>Interview</div>
  )
} 

export default Interview