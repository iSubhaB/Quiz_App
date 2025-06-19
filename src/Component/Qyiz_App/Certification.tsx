import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Css_File/Certificatiom.css"
import bgImage from "./Image/Quiz.jpg"
export const Certification = () => {
  const { score } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container mt-5" >
      {!submitted ? (
        < >
          <h2 className="mb-4">Certificate Form</h2>
          <form onSubmit={handleSubmit} className="bg-light p-5 rounded-4 shadow-lg">
  <div className="mb-4">
    <label htmlFor="name" className="form-label fs-5">Full Name:</label>
    <input
      type="text"
      className="form-control form-control-lg"
      id="name"
      name="name"
      required
      value={formData.name}
      onChange={handleChange}
      placeholder="Enter your full name"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="address" className="form-label fs-5">Address:</label>
    <textarea
      className="form-control form-control-lg"
      id="address"
      name="address"
      required
      value={formData.address}
      onChange={handleChange}
      placeholder="Enter your address"
      rows={4}
    />
  </div>

  <div className="mb-4">
    <label htmlFor="phone" className="form-label fs-5">Phone Number:</label>
    <input
      type="tel"
      className="form-control form-control-lg"
      id="phone"
      name="phone"
      required
      pattern="[0-9]{10}"
      value={formData.phone}
      onChange={handleChange}
      placeholder="Enter 10-digit phone number"
    />
  </div>

  <button type="submit" className="btn btn-primary btn-lg w-100">Generate Certificate</button>
</form>

        </>
      ) : (
        <div className="certificate text-center mt-5 p-5 border border-dark rounded shadow-lg bg-white" style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
          <h1 className="mb-4">🎓 Certificate of Achievement</h1>
          <p className="lead">
            This is to certify that <strong>{formData.name}</strong><br />
            residing at <em>{formData.address}</em><br />
            with contact number <strong>{formData.phone}</strong><br />
            has successfully completed the quiz and secured a score of:
          </p>
          <h2 className="display-4 text-success">{score} / 10</h2>
          <p className="mt-4">Date: {new Date().toLocaleDateString()}</p>
        </div>
        
      )}
      <div className="text-center mt-3">
  <button className="btn btn-success" onClick={() => window.print()}>
    🖨️ Print
  </button>
</div>

    </div>
  );
};
