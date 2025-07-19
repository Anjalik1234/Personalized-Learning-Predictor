// App.jsx or MainContainer.jsx
import React, { useState } from 'react';
import EducationalBackground from './EducationalBackground';
import LearningStyleAssessment from './LearningStyleAssessment';
import axios from 'axios';

export default function App() {
  const [backgroundData, setBackgroundData] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [result, setResult] = useState(null);

  const handleContinueFromBackground = (data) => {
    setBackgroundData(data);
    setShowQuiz(true);
  };

  const handleQuizComplete = async ({ answers }) => {
    // Convert quiz answer indices (0, 1, 2) to A, B, C
    const quiz_responses = Object.values(answers).map((val) => {
      if (val === 0) return "A";
      if (val === 1) return "B";
      if (val === 2) return "C";
      return "";
    });

    const payload = {
      academic_year: backgroundData.standard,
      branch: backgroundData.branch,
      quiz_responses: quiz_responses,
      skills: backgroundData.skills
    };

    try {
      const res = await axios.post("http://localhost:5000/predict", payload);
      setResult(res.data);
    } catch (err) {
      console.error("Error sending to ML model:", err);
    }
  };

  return (
    <div>
      {!backgroundData ? (
        <EducationalBackground onContinue={handleContinueFromBackground} />
      ) : (
        <LearningStyleAssessment
          onBack={() => {
            setShowQuiz(false);
            setBackgroundData(null);
          }}
          onComplete={handleQuizComplete}
        />
      )}

      {result && (
        <div className="result-box">
          <h2>Prediction Result:</h2>
          <p>Visual: {result.visual_percent}%</p>
          <p>Auditory: {result.auditory_percent}%</p>
          <p>Kinesthetic: {result.kinesthetic_percent}%</p>
        </div>
      )}
    </div>
  );
}