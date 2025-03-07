"use client"
import React from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { Button } from '../../../../../../components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';

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
        <Button variant="outline">Start Recording</Button>
        <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
        </div>
  )
}

export default RecordAnswerSection