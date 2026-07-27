import { notFound } from "next/navigation";
import { getInterviewByMockId } from "@/lib/db/queries/interviews";
import { interviewQuestionsResponseSchema } from "@/lib/ai/schemas";
import StartInterviewClient from "./_components/StartInterviewClient";

async function StartInterview({ params }: { params: Promise<{ interviewId: string }> }) {
  const { interviewId } = await params;
  const interview = await getInterviewByMockId(interviewId);
  if (!interview) {
    notFound();
  }

  let rawQuestions: unknown;
  try {
    rawQuestions = JSON.parse(interview.jsonMockResp);
  } catch {
    notFound();
  }

  const parsedQuestions = interviewQuestionsResponseSchema.safeParse(rawQuestions);
  if (!parsedQuestions.success) {
    notFound();
  }

  return (
    <StartInterviewClient
      interviewData={{
        mockId: interview.mockId,
        jobPosition: interview.jobPosition,
        jobDesc: interview.jobDesc,
        jobExperience: interview.jobExperience,
      }}
      questions={parsedQuestions.data.interviewQuestions}
    />
  );
}

export default StartInterview;
