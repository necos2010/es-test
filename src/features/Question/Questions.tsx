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

  // Handle selecting checkbox (only one option allowed)
  const handleOptionChange = (option: string) => {
    // Prevent unchecking (cannot deselect the checked option)
    if (selectedOption === option) return;
    setSelectedOption(option);
  };

  // Handle input change (for input type question)
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const saveAnswer = () => {
    const quiz = quizData[currentQuestion];
    const correctAnswer = quiz.correctAnswer.toLowerCase().trim();
    const userAnswer = selectedOption.toLowerCase().trim();

    // If no answer selected, consider wrong with empty userAnswer
    const isCorrect = correctAnswer === userAnswer && userAnswer !== "";

    // Save answer
    setAnswers((prev) => {
      // Replace answer if already exists for current question (when going back and changing)
      const updated = [...prev];
      updated[currentQuestion] = { isCorrect, userAnswer: selectedOption, correctAnswer: quiz.correctAnswer };
      return updated;
    });
  };

  const handleNext = () => {
    // Save current answer even if none selected (treated as wrong)
    saveAnswer();

    if (currentQuestion < quizData.length - 1) {
      // Move next
      setCurrentQuestion((prev) => prev + 1);
      // Set selected option to previously saved answer if exists
      setSelectedOption(answers[currentQuestion + 1]?.userAnswer || "");
    } else {
      // Finish - navigate with answers
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
    // Save current answer before going back
    saveAnswer();
    setCurrentQuestion((prev) => prev - 1);
    setSelectedOption(answers[currentQuestion - 1]?.userAnswer || "");
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
    <button className="nav-button prev-button" onClick={handlePrevious}>
      ⬅ Previous
    </button>
  )}

  <button className="nav-button next-button" onClick={handleNext}>
    {currentQuestion < quizData.length - 1 ? "Next ➡" : "Finish ✅"}
  </button>
</div>

    </div>
  );
}

export default Questions;
