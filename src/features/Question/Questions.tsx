import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import quizData from "../../data/Quiz";
import "./Question.css";

type Answer = {
  isCorrect: boolean;
};

function Questions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);

  const navigate = useNavigate();

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleNext = () => {
    if (selectedOption.trim() === "") {
      alert("Please select or enter an answer.");
      return;
    }

    const correctAnswer = quizData[currentQuestion].correctAnswer.toLowerCase().trim();
    const userAnswer = selectedOption.toLowerCase().trim();

    const isCorrect = correctAnswer === userAnswer;

    // Add current question's correctness to answers array
    setAnswers((prevAnswers) => [...prevAnswers, { isCorrect }]);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption("");
    } else {
      // Pass the whole answers array to Congra
      navigate("/congra", {
        state: {
          answers: [...answers, { isCorrect }], // include last answer
          total: quizData.length,
        },
      });
    }
  };

  const quiz = quizData[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="question-box animate-fade">
        <h2 className="question-number">{quiz.id}/50</h2>
        <p className="question-text">{quiz.question}</p>

        <div className="options">
          {quiz.type === "multiple-choice" &&
            quiz.options?.map((option, index) => (
              <label
                key={index}
                className={`option ${selectedOption === option ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name={`question-${quiz.id}`}
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                />
                {option}
              </label>
            ))}

          {quiz.type === "input" && (
            <input
              type="text"
              name={`question-${quiz.id}`}
              className="input-answer"
              placeholder="Type your answer here"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
          )}
        </div>
      </div>

      <button className="confirm-button" onClick={handleNext}>
        {currentQuestion < quizData.length - 1 ? "Next ➡" : "Finish ✅"}
      </button>
    </div>
  );
}

export default Questions;
