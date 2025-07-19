import React, { useState } from "react";
import "./LearningStyleAssessment.css";

export default function LearningStyleAssessment({ onBack, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: "You're trying to fix a broken device at home. What's your first instinct?",
      options: [
        "Search for a step-by-step video tutorial",
        "Call a friend and ask them to explain how to fix it",
        "Open the device and start figuring it out yourself"
      ]
    },
    {
      id: 2,
      question: "When learning a new skill, you prefer to:",
      options: [
        "Watch demonstrations and visual examples",
        "Listen to explanations and discuss with others",
        "Practice hands-on and learn by doing"
      ]
    },
    {
      id: 3,
      question: "In a meeting, you're most likely to:",
      options: [
        "Take detailed notes and create diagrams",
        "Listen carefully and ask questions",
        "Fidget with objects or doodle while listening"
      ]
    },
    {
      id: 4,
      question: "When studying for an exam, you:",
      options: [
        "Create colorful charts, mind maps, and flashcards",
        "Read aloud or discuss topics with study groups",
        "Use practice tests and hands-on exercises"
      ]
    },
    {
      id: 5,
      question: "You remember information best when:",
      options: [
        "You can see it written down or in pictures",
        "You hear it explained or discuss it",
        "You can practice or experience it directly"
      ]
    },
    {
      id: 6,
      question: "When giving directions, you tend to:",
      options: [
        "Draw a map or use visual landmarks",
        "Explain the route step by step verbally",
        "Walk through the route or use gestures"
      ]
    },
    {
      id: 7,
      question: "In your free time, you enjoy:",
      options: [
        "Reading, watching movies, or browsing visual content",
        "Listening to podcasts, music, or having conversations",
        "Playing sports, crafting, or hands-on activities"
      ]
    },
    {
      id: 8,
      question: "When solving a problem, you:",
      options: [
        "Visualize the solution or draw it out",
        "Talk through the problem with others",
        "Try different approaches until something works"
      ]
    },
    {
      id: 9,
      question: "You learn programming concepts best by:",
      options: [
        "Reading documentation and seeing code examples",
        "Attending lectures or listening to explanations",
        "Writing code and experimenting with it"
      ]
    },
    {
      id: 10,
      question: "When you're confused about something, you:",
      options: [
        "Look for visual aids, diagrams, or examples",
        "Ask someone to explain it to you",
        "Try to work through it practically"
      ]
    }
  ];

  const handleAnswerSelect = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Quiz completed
      handleComplete();
    }
  };

  const handleComplete = () => {
    const results = calculateResults();
    console.log("Quiz completed! Results:", results);
    if (onComplete) {
      onComplete({ answers, results });
    }
  };

  const calculateResults = () => {
    const scores = { visual: 0, auditory: 0, kinesthetic: 0 };
    
    Object.values(answers).forEach(answerIndex => {
      if (answerIndex === 0) scores.visual++;
      else if (answerIndex === 1) scores.auditory++;
      else if (answerIndex === 2) scores.kinesthetic++;
    });

    const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const percentages = {
      visual: Math.round((scores.visual / total) * 100) || 0,
      auditory: Math.round((scores.auditory / total) * 100) || 0,
      kinesthetic: Math.round((scores.kinesthetic / total) * 100) || 0
    };

    const dominantStyle = Object.keys(percentages).reduce((a, b) => 
      percentages[a] > percentages[b] ? a : b
    );

    return { scores, percentages, dominantStyle };
  };

  const answeredQuestions = Object.keys(answers).length;
  const isAnswered = answers.hasOwnProperty(currentQuestion);

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="quiz-header">
          <div className="quiz-icon">🧠</div>
          <h1>Learning Style Assessment</h1>
          <p className="question-counter">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="question-section">
          <h2 className="question-text">
            {questions[currentQuestion].question}
          </h2>

          <div className="options-list">
            {questions[currentQuestion].options.map((option, index) => (
              <label key={index} className="option-item">
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={index}
                  checked={answers[currentQuestion] === index}
                  onChange={() => handleAnswerSelect(index)}
                />
                <span className="option-text">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="quiz-actions">
          <button
            type="button"
            className="back-button"
            onClick={onBack}
          >
            ← Back to Profile
          </button>

          <div className="progress-info">
            {answeredQuestions} / {questions.length} answered
          </div>

          <button
            type="button"
            className={`next-button ${!isAnswered ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={!isAnswered}
          >
            {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}