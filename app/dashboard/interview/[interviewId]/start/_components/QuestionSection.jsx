import { Lightbulb } from "lucide-react";
import React from "react";

function QuestionSection({ MockInterviewQuestion, activeQuestionIndex }) {
  console.log("Received MockInterviewQuestion:", MockInterviewQuestion);
  console.log("Active Index:", activeQuestionIndex);

  return MockInterviewQuestion&&(
    <div className="p-5 border rounded-lg mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {MockInterviewQuestion &&
        MockInterviewQuestion.map((item, index) => (
          <div key={index} className="mb-3 p-2 bg-secondary rounded-full text-center">
            <h2
              className={`cursor-pointer ${
                activeQuestionIndex === index ? "bg-orange-400 text-white" : ""
              }`}
            >
              Question #{index + 1}
            </h2>
           
          </div>
        ))
        }
         <h2 className="my-5 text-sm md:text-md ">{MockInterviewQuestion[activeQuestionIndex]?.question}</h2>
         <div className="border rounded-lg bg-blue-100">
          <h2 className="flex gap-2 items-center text-primary">
            <Lightbulb />
            <strong>Note</strong>
          </h2>
         </div>
    </div>
  );
}

export default QuestionSection;
