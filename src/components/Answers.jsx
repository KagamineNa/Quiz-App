import Question from "../question.js";
import { useRef } from "react";
export default function Answers({
  currentQuestionIndex,
  userAnswer,
  answerState,
  handleAnswer,
}) {
  const suffledAnswer = useRef();
  if (!suffledAnswer.current) {
    suffledAnswer.current = [...Question[currentQuestionIndex].answers];
    suffledAnswer.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
      {suffledAnswer.current.map((answer) => {
        const isSelected = userAnswer === answer;
        let cssClass = "";
        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }
        return (
          <li key={answer} className="answer">
            <button
              className={cssClass}
              onClick={() => handleAnswer(answer)}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
