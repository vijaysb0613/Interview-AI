"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";
import QuestionSection from "./QuestionSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { InterviewQuestion } from "@/lib/ai/schemas";

// react-hook-speech-to-text reads `window`/`navigator` at module load time,
// unconditionally - it crashes if evaluated during SSR, so this component
// must be excluded from the server bundle entirely, not just marked "use client".
const RecordAnswerSection = dynamic(() => import("./RecordAnswerSection"), { ssr: false });

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
          <ErrorBoundary
            resetKeys={[activeQuestionIndex]}
            fallback={
              <p className="text-red-600 text-center p-4">
                Something went wrong with the webcam or microphone. Please check your browser
                permissions and refresh the page.
              </p>
            }
          >
            <RecordAnswerSection
              activeQuestionIndex={activeQuestionIndex}
              MockInterviewQuestion={questions}
              interviewData={interviewData}
            />
          </ErrorBoundary>

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
