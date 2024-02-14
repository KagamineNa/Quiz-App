import QuizCompleted from "../assets/quiz-complete.png";
import QUESTION from "../question.js";
export default function Summary({ userAnswer }) {
  const skippedAnswer = userAnswer.filter((answer) => answer === null);
  const correctAnswer = userAnswer.filter(
    (answer, index) => answer === QUESTION[index].answers[0]
  );
  const skippedRate = Math.round(
    (skippedAnswer.length / userAnswer.length) * 100
  );
  const correctRate = Math.round(
    (correctAnswer.length / userAnswer.length) * 100
  );
  const incorrectRate = 100 - skippedRate - correctRate;

  return (
    <div id="summary">
      <img src={QuizCompleted} alt="Quiz complete" />
      <h2>Quizz Completed</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedRate}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{correctRate}%</span>
          <span className="text">Answered correctly</span>
        </p>
        <p>
          <span className="number">{incorrectRate}%</span>
          <span className="text">Answered Incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswer.map((answer, index) => {
          let cssClass = "user-answer";
          if (answer === null) cssClass += " skipped";
          else if (answer === QUESTION[index].answers[0])
            cssClass += " correct";
          else cssClass += " wrong";
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTION[index].text}</p>
              <p className={cssClass}>{answer ? answer : "skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
