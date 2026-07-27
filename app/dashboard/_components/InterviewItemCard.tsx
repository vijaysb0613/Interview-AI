import React from 'react'
import { Button } from '../../../components/ui/button'
import { useRouter } from 'next/navigation'

interface InterviewItemCardProps {
    interview: {
        mockId: string
        jobPosition: string
        jobExperience: string
        createdAt: string
    }
}

function InterviewItemCard({ interview }: InterviewItemCardProps) {
    const router = useRouter();
    const onStart = () => {
        router.push("/dashboard/interview/" + interview?.mockId + "/start")
    }

    const onFeedback = () => {
        router.push("/dashboard/interview/" + interview?.mockId + "/feedback")
    }
  return (
    <div className='border shadow-sm rounded-lg p-3'>

        <h2 className='font-bold text-primary '>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-500'>{interview?.jobExperience} years of Experience</h2>

        <h2 className='text-xs text-gray-500'>Date Created: {interview?.createdAt}</h2>
    <div className='flex justify-between my-2 mt-2 gap-5'>


        <Button size="sm" variant="outline" className="w-full" onClick={onFeedback}>
            Feedback
        </Button>
        <Button className="w-full" onClick={onStart}>
            Start
        </Button>
    </div>
    </div>
  )
}

export default InterviewItemCard
