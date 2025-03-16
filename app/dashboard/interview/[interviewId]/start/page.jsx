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
        {!loading && interviewData ? (
          <RecordAnswerSection
            activeQuestionIndex={activeQuestionIndex}
            MockInterviewQuestion={MockInterviewQuestion}
            interviewData={interviewData}
          />
        ) : (
          <p>Loading interview data...</p>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
