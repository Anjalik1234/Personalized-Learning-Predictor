import React, { useState } from "react";
import "./EducationalBackground.css";

export default function EducationalBackground({ onBack, onContinue }) {
  const [formData, setFormData] = useState({
    branch: "",
    standard: "",
    skills: []
  });

  const [error, setError] = useState("");

  const skillOptions = [
    "Data Structures & Algorithms",
    "Web Development", 
    "Machine Learning",
    "App Development",
    "Cloud Computing",
    "Cybersecurity",
    "Database Management",
    "DevOps",
    "UI/UX Design",
    "Blockchain",
    "Artificial Intelligence",
    "Game Development"
  ];

  const branchOptions = [
    "Computer Science Engineering",
    "Information Technology",
    "Electronics & Communication",
    "Artificial Intelligence and Machine Learning",
    "Electronics and computer engineering"
  ];

  const standardOptions = [
    "First Year (FE)",
    "Second Year (SE)",
    "Third Year (TE)",
    "Final Year (BE)"
  ];

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
    setError("");
  };

  const handleDropdownChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError("");
  };

  const handleContinue = () => {
    if (!formData.branch || !formData.standard || formData.skills.length === 0) {
      setError("Please fill in all fields and select at least one skill to continue");
      return;
    }
    
    console.log("Educational Background Data:", formData);
    if (onContinue) {
      onContinue(formData);
    }
  };

  return (
    <div className="educational-background-container">
      <div className="background-form">
        <h1>Educational Background</h1>
        <p className="subtitle">Tell us about your academic journey and technical interests</p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label>Branch/Technical Field</label>
              <div className="dropdown-wrapper">
                <select
                  value={formData.branch}
                  onChange={(e) => handleDropdownChange('branch', e.target.value)}
                  className="dropdown"
                >
                  <option value="">Select your branch</option>
                  {branchOptions.map((branch, index) => (
                    <option key={index} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Standard</label>
              <div className="dropdown-wrapper">
                <select
                  value={formData.standard}
                  onChange={(e) => handleDropdownChange('standard', e.target.value)}
                  className="dropdown"
                >
                  <option value="">Select standard</option>
                  {standardOptions.map((standard, index) => (
                    <option key={index} value={standard}>{standard}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="skills-section">
            <label>Technical Skills & Interests</label>
            <div className="skills-input">
              <input
                type="text"
                placeholder="Type a skill or select from suggestions"
                className="skills-input-field"
                readOnly
              />
            </div>

            <div className="skills-grid">
              {skillOptions.map((skill, index) => (
                <button
                  key={index}
                  type="button"
                  className={`skill-tag ${formData.skills.includes(skill) ? 'selected' : ''}`}
                  onClick={() => handleSkillToggle(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="back-button"
            onClick={onBack}
          >
            Back to Home
          </button>

          <button
            type="button"
            className="continue-button"
            onClick={handleContinue}
          >
            Continue to Quiz
          </button>
        </div>

        <p className="form-note">
          Please fill in all fields and select at least one skill to continue
        </p>
      </div>
    </div>
  );
}