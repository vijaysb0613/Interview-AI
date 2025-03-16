"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../../../../utils/db";
import { useParams } from "next/navigation";
import { MockInterview } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "../../../../../components/ui/button";
import Link from "next/link";
function StartInterview() {
  const [interviewData, setInterviewData] = useState(null);
  const [MockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const params = useParams();
  const interviewId = params?.interviewId;
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect triggered, interviewId:", interviewId);
    if (interviewId) {
      GetInterviewData();
    }
  }, [interviewId]);

  const GetInterviewData = async () => {
    try {
      setLoading(true);
      console.log("Fetching interview data...");

      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      console.log("Query result:", result);

      if (result.length > 0) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        const questionsArray = jsonMockResp?.interviewQuestions || [];

        setInterviewData(() => result[0]); // Functional state update
        setMockInterviewQuestion(questionsArray);

        console.log("Updated interviewData:", result[0]);
        console.log("Extracted Questions:", questionsArray);
      } else {
        console.error("No interview data found");
      }
    } catch (error) {
      console.error("Error fetching interview data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Log interviewData when it updates
  useEffect(() => {
    console.log("interviewData after update:", interviewData);
  }, [interviewData]);

  return (
    <div className="relative flex flex-col items-center w-full p-6">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        <div className="md:w-1/2 w-full bg-white p-4 rounded-lg shadow-md">
        <QuestionSection
  activeQuestionIndex={activeQuestionIndex}
  MockInterviewQuestion={MockInterviewQuestion}
  onSelectQuestion={setActiveQuestionIndex} // <-- Pass the function
/>
        </div>
  
        {/* Right Section - Answer Recording (Includes Buttons) */}
        <div className="md:w-1/2 w-full bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
          {!loading && interviewData ? (
            <RecordAnswerSection
              activeQuestionIndex={activeQuestionIndex}
              MockInterviewQuestion={MockInterviewQuestion}
              interviewData={interviewData}
              setActiveQuestionIndex={setActiveQuestionIndex}
            />
          ) : (
            <p className="text-center">Loading interview data...</p>
          )}
  
          {/* Buttons - Centered Under Webcam with Top Margin */}
          <div className="mt-6 flex justify-center gap-3">
            {activeQuestionIndex > 0 && (
              <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
                Previous
              </Button>
            )}
            <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
              Next
            </Button>
            
            
            {activeQuestionIndex==MockInterviewQuestion?.length-1 &&
            <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
            <Button variant="destructive">
              End Interview
            </Button>
            </Link>}
          </div>
        </div>
      </div>
    </div>
  );
  
  
}

export default StartInterview;