import { useState } from "react";
import Question from "../question.js";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
export default function QuestionComponent({
  currentQuestionIndex,
  onSkipAnswer,
  onSelectAnswer,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;
  if (answer.selectedAnswer) {
    timer = 1000;
  }
  if (answer.isCorrect !== null) {
    timer = 2000;
  }
  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: Question[currentQuestionIndex].answers[0] === answer,
      });
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }
  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }
  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeOut={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{Question[currentQuestionIndex].text}</h2>
      <Answers
        currentQuestionIndex={currentQuestionIndex}
        userAnswer={answer.selectedAnswer}
        answerState={answerState}
        handleAnswer={handleSelectAnswer}
      />
    </div>
  );
}
