import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [emailText, setEmailText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [selectedTone, setSelectedTone] = useState('formal');
  const [editedReply, setEditedReply] = useState('');

  const handleAnalyze = async () => {
    if (!emailText.trim()) {
      setError('Please paste an email to analyze');
      return;
    }

    if (emailText.length < 10) {
      setError('Email text is too short. Please provide more content.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('http://localhost:5001/api/analyze-email', {
        email_text: emailText
      });

      setResult(response.data);
      setEditedReply(response.data.replies.formal);
      setSelectedTone('formal');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToneChange = (tone) => {
    setSelectedTone(tone);
    if (result && result.replies[tone]) {
      setEditedReply(result.replies[tone]);
    }
  };

  const handleCopyReply = () => {
    navigator.clipboard.writeText(editedReply);
    alert('Reply copied to clipboard!');
  };

  const handleReset = () => {
    setEmailText('');
    setResult(null);
    setError('');
    setEditedReply('');
    setSelectedTone('formal');
  };

  const getIntentColor = (intent) => {
    const colors = {
      'Inquiry': '#3B82F6',      // Blue
      'Complaint': '#EC4899',    // Magenta
      'Offer': '#F59E0B',        // Orange
      'Information': '#EAB308'   // Yellow
    };
    return colors[intent] || '#3B82F6';
  };

  return (
    <div className="App">
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <div className="logo-icon">⚡</div>
            <h1>Spark.ai Email Assistant</h1>
          </div>
          <p className="subtitle">AI-Powered Email Reply Generator</p>
        </header>

        {/* Main Content */}
        <div className="main-content">
          {/* Input Section */}
          <div className="input-section">
            <label className="label">
              <span className="label-text">📧 Paste Incoming Email</span>
            </label>
            <textarea
              className="email-input"
              placeholder="Paste the email you received here..."
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              rows="8"
            />
            
            <div className="button-group">
              <button 
                className="btn btn-primary" 
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading ? '🔄 Analyzing...' : '🚀 Generate Reply'}
              </button>
              {result && (
                <button className="btn btn-secondary" onClick={handleReset}>
                  🔄 Start New
                </button>
              )}
            </div>

            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* Results Section */}
          {result && (
            <div className="results-section">
              {/* Intent Detection */}
              <div className="intent-card">
                <h3 className="section-title">📊 Detected Intent</h3>
                <div 
                  className="intent-badge"
                  style={{ 
                    backgroundColor: getIntentColor(result.intent) + '20',
                    borderColor: getIntentColor(result.intent),
                    color: getIntentColor(result.intent)
                  }}
                >
                  <span className="intent-type">{result.intent}</span>
                </div>
                <p className="intent-explanation">{result.intent_explanation}</p>
              </div>

              {/* Tone Selector */}
              <div className="tone-selector">
                <h3 className="section-title">🎨 Select Tone</h3>
                <div className="tone-buttons">
                  <button
                    className={`tone-btn ${selectedTone === 'formal' ? 'active formal' : ''}`}
                    onClick={() => handleToneChange('formal')}
                  >
                    👔 Formal
                  </button>
                  <button
                    className={`tone-btn ${selectedTone === 'friendly' ? 'active friendly' : ''}`}
                    onClick={() => handleToneChange('friendly')}
                  >
                    😊 Friendly
                  </button>
                  <button
                    className={`tone-btn ${selectedTone === 'persuasive' ? 'active persuasive' : ''}`}
                    onClick={() => handleToneChange('persuasive')}
                  >
                    💼 Persuasive
                  </button>
                </div>
              </div>

              {/* Reply Editor */}
              <div className="reply-section">
                <div className="reply-header">
                  <h3 className="section-title">✉️ Generated Reply ({selectedTone})</h3>
                  <button className="btn-copy" onClick={handleCopyReply}>
                    📋 Copy Reply
                  </button>
                </div>
                <textarea
                  className="reply-editor"
                  value={editedReply}
                  onChange={(e) => setEditedReply(e.target.value)}
                  rows="12"
                />
                <p className="editor-hint">
                  💡 Tip: You can edit the reply above before copying it
                </p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Analyzing email and generating professional replies...</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>Powered by Spark.ai 🚀 | OpenAI GPT-4</p>
        </footer>
      </div>
    </div>
  );
}

export default App;