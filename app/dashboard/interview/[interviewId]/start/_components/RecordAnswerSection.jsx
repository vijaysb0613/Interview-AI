import React from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { Button } from '../../../../../../components/ui/button'
function RecordAnswerSection() {
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
        </div>
  )
}

export default RecordAnswerSection