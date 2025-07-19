import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/login";
import EducationalBackground from "./components/EducationalBackground";
import LearningStyleAssessment from "./components/LearningStyleAssessment";
import LearningProfile from "./components/LearningProfile";
//import "./App.css";

// Wrapper component to provide navigation context
function AppContent() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [assessmentResults, setAssessmentResults] = useState(null);

  const handleAccountCreated = (loginData) => {
    setUserData(prev => ({ ...prev, ...loginData }));
    navigate("/educational-background");
  };

  const handleBackToLogin = () => {
    navigate("/");
  };

  const handleEducationalComplete = (educationalData) => {
    setUserData(prev => ({ ...prev, ...educationalData }));
    navigate("/learning-assessment");
  };

  const handleBackToEducational = () => {
    navigate("/educational-background");
  };

  const handleQuizComplete = (quizData) => {
    const completeUserData = { ...userData, ...quizData };
    setUserData(completeUserData);
    setAssessmentResults(quizData);
    console.log("Complete registration data:", completeUserData);
    
    // Navigate to the learning profile results page
    navigate("/learning-profile");
  };

  const handleBackToHome = () => {
    navigate("/");
    setUserData({});
    setAssessmentResults(null);
  };

  const handleRetakeAssessment = () => {
    navigate("/learning-assessment");
    setAssessmentResults(null);
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={<Login onAccountCreated={handleAccountCreated} />} 
      />
      <Route 
        path="/educational-background" 
        element={
          <EducationalBackground
            onBack={handleBackToLogin}
            onContinue={handleEducationalComplete}
          />
        } 
      />
      <Route 
        path="/learning-assessment" 
        element={
          <LearningStyleAssessment
            onBack={handleBackToEducational}
            onComplete={handleQuizComplete}
          />
        } 
      />
      <Route 
        path="/learning-profile" 
        element={
          <LearningProfile
            assessmentResults={assessmentResults}
            educationalData={userData}
            userName={userData.name || userData.email || "Demo User"}
            onBackToHome={handleBackToHome}
            onRetakeAssessment={handleRetakeAssessment}
          />
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
