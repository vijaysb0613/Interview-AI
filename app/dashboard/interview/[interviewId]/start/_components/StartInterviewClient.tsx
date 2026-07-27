"use client";
import React, { useState } from "react";
import QuestionSection from "./QuestionSection";
import RecordAnswerSection from "./RecordAnswerSection";
import { Button } from "../../../../../../components/ui/button";
import Link from "next/link";
import type { InterviewQuestion } from "../../../../../../lib/ai/schemas";

interface StartInterviewClientProps {
  interviewData: {
    mockId: string;
    jobPosition: string;
    jobDesc: string;
    jobExperience: string;
  };
  questions: InterviewQuestion[];
}

export default function StartInterviewClient({ interviewData, questions }: StartInterviewClientProps) {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  return (
    <div className="relative flex flex-col items-center w-full p-6">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        <div className="md:w-1/2 w-full bg-white p-4 rounded-lg shadow-md">
          <QuestionSection
            activeQuestionIndex={activeQuestionIndex}
            MockInterviewQuestion={questions}
            onSelectQuestion={setActiveQuestionIndex}
          />
        </div>

        {/* Right Section - Answer Recording (Includes Buttons) */}
        <div className="md:w-1/2 w-full bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
          <RecordAnswerSection
            activeQuestionIndex={activeQuestionIndex}
            MockInterviewQuestion={questions}
            interviewData={interviewData}
          />

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

            {activeQuestionIndex === questions.length - 1 && (
              <Link href={`/dashboard/interview/${interviewData.mockId}/feedback`}>
                <Button variant="destructive">
                  End Interview
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
