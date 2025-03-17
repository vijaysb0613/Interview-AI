"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { MockInterview } from '../../../utils/schema';
import { db } from '../../../utils/db';
import { eq } from 'drizzle-orm';
import { desc } from 'drizzle-orm';
function InterviewList() {
    const {user} = useUser();
    const [interviewList,setInterviewList]=useState([]);
    useEffect(()=>
    {
        user&&GetInterviewList();
    },[user])
    const GetInterviewList=async()=>
    {
        const result=await db.select().from(MockInterview).where(eq(MockInterview.createdBy,user?.primaryEmailAddress?.emailAddress)).orderBy(desc(MockInterview.id))
        console.log(result);
        setInterviewList(result);
    }


  return (
    <div className='font-medium tect-xl'>Previous Mock Interview</div>
  )
}

export default InterviewList
