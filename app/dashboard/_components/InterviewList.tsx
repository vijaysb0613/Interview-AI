import { currentUser } from "@clerk/nextjs/server";
import { getInterviewsForUser } from "../../../lib/db/queries/interviews";
import InterviewItemCard from "./InterviewItemCard";

async function InterviewList() {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const interviewList = email ? await getInterviewsForUser(email) : [];

  return (
    <div>
    <h2 className='font-medium tect-xl'>Previous Mock Interview
    </h2>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>{interviewList.map((interview) => (
      <InterviewItemCard
      interview={interview}
      key={interview.mockId}/>
    ))}</div>
    </div>
  )
}

export default InterviewList
