"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import useParams
import { UserAnser } from "../../../../../utils/schema";
import { db } from "../../../../../utils/db";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../../@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
function Feedback() {
  const params = useParams(); // Unwrap params correctly
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!params?.interviewId) return; // Ensure interviewId exists
      const result = await db
        .select()
        .from(UserAnser)
        .where(eq(UserAnser.mockIdRef, params.interviewId))
        .orderBy(UserAnser.id);

      setFeedback(result); // Store feedback in state
    };

    fetchFeedback();
  }, [params?.interviewId]); // Dependency added

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulations</h2>
      <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
      <h2 className="text-orange-500">
        Your overall interview Rating: <strong>7/10</strong>
      </h2>
      <h2 className="text-sm text-gray-500">
        Find below interview questions along with your feedback and other
        details
      </h2>

      <div className="mt-5">
        {feedback.length > 0 ? (
          feedback.map((item, index) => (
            <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger className="p-2 bg-orange-100 rounded-lg flex justify-between my-2 text-left gap-7 w-full">
                {item.question} <ChevronsUpDown className="h-5 w-5"></ChevronsUpDown>
              </CollapsibleTrigger>
              <CollapsibleContent>
               <div className="flex flex-col gap-2">
                <h2 className="text-red-500 p-2 border rounded-lg "><strong>Rating:</strong>{item.rating}</h2>
                <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900"><strong>Your Answer:</strong>{item.userAns}</h2>
                <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900"><strong>Correct Answer:</strong>{item.correctAns}</h2>
                <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-900"><strong>Correct Answer:</strong>{item.feedback}</h2>
               </div>
              </CollapsibleContent>
            </Collapsible>
          ))
        ) : (
          <p className="text-gray-500">No feedback available.</p>
        )}
      </div>
     <Button>Go Home</Button>
    </div>
  );
}

export default Feedback;
