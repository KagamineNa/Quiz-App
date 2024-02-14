import { useState, useCallback } from "react";
import Question from "../question.js";
import Summary from "./Summary.jsx";
import QuestionComponent from "./QuestionComponent.jsx";
export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);
  const currentQuestionIndex = userAnswer.length;
  const quizIsCompleted = currentQuestionIndex === Question.length;
  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setUserAnswer((prevAnswer) => {
      return [...prevAnswer, answer];
    });
  }, []);
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsCompleted) {
    return <Summary userAnswer={userAnswer} />;
  }
  return (
    <div id="quiz">
      <QuestionComponent
        key={currentQuestionIndex}
        currentQuestionIndex={currentQuestionIndex}
        onSkipAnswer={handleSkipAnswer}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
}
