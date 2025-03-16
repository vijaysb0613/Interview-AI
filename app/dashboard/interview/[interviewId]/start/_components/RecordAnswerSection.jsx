"use client"
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { Button } from '../../../../../../components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Heading2, Mic } from 'lucide-react'
import { toast } from 'sonner'
import { model } from "../../../../../../GeminiAIModal";
import { useUser } from '@clerk/nextjs'
import moment from 'moment'


function RecordAnswerSection({activeQuestionIndex,MockInterviewQuestion,interviewData}) {
  const {user} = useUser();
  const [loading,setLoading]=useState();
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
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
  const SvaeUserAnswer = async ()=>{
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
    if(isRecording)
    {
      setLoading(true);
      stopSpeechToText();
      if(userAnswer?.length<10)
      {
        setLoading(false)
        toast("Error While Saving please record again");
      }
      const FeedBackPrompt = "Question:"+MockInterviewQuestion[activeQuestionIndex]?.question+", UserAnser:"+userAnswer+"Depending on the given Question And User Answer give a rating for 10 and feedback of improvement in 3 to 5 lines in json format with rating field and feedback field";
      const result = await chatSession.sendMessage(FeedBackPrompt);
      const mockJsonResponse=(result.response.text()).replace('```json','').replace('```','');
      console.log(mockJsonResponse); 
      const JsonFeedbackResp=JSON.parse(mockJsonResponse);

      const resp=await db.insert(userAnswer).values({

        mockIdRef:interviewData?.mockId,
        question:MockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns:MockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns:userAnswer,
        feedback:JsonFeedbackResp?.feedback,
        rating:JsonFeedbackResp?.rating,
        userEmail:user?.primaryEmailAddress.emailAddress,
        createdAt:moment().format('DD-MM-yyyy'),
        
      })
      if(resp)
      {
        toast('User Answer Recorded Sucessfully')
      }
      setLoading(false);
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