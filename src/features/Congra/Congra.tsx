import { useLocation, Link } from "react-router-dom";
import "./Congra.css";
import Header from "../../layouts/Header";

type Answer = {
  isCorrect: boolean;
};

function Congra() {
  const location = useLocation();
  const answers: Answer[] = location.state?.answers || [];
  const totalQuestions = 50;

  const getLevel = (score: number) => {
    if (score <= 8) return "Beginner";
    if (score <= 15) return "Elementary";
    if (score <= 30) return "Pre-Intermediate";
    if (score <= 40) return "Intermediate";
    return "IELTS";
  };

  const score = answers.filter((item) => item.isCorrect).length;
  const level = getLevel(score);

  // Group answers into sets of 10
  const answerGroups = Array.from({ length: 5 }, (_, groupIndex) =>
    answers.slice(groupIndex * 10, (groupIndex + 1) * 10)
  );

  return (
    <div className="congra-container">
      <Header />

      <main className="congra-main">
        <h1 className="congra-title">
          Congratulations <span role="img" aria-label="party">🎉</span>
        </h1>

        <p className="congra-score">
          Total: <strong>{score}</strong>/{totalQuestions}
        </p>

        <p className="congra-level">
          Level: <strong>{level}</strong>
        </p>

        <div className="congra-table-wrapper">
          <table className="congra-answer-table" aria-label="Answer correctness table">
            <tbody>
              {answerGroups.map((group, rowIndex) => (
                <tr key={rowIndex}>
                  {group.map((answer, colIndex) => {
                    const questionNumber = rowIndex * 10 + colIndex + 1;
                    return (
                      <td
                        key={colIndex}
                        className={answer.isCorrect ? "correct" : "wrong"}
                        aria-label={`Question ${questionNumber}: ${answer.isCorrect ? "Correct" : "Wrong"}`}
                      >
                        {questionNumber}. {answer.isCorrect ? "✅" : "❌"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link to="/">
          <button className="back-btn">Back to Home Page</button>
        </Link>
      </main>
    </div>
  );
}

export default Congra;
