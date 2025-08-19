import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import quizData from "../../data/Quiz";
import "./Question.css";

type Answer = {
  isCorrect: boolean;
  userAnswer: string; // может быть пустым
  correctAnswer: string;
};

function Questions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const navigate = useNavigate();

  // Выбор варианта (повторный клик снимает выбор)
  const handleOptionChange = (option: string) => {
    if (selectedOption === option) {
      setSelectedOption(""); // снимаем выбор
    } else {
      setSelectedOption(option);
    }
  };

  // Для input-вопросов
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  // Сохраняем ответ (может быть пустой)
  const saveAnswer = () => {
    const quiz = quizData[currentQuestion];
    const correctAnswer = quiz.correctAnswer.toLowerCase().trim();
    const userAnswer = selectedOption.toLowerCase().trim();

    const isCorrect = userAnswer !== "" && userAnswer === correctAnswer;

    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = {
        isCorrect,
        userAnswer: selectedOption, // может быть ""
        correctAnswer: quiz.correctAnswer,
      };
      return updated;
    });
  };

  // Следующий вопрос
  const handleNext = () => {
    saveAnswer();

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      // Восстанавливаем предыдущий ответ или пустой
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

  // Предыдущий вопрос
  const handlePrevious = () => {
    if (currentQuestion === 0) return;
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
