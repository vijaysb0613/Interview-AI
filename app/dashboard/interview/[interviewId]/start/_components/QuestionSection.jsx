import React from 'react';

function QuestionSection({ MockInterviewQuestion }) {
    console.log("Received MockInterviewQuestion:", MockInterviewQuestion);
    return (
      <div className="p-5 border rounded-lg">
        {MockInterviewQuestion &&
          MockInterviewQuestion.map((item, index) => (
            <div key={index} className="mb-3">
              <h2>Question #{index + 1}</h2>
              <p>{item.question}</p>
            </div>
          ))}
      </div>
    );
  }
  

export default QuestionSection;
