import { useLocation, Link } from "react-router-dom";
import quizData from "../../data/Quiz";
import "./MyAnswers.css";

type Answer = {
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string;
};

function MyAnswers() {
  const location = useLocation();
  const answers: Answer[] = location.state?.answers || [];

  return (
    <div className="my-answers-container">
      <h1>My Answers</h1>

      <div className="table-wrapper">
        <table className="answers-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Your Answer</th>
              <th>Correct Answer</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {quizData.map((q, index) => {
              const answer = answers[index];
              return (
                <tr key={index}>
                  <td>{q.id}</td>
                  <td>{q.question}</td>
                  <td>{answer?.userAnswer || "—"}</td>
                  <td>{answer?.correctAnswer}</td>
                  <td>{answer?.isCorrect ? "✅" : "❌"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Link to="/">
        <button className="back-btn">🏠 Home</button>
      </Link>
    </div>
  );
}

export default MyAnswers;
