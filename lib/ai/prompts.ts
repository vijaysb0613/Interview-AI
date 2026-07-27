export function buildQuestionPrompt({
  jobPosition,
  jobDesc,
  jobExperience,
  questionCount,
}: {
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  questionCount: number;
}): string {
  return (
    `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Job Experience: ${jobExperience} years. ` +
    `Depending on the given job position, job description and job experience, give ${questionCount} interview ` +
    `questions along with answers, in JSON format as {"interviewQuestions": [{"question": "...", "answer": "..."}]}.`
  );
}

export function buildFeedbackPrompt({
  question,
  userAnswer,
}: {
  question: string;
  userAnswer: string;
}): string {
  return (
    `Question: ${question}, User Answer: ${userAnswer}. Depending on the given question and user answer, ` +
    `give a rating out of 10 and feedback for improvement in 3 to 5 lines, in JSON format as ` +
    `{"rating": number, "feedback": "..."}.`
  );
}
