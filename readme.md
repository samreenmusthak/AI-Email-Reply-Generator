# AI Email Reply Generator

A full-stack web application that uses AI to analyze incoming emails and generate professional replies with different tone options.

## Features

- **Intent Detection**: Automatically classifies emails into: Inquiry, Complaint, Offer, or Information
- **AI-Generated Replies**: Creates professional email responses using LLaMA 3.1 AI
- **Tone Customization**: Choose between Formal, Friendly, or Persuasive tones
- **Real-time Processing**: Instant analysis and reply generation

## Tech Stack

- **Frontend**: React.js with modern CSS
- **Backend**: Python Flask
- **AI Provider**: Groq (LLaMA 3.1 model)
- **API Communication**: Axios
- **Styling**: Custom CSS with gradient designs

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- Groq API key (free from [console.groq.com](https://console.groq.com))

### Backend Setup
bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Add your Groq API key to .env file

# Start the server
python app.py
Server runs on: http://localhost:5001

Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
App runs on: http://localhost:3000

Usage

Paste an incoming email into the text area
Click "Generate Reply"
View the detected intent and explanation
Select different tones (Formal, Friendly, Persuasive)
Edit the generated reply as needed in the editable text box
Copy the final version using the "Copy Reply" button

## Sample Test Emails

### Inquiry Email
Subject: Product Information Request

Hi Team,

I came across your AI solutions on your website and I'm quite impressed. Could you please send me more information about your pricing plans and feature details?

Also, I'd like to know about the implementation process and timeline.

Looking forward to your response.

Best regards,
Emily Chen



### Complaint Email
Subject: Poor Customer Service Experience

Dear Support Team,

I'm writing to express my dissatisfaction with the service I received yesterday. The product I purchased last week stopped working, and when I contacted your support, I was put on hold for 30 minutes before being disconnected.

This is completely unacceptable and I expect a prompt resolution and refund.

Sincerely,
Michael Rodriguez



### Offer Email
Subject: Partnership Opportunity

Hello,

I'm reaching out from TechSolutions Inc. We've been following your company's growth in the AI space and are impressed with your innovative approach.

We'd like to explore a potential partnership where we could integrate your AI technology with our platform. This collaboration could benefit both companies by expanding our market reach.

Would you be available for a call next week to discuss this further?

Best regards,
Sarah Johnson
Business Development Manager
TechSolutions Inc.



### Information Email
Subject: System Update Notification

Hello Team,

This is to inform you about our scheduled system maintenance this weekend. The maintenance window will be from Saturday 2:00 AM to Sunday 6:00 AM EST.

During this period, our services may experience temporary interruptions. We apologize for any inconvenience and appreciate your understanding.

Thank you,
IT Department
InnovateCorp


Project Structure

AI-Email-Reply-Generator/
├── backend/
│   ├── app.py                 # Flask server and AI integration
│   ├── requirements.txt       # Python dependencies
│   └── .env.example          # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── App.css           # Styling
│   │   ├── index.js          # React entry point
│   │   └── index.css         # Global styles
│   ├── public/
│   │   └── index.html        # HTML template
│   └── package.json          # Node dependencies
├── sample-emails/            # Test emails for all intent types
└── README.md

AI Prompt Design

Intent Detection Prompt

Clear categorization into four intent types with definitions
Structured response format for easy parsing
Brief explanations for user transparency
Reply Generation Prompt

Context-aware based on detected intent
Tone-specific instructions for consistency
Professional email structure requirements
Adapts response style based on intent type

Tone Definitions:

Formal: Professional business language, proper structure, corporate etiquette
Friendly: Warm, approachable, conversational while maintaining professionalism
Persuasive: Confident, benefit-focused, encouraging action
Challenges & Solutions

Intent Classification Challenges:

Mixed Intents: Some emails contain multiple intents
Ambiguous Language: Casual language can be hard to classify
Edge Cases: Very short or poorly structured emails

Solutions Implemented:

Clear intent definitions in prompts
Fallback parsing for edge cases
Minimum length validation

Tone Consistency:

Maintaining professionalism across all tones
Cultural nuances in formal communication
Ensuring tone matches intent appropriately

Sample Emails:

Test emails are provided in the sample-emails/ folder covering all intent types:

Inquiry: Questions about products/services
Complaint: Customer service issues
Offer: Business proposals and partnerships
Information: Updates and announcements

Deployment:

The application is deployment-ready and can be deployed on:

Backend Options

Heroku
Railway
PythonAnywhere
AWS EC2

Frontend Options

Vercel
Netlify
GitHub Pages
AWS S3 + CloudFront

Environment Variables

Create a .env file in the backend directory with:

env
GROQ_API_KEY=your_groq_api_key_here

License

This project is created as part of an internship technical assessment.

Author
Samreen Musthak
