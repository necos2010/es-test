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
                <td data-label="#"> {q.id} </td>
                <td data-label="Question"> {q.question} </td>
                <td data-label="Your Answer"> {answer?.userAnswer || "—"} </td>
                <td data-label="Correct Answer"> {answer?.correctAnswer} </td>
                <td data-label="Result"> {answer?.isCorrect ? "✅" : "❌"} </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Link to="/">
        <button className="back-btn">🏠 Home</button>
      </Link>
    </div>
  );
}

export default MyAnswers;
