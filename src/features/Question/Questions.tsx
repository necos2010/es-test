import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import quizData from "../../data/Quiz";
import "./Question.css";

type Answer = {
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string;
};

function Questions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const navigate = useNavigate();

  const handleOptionChange = (option: string) => {
    if (selectedOption === option) {
      setSelectedOption(""); 
    } else {
      setSelectedOption(option);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const saveAnswer = () => {
    const quiz = quizData[currentQuestion];
    const correctAnswer = quiz.correctAnswer.toLowerCase().trim();
    const userAnswer = selectedOption.toLowerCase().trim();

    const isCorrect = userAnswer !== "" && userAnswer === correctAnswer;

    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = {
        isCorrect,
        userAnswer: selectedOption,
        correctAnswer: quiz.correctAnswer,
      };
      return updated;
    });
  };

  const handleNext = () => {
    saveAnswer();

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(answers[currentQuestion + 1]?.userAnswer || "");
    } else {
      navigate("/congra", {
        state: {
          answers,
          total: quizData.length,
        },
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion === 0) return;
    saveAnswer();
    setCurrentQuestion((prev) => prev - 1);
    setSelectedOption(answers[currentQuestion - 1]?.userAnswer || "");
  };

  const quiz = quizData[currentQuestion];

  // Shared text logic
  let sharedText = quiz.text;
  if ([10, 11, 12].includes(quiz.id)) {
    sharedText = quizData[9].text; // question 10's text
  }
  if ([47, 48, 49, 50].includes(quiz.id)) {
    sharedText = quizData[46].text; // question 47's text
  }

  return (
    <div className="quiz-container">
      <div className="question-box animate-fade">
        <h2 className="question-number">{quiz.id}/50</h2>

        {/* Shared text between question number and question text */}
        {sharedText && <div className="shared-text">{sharedText}</div>}

        <p className="question-text">{quiz.question}</p>

        <div className="options">
          {quiz.type === "multiple-choice" &&
            quiz.options?.map((option, index) => (
              <label
                key={index}
                className={`option ${selectedOption === option ? "selected" : ""}`}
                onClick={() => handleOptionChange(option)}
              >
                <input
                  type="checkbox"
                  name={`question-${quiz.id}`}
                  checked={selectedOption === option}
                  readOnly
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
              onChange={handleInputChange}
            />
          )}
        </div>
      </div>

      <div className="nav-buttons">
        {currentQuestion > 0 && (
          <button className="nav-button" onClick={handlePrevious}>
            ⬅ Previous
          </button>
        )}

        <button className="nav-button" onClick={handleNext}>
          {currentQuestion < quizData.length - 1 ? "Next ➡" : "Finish ✅"}
        </button>
      </div>
    </div>
  );
}

export default Questions;
