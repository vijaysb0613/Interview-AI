"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../../../../utils/db'
import { MockInterview } from '../../../../utils/schema'
import { eq } from 'drizzle-orm'
import Webcam from 'react-webcam'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { useParams } from 'next/navigation'
import Link from 'next/link'
function Interview({params}) {
  const[interviewData,setInterviewData]=useState([]);
  const[webCamEnabled,setWebCamEnabled]=useState(false);
  useEffect(()=>
  {
    GetInterviewData();
  },[])

  const {interviewId}=useParams()
  const GetInterviewData = async() =>
  {
    const result=await db.select().from(MockInterview).where(eq(MockInterview.mockId,interviewId))
    console.log(result)
    setInterviewData(result)
  }
  return (
    <div className='my-10 '>
      <h2 className='font-bold text-2xl'>Lets Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
      <div className='flex flex-col my-5 gap-10 '>
        <div className='flex flex-col p-5 rounded-lg border'>
        <h2 className='text-lg'><strong>Job Role/Position:</strong>{interviewData[0]?.jobPosition || "N/A"}</h2>
        <h2 className='text-lg'><strong>Job Description</strong>{interviewData[0]?.jobDesc || "N/A"}</h2>
        <h2 className='text-lg'><strong>Job Experience</strong>{interviewData[0]?.jobExperience || "N/A"}</h2>
        </div>
        <div className='p-5 rounded-md border-yellow-300 bg-yellow-600'>
      <h2 className='flex gap-2 items-center'><Lightbulb /><strong>Information</strong></h2> 
        <h2>The camera recording feature 
          helps simulate real-world interviews 
          by analyzing your body language, expressions,
           and presentation skills to provide personalized feedback. Your recordings are securely stored and used
            solely for feedback purposes, ensuring complete confidentiality. To get the best results, choose a quiet, well-lit space, position the camera at eye level,
             and dress professionally as you would for an actual interview. Ensure that you have enabled webcam and microphone permissions for a
           seamless recording experience.</h2>

        </div>
      </div>
      <div>
        {webCamEnabled? <Webcam 
        onUserMedia={()=>setWebCamEnabled(true)}
        onUserMediaError={()=>setWebCamEnabled(false)}
        style={{
          height:300,
          width:300
        }}
        mirrored={true}/>:
        <>
        <WebcamIcon className='h-72 w-full my-7 p-20 bg-blue-200 rounded-md border'  />
        <Button onClick={()=>setWebCamEnabled(true)} variant="ghost">Enable WebCam And Microphone</Button>
        </>

}
      </div>

      </div>
      <div className='flex justify-end items-end'>
      <Link
      href={`/dashboard/interview/${interviewId}/start`}>
      <Button>Start Interview</Button>
      </Link>
      </div>
     
   
    </div>
  )
} 

export default Interview