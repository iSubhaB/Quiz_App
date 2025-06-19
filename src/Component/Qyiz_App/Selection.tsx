import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Css_File/Selection.css";

export const Quiz_App = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>("");
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const selectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const PassValue = () => {
    if (category === "") {
      alert("Please select a category.");
    } else {
      setShowConfirm(true);
    }
  };

  const ConfirmSubmit = () => {
    navigate(`/question/${category}`);
  };

  const CancelSubmit = () => {
    setShowConfirm(false);
  };

  return (
    <div className="quiz-background container-fluid d-flex align-items-center justify-content-center min-vh-100">
      <div className="quiz-card card text-light shadow-lg p-5 rounded-4" style={{ maxWidth: "700px", width: "100%" }}>
        <div className="card-body text-center">
          <h1 className="card-title fw-bold mb-4 display-5 text-warning">
            🌐 Welcome to Quiz World
          </h1>

          <p className="card-text lead mb-4 fs-5">
            You will get <strong>10 questions</strong>. Each question carries <strong>1 mark</strong>.<br />
            Minimum pass marks: <strong>8</strong>.
          </p>

          <div className="mb-4 text-start">
            <label htmlFor="category" className="form-label fs-5 text-light">Select Category:</label>
            <select
              id="category"
              className="form-select form-select-lg bg-dark text-light border-light"
              onChange={selectValue}
              value={category}
            >
              <option value="">-- Select --</option>
              <option value="Geography">Geography</option>
              <option value="General Knowledge">General Knowledge</option>
              <option value="Science: Computers">Science: Computers</option>
              <option value="Science: Mathematics">Science: Mathematics</option>
            </select>
          </div>

          <button className="btn btn-lg btn-outline-warning px-5 py-2" onClick={PassValue}>
            Start Quiz
          </button>
        </div>

        {showConfirm && (
          <div className="confirmation-box mt-4 p-4 bg-dark text-light rounded-3 border border-warning">
            <p className="mb-3 fs-5">You selected <strong>{category}</strong>. Do you want to confirm?</p>
            <div className="d-flex justify-content-center gap-4">
              <button className="btn btn-success btn-lg px-4" onClick={ConfirmSubmit}>Confirm</button>
              <button className="btn btn-danger btn-lg px-4" onClick={CancelSubmit}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
