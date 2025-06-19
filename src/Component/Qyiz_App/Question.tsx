import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Css_File/Question.css";

export const Question_Quiz = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);
  const [selectedValues, setSelectedValues] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { catagory } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let Api = "";

    if (catagory === "Geography") {
      Api = "https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple";
    } else if (catagory === "General Knowledge") {
      Api = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
    } else if (catagory === "Science: Computers") {
      Api = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
    } else if (catagory === "Science: Mathematics") {
      Api = "https://opentdb.com/api.php?amount=10&category=19&difficulty=easy&type=multiple";
    }

    axios
      .get(Api)
      .then((res) => {
        const questionsWithShuffledOptions = res.data.results.map((q: any) => {
          const shuffled = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
          return { ...q, shuffledOptions: shuffled };
        });
        setShuffledQuestions(questionsWithShuffledOptions);
      })
      .catch(() => {
        console.log("Error fetching data");
      });
  }, [catagory]);



  const handleSelection = (questionIndex: number, option: string) => {
  setSelectedValues({
    ...selectedValues,
    [questionIndex]: option,
  });
};

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Check if any question is unanswered
   const unanswered = shuffledQuestions.some((_, index) => !selectedValues[index]);
  if (unanswered) {
    setMessage("⚠️ Please answer all questions before submitting.");
    return;
  }

  let score = 0;
  shuffledQuestions.forEach((question, index) => {
    if (selectedValues[index] === question.correct_answer) {
      score++;
    }
  });
  setScore(score);

  if (score >= 8) {
    setMessage(`Your score is - ${score} / 10. 🎉 Great job — you passed!`);
  } else {
    setMessage(`Your score is - ${score} / 10. ❌ Sorry — you did not pass. Try again!`);
  }
};


  const BackPage = () => {
    window.history.back();
  };

  const CertificatePass = () => {
    navigate(`/certificate/${score}`);
  };

  return (
    <div className="container-fluid min-vh-100 bg-light py-5 px-4">
      <div className="mx-auto bg-white p-5 shadow-lg rounded-4" style={{ maxWidth: '1200px' }}>
        <h2 className="text-center mb-5 fs-1 text-primary">Quiz - {catagory}</h2>

        <form onSubmit={handleSubmit}>
          <ol className="list-group list-group-numbered">
            {shuffledQuestions.map((item, index) => (
              <li key={index} className="list-group-item bg-white border rounded-4 p-4 mb-4">
                <div
                  dangerouslySetInnerHTML={{ __html: `${index + 1}. ${item.question}` }}
                  className="fw-bold fs-4 mb-3"
                />
                <div className="ms-3">
                  {item.shuffledOptions.map((option: string, i: number) => (
                    <div key={i} className="form-check text-start mb-3">
                      <input
                        className="form-check-input fs-5 me-2"
                        type="radio"
                        name={`question-${index}`}
                        id={`q${index}-option${i}`}
                        value={option}
                        checked={selectedValues[index] === option}
                        onChange={() => handleSelection(index, option)}
                      />
                      <label className="form-check-label fs-5" htmlFor={`q${index}-option${i}`}>
                        <span dangerouslySetInnerHTML={{ __html: option }} />
                      </label>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>

          <div className="d-flex justify-content-between mt-5">
            <button type="submit" className="btn btn-primary btn-lg px-5">Submit</button>
            <button type="button" className="btn btn-outline-secondary btn-lg px-5" onClick={BackPage}>
              Back
            </button>
          </div>
        </form>

        <div className="alert alert-info text-center mt-5 fs-4">
          {message || "Minimum Pass Mark: 8"}
        </div>

        {score !== null && (
          <div className="alert alert-success text-center fs-4 mt-4">
            ✅ <strong>Your Score:</strong> {score} / 10
          </div>
        )}

        <div className="text-center mt-4">
          <button className="btn btn-success btn-lg px-5" onClick={CertificatePass}>
            Get Certificate
          </button>
        </div>
      </div>
    </div>
  );
};
