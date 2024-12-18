import React from 'react';

function QuestionSection({ MockInterviewQuestion }) {
  return (
    <div className="p-5 border rounded-lg">
      {MockInterviewQuestion &&
        MockInterviewQuestion.map((question, index) => (
            <h2>Question #{index + 1}</h2>
        ))}
    </div>
  );
}

export default QuestionSection;
