"use client"
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { Button } from '../../../../../../components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Heading2, Mic } from 'lucide-react'
import { toast } from 'sonner'

function RecordAnswerSection() {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });
   const[userAnswer,setUserAnswer]= useState("")
  const SvaeUserAnswer = ()=>{
    if(isRecording)
    {
      stopSpeechToText();
      if(userAnswer?.length<10)
      {
        toast("Error While Saving please record again");
      }
    }
    else
    {
      startSpeechToText();
    }
  }
  useEffect(()=>{
results.map((result)=>{setUserAnswer(prevAns=>prevAns+result?.transcript)})
  },[results])

  return (
    <div className='flex flex-col justify-center items-center'>
    <div className='flex flex-col  justify-center items-center bg-slate-100 rounded-lg p-4 my-12 flex-wrap'>
        
        <Image src="/webcam.jpg" width={200} height={200} alt="Webcam" className='absolute'  />
        
         <Webcam
         mirrored={true}
         style={{
          height:300,
          width:'100%',
          zIndex:10,
         }} />  
        </div>
        <Button variant="outline"
        onClick={SvaeUserAnswer}>
        {isRecording ?
        <h2 className='text-red-600'>
          <Mic /> Stop Recording
        </h2>
        :
        'Record Answer'
        }</Button>
        <Button onClick={console.log(userAnswer)}>Show Answer</Button>
        </div>
  )
}

export default RecordAnswerSection