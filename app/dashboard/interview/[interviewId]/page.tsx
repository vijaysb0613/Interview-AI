"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../../../../utils/db'
import { MockInterview } from '../../../../utils/schema'
import { eq } from 'drizzle-orm'
import Webcam from 'react-webcam'
import { WebcamIcon } from 'lucide-react'

import { Button } from '../../../../components/ui/button'
function Interview({params}) {
  const[interviewData,setInterviewData]=useState([]);
  const[webCamEnabled,setWebCamEnabled]=useState(false);
  useEffect(()=>
  {
    GetInterviewData();
  },[])
  const GetInterviewData = async() =>
  {
    const result=await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))
    console.log(result)
    setInterviewData(result)
  }
  return (
    <div className='my-10 flex justify-center flex-col items-center'>
      <h2 className='font-bold text-2xl'>Lets Get Started</h2>
      <div>
        {webCamEnabled? <Webcam 
        onUserMedia={()=>setWebCamEnabled(true)}
        onUserMediaError={()=>setWebCamEnabled(false)}
        style={{
          height:300,
          width:300
        }}/>:
        <>
        <WebcamIcon className='h-72 w-full my-7 p-20 bg-blue-200 rounded-md border'  />
        <Button onClick={()=>setWebCamEnabled(true)} variant="outline">Enable WebCam And Microphone</Button>
        </>
}
      </div>
    </div>
  )
} 

export default Interview