"use client";
import React, { useEffect, useState, useTransition } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Button } from "../../../../../../components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { submitAnswerAction } from "../../../../../../actions/answer-actions";
import type { InterviewQuestion } from "../../../../../../lib/ai/schemas";

interface RecordAnswerSectionProps {
  activeQuestionIndex: number;
  MockInterviewQuestion: InterviewQuestion[];
  interviewData: { mockId: string };
}

function RecordAnswerSection({
  activeQuestionIndex,
  MockInterviewQuestion,
  interviewData,
}: RecordAnswerSectionProps) {
  const [isPending, startTransition] = useTransition();
  const {
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  const [userAnswer, setUserAnswer] = useState("");

  const StartStopRecording = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      setUserAnswer("");
      setResults([]);
      startSpeechToText();
    }
  };

  useEffect(() => {
    setUserAnswer(
      results.map((result) => (typeof result === "string" ? result : result.transcript)).join(" ")
    );
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.trim().length > 10) {
      const question = MockInterviewQuestion[activeQuestionIndex];
      const answerToSubmit = userAnswer;
      startTransition(async () => {
        const result = await submitAnswerAction({
          mockId: interviewData.mockId,
          question: question?.question ?? "",
          correctAnswer: question?.answer,
          userAnswer: answerToSubmit,
        });
        if (result.status === "error") {
          toast.error(result.message);
          return;
        }
        toast.success("User Answer Recorded Successfully");
        setUserAnswer("");
        setResults([]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col  justify-center items-center bg-slate-100 rounded-lg p-4 my-12 flex-wrap">
        <Image
          src="/webcam.jpg"
          width={200}
          height={200}
          alt="Webcam"
          className="absolute"
        />

        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button disabled={isPending} variant="outline" onClick={StartStopRecording}>
        {isRecording ? (
          <h2 className="text-red-600">
            <Mic /> Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
