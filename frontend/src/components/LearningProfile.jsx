import React from 'react';
import './LearningProfile.css';

export default function LearningProfile({ 
  assessmentResults, 
  educationalData, 
  onBackToHome, 
  onRetakeAssessment,
  userName = "Demo User" 
}) {
  const { results } = assessmentResults || {};
  const { percentages, dominantStyle } = results || {};

  const getLearningStyleInfo = (style) => {
    const styles = {
      visual: {
        icon: '👁️',
        title: 'Visual Learner',
        description: 'You learn best through seeing and visualizing information'
      },
      auditory: {
        icon: '🎧',
        title: 'Auditory Learner', 
        description: 'You learn best through listening and verbal instruction'
      },
      kinesthetic: {
        icon: '🤲',
        title: 'Kinesthetic Learner',
        description: 'You learn best through hands-on activities and movement'
      }
    };
    return styles[style] || styles.visual;
  };

  const styleInfo = getLearningStyleInfo(dominantStyle);

  const getRecommendedFormats = (dominantStyle) => {
    const formats = {
      visual: [
        'Video-based courses with rich animations',
        'Infographic-rich tutorials and guides',
        'YouTube playlists with visual demonstrations',
        'Slide decks and visual case studies',
        'Mind maps and flowcharts',
        'Interactive diagrams and charts'
      ],
      auditory: [
        'Podcast-based learning content',
        'Audio lectures and discussions',
        'Study groups and verbal explanations',
        'Voice-recorded tutorials',
        'Music-enhanced learning sessions',
        'Verbal repetition and discussions'
      ],
      kinesthetic: [
        'Hands-on coding projects',
        'Interactive labs and simulations',
        'Physical models and manipulatives',
        'Role-playing and practical exercises',
        'Building and construction activities',
        'Movement-based learning games'
      ]
    };
    return formats[dominantStyle] || formats.visual;
  };

  const getSuggestedPlatforms = (dominantStyle) => {
    const platforms = {
      visual: [
        'Coursera (Visual courses)',
        'Khan Academy',
        'YouTube Educational Channels',
        'Udemy (Video-heavy courses)',
        'Pluralsight'
      ],
      auditory: [
        'Audible Learning',
        'Podcast platforms',
        'Spotify Educational',
        'iTunes U',
        'TED Talks Audio'
      ],
      kinesthetic: [
        'Codecademy (Interactive)',
        'freeCodeCamp',
        'Hands-on Labs',
        'GitHub Projects',
        'Practical Workshops'
      ]
    };
    return platforms[dominantStyle] || platforms.visual;
  };

  return (
    <div className="learning-profile-container">
      <div className="profile-card">
        {/* Welcome Header */}
        <div className="welcome-header">
          <div className="welcome-message">
            <h1>Welcome, {userName}! 🎉</h1>
            <p>Your personalized learning profile is ready</p>
          </div>
        </div>

        {/* Learning Style Results */}
        <div className="learning-style-section">
          <div className="dominant-style">
            <div className="style-icon">{styleInfo.icon}</div>
            <div className="style-info">
              <h2>{styleInfo.title}</h2>
              <p>{styleInfo.description}</p>
            </div>
          </div>

          <div className="style-percentages">
            <div className="percentage-item visual">
              <div className="percentage-icon">👁️</div>
              <div className="percentage-info">
                <span className="style-name">Visual</span>
                <span className="percentage">{percentages?.visual || 0}%</span>
              </div>
            </div>
            <div className="percentage-item auditory">
              <div className="percentage-icon">🎧</div>
              <div className="percentage-info">
                <span className="style-name">Auditory</span>
                <span className="percentage">{percentages?.auditory || 0}%</span>
              </div>
            </div>
            <div className="percentage-item kinesthetic">
              <div className="percentage-icon">🤲</div>
              <div className="percentage-info">
                <span className="style-name">Kinesthetic</span>
                <span className="percentage">{percentages?.kinesthetic || 0}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="user-profile-section">
          <h3>📋 Your Profile</h3>
          <div className="profile-details">
            <div className="profile-item">
              <span className="profile-label">Education</span>
              <span className="profile-value">
                {educationalData?.branch || 'Not specified'} - {educationalData?.standard || 'Not specified'}
              </span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Technical Skills</span>
              <div className="skills-list">
                {educationalData?.skills?.map((skill, index) => (
                  <span key={index} className="skill-badge">{skill}</span>
                )) || <span>No skills specified</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="recommendations-section">
          <div className="recommendation-column">
            <h3>📚 Recommended Learning Formats</h3>
            <ul className="recommendation-list">
              {getRecommendedFormats(dominantStyle).map((format, index) => (
                <li key={index}>
                  <span className="bullet">•</span>
                  {format}
                </li>
              ))}
            </ul>
          </div>

          <div className="recommendation-column">
            <h3>📱 Suggested Platforms</h3>
            <ul className="recommendation-list">
              {getSuggestedPlatforms(dominantStyle).map((platform, index) => (
                <li key={index}>
                  <span className="bullet">•</span>
                  {platform}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <p>Ready to start your personalized learning journey?</p>
          <div className="action-buttons">
            <button className="primary-button">
              📥 Download Learning Plan
            </button>
            <button className="secondary-button">
              👥 Find Study Groups
            </button>
            <button className="secondary-button" onClick={onRetakeAssessment}>
              🔄 Retake Assessment
            </button>
            <button className="back-button" onClick={onBackToHome}>
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
