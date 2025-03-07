import { Lightbulb } from "lucide-react";
import React from "react";

function QuestionSection({ MockInterviewQuestion, activeQuestionIndex }) {
  console.log("Received MockInterviewQuestion:", MockInterviewQuestion);
  console.log("Active Index:", activeQuestionIndex);

  return (
    MockInterviewQuestion && (
      <div className="p-5 border rounded-lg mt-10 space-y-5">
        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MockInterviewQuestion.map((item, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg text-center font-semibold cursor-pointer transition-all duration-200 ${
                activeQuestionIndex === index
                  ? "bg-orange-500 text-white shadow-lg scale-105"
                  : "bg-secondary text-gray-900 hover:bg-gray-200"
              }`}
            >
              Question #{index + 1}
            </div>
          ))}
        </div>

        {/* Selected Question Display */}
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-800">
            {MockInterviewQuestion[activeQuestionIndex]?.question ||
              "Select a question to view"}
          </h2>
        </div>

        {/* Note Section */}
        <div className="border rounded-lg bg-blue-50 p-4">
          <h2 className="flex gap-2 items-center text-blue-700 font-semibold">
            <Lightbulb />
            <strong>Note</strong>
          </h2>
          <p className="text-sm text-blue-600 mt-1">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE || "No additional notes available."}
          </p>
        </div>
      </div>
    )
  );
}

export default QuestionSection;
