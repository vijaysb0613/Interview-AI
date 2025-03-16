"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../../../../utils/db";
import { useParams } from "next/navigation";
import { MockInterview } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
function StartInterview() {
  const [interviewData, setInterviewData] = useState(null);
  const [MockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const params = useParams();
  const interviewId = params?.interviewId;
  const [activeQuestionIndex,setActiveQuestionIndex]=useState(0)
  useEffect(() => {
    GetInterviewData();
  }, []);

  const GetInterviewData = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      if (result.length > 0) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log("Parsed Questions:", jsonMockResp);
        const questionsArray = jsonMockResp.interviewQuestions || []; 
        console.log("Extracted Questions:", questionsArray);
        setInterviewData(result[0]);
        setMockInterviewQuestion(questionsArray); 
      } else {
        console.error("No interview data found");
      }
    } catch (error) {
      console.error("Error fetching interview data:", error);
    }

  };

  return (
    <div className="flex flex-row gap-5">
    {/* Left Section - Questions */}
    <div className="w-full md:w-1/2">
      <QuestionSection 
        activeQuestionIndex={activeQuestionIndex}
        MockInterviewQuestion={MockInterviewQuestion} 
      />
    </div>
  
    {/* Right Section - Answer Recording */}
    <div className="w-full md:w-1/2">
      <RecordAnswerSection
        activeQuestionIndex={activeQuestionIndex}
        MockInterviewQuestion={MockInterviewQuestion}
        interviewData={interviewData} />
    </div>
  </div>
  
  );
}

export default StartInterview;
