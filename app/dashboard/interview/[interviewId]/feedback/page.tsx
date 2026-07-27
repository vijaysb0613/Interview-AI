import React from "react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../../components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { getAnswersForInterview } from "../../../../../lib/db/queries/answers";

async function Feedback({ params }: { params: Promise<{ interviewId: string }> }) {
  const { interviewId } = await params;
  const feedback = await getAnswersForInterview(interviewId);

  const ratedAnswers = feedback.filter((item) => item.rating !== null);
  const overallRating =
    ratedAnswers.length > 0
      ? Math.round(
          (ratedAnswers.reduce((sum, item) => sum + (item.rating ?? 0), 0) / ratedAnswers.length) * 10
        ) / 10
      : null;

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulations</h2>
      <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
      <h2 className="text-orange-500">
        Your overall interview Rating:{" "}
        <strong>{overallRating !== null ? `${overallRating}/10` : "N/A"}</strong>
      </h2>
      <h2 className="text-sm text-gray-500">
        Find below interview questions along with your feedback and other
        details
      </h2>

      <div className="mt-5">
        {feedback.length > 0 ? (
          feedback.map((item) => (
            <Collapsible key={item.id} className="mt-7">
              <CollapsibleTrigger className="p-2 bg-orange-100 rounded-lg flex justify-between my-2 text-left gap-7 w-full">
                {item.question} <ChevronsUpDown className="h-5 w-5"></ChevronsUpDown>
              </CollapsibleTrigger>
              <CollapsibleContent>
               <div className="flex flex-col gap-2">
                <h2 className="text-red-500 p-2 border rounded-lg "><strong>Rating:</strong>{item.rating}</h2>
                <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900"><strong>Your Answer:</strong>{item.userAns}</h2>
                <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900"><strong>Correct Answer:</strong>{item.correctAns}</h2>
                <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-900"><strong>Feedback:</strong>{item.feedback}</h2>
               </div>
              </CollapsibleContent>
            </Collapsible>
          ))
        ) : (
          <p className="text-gray-500 text-bold text-xl mb-5">No feedback available.</p>
        )}
      </div>
     <Link href="/dashboard" replace>
      <Button>Go Home</Button>
     </Link>
    </div>
  );
}

export default Feedback;
