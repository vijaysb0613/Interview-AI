"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Button } from "../../../../../../components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { model } from "../../../../../../GeminiAIModal";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "../../../../../../utils/db";
import { UserAnser } from "../../../../../../utils/schema";
function RecordAnswerSection({
  activeQuestionIndex,
  MockInterviewQuestion,
  interviewData,
}) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  const [userAnswer, setUserAnswer] = useState("");

  const StartStopRecording = () => {
    if (isRecording) {
      setLoading(true);
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const UpdateUserAnswer = async () => {
    setLoading(true);
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
    console.log(userAnswer);
    const FeedBackPrompt =
      "Question:" +
      MockInterviewQuestion[activeQuestionIndex]?.question +
      ", UserAnser:" +
      userAnswer +
      "Depending on the given Question And User Answer give a rating for 10 and feedback of improvement in 3 to 5 lines in json format with rating field and feedback field";
    const result = await chatSession.sendMessage(FeedBackPrompt);
    const mockJsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(mockJsonResponse);
    const JsonFeedbackResp = JSON.parse(mockJsonResponse);
    console.log(interviewData.mockId)
    const resp = await db.insert(UserAnser).values({
      mockIdRef: interviewData?.mockId,
      question: MockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: MockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress.emailAddress,
      createdAt: moment().format("DD-MM-yyyy"),
    });
    if (resp) {
      toast("User Answer Recorded Sucessfully");
    }
    setUserAnswer("");
    setLoading(false);
  };

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
      <Button disabled={loading} variant="outline" onClick={StartStopRecording}>
        {isRecording ? (
          <h2 className="text-red-600">
            <Mic /> Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
      <Button onClick={console.log(userAnswer)}>Show Answer</Button>
    </div>
  );
}

export default RecordAnswerSection;
