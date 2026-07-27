import React from 'react'
import { notFound } from 'next/navigation'
import { Lightbulb } from 'lucide-react'
import { ErrorBoundary } from 'react-error-boundary'
import { Button } from '../../../../components/ui/button'
import Link from 'next/link'
import { getInterviewByMockId } from '../../../../lib/db/queries/interviews'
import WebcamPreview from './_components/WebcamPreview'

async function Interview({ params }: { params: Promise<{ interviewId: string }> }) {
  const { interviewId } = await params
  const interview = await getInterviewByMockId(interviewId)
  if (!interview) {
    notFound()
  }

  return (
    <div className='my-10 '>
      <h2 className='font-bold text-2xl'>Lets Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
      <div className='flex flex-col my-5 gap-10 '>
        <div className='flex flex-col p-5 rounded-lg border'>
        <h2 className='text-lg'><strong>Job Role/Position:</strong>{interview.jobPosition}</h2>
        <h2 className='text-lg'><strong>Job Description</strong>{interview.jobDesc}</h2>
        <h2 className='text-lg'><strong>Job Experience</strong>{interview.jobExperience}</h2>
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
        <ErrorBoundary
          fallback={
            <p className="text-red-600 text-center p-4">
              Something went wrong with the webcam. Please check your browser permissions and
              refresh the page.
            </p>
          }
        >
          <WebcamPreview />
        </ErrorBoundary>
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
