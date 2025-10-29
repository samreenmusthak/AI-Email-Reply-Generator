from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Groq client
client = Groq(api_key=os.getenv('GROQ_API_KEY'))

def detect_intent(email_text):
    """Detect the intent of the email"""
    prompt = f"""Analyze this email and classify its intent:
- Inquiry: Questions, requests for information
- Complaint: Issues, problems, negative feedback
- Offer: Business proposals, sales pitches
- Information: Updates, announcements

Email:
{email_text}

Respond with: INTENT: [Category] - [Explanation]"""

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",  # ✅ Updated to latest model
            messages=[
                {"role": "system", "content": "You analyze email intent."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=100
        )
        result = response.choices[0].message.content.strip()
        print(f"Raw response: {result}")
        
        if "INTENT:" in result:
            parts = result.split("INTENT:")[1].strip().split("-")
            intent = parts[0].strip()
            explanation = parts[1].strip() if len(parts) > 1 else ""
            return intent, explanation
        else:
            for category in ["Inquiry", "Complaint", "Offer", "Information"]:
                if category.lower() in result.lower():
                    return category, result
            return "Information", result
            
    except Exception as e:
        print(f"Error: {e}")
        return "Information", "Unable to detect intent"

def generate_reply(email_text, intent, tone):
    """Generate a professional reply"""
    tone_instructions = {
        "formal": "Write in formal business tone.",
        "friendly": "Write in warm, friendly tone.",
        "persuasive": "Write in persuasive, compelling tone."
    }
    
    prompt = f"""Write a professional email reply.

Original Email:
{email_text}

Intent: {intent}
Tone: {tone}
{tone_instructions.get(tone, '')}

Write a complete email reply with greeting and closing."""

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",  # ✅ Updated to latest model
            messages=[
                {"role": "system", "content": f"You write {tone} emails."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=500
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error: {e}")
        return f"Error: {str(e)}"

@app.route('/api/analyze-email', methods=['POST'])
def analyze_email():
    """Main endpoint to analyze email"""
    try:
        data = request.get_json()
        if not data or 'email_text' not in data:
            return jsonify({'error': 'No email text provided'}), 400
            
        email_text = data['email_text'].strip()
        if not email_text:
            return jsonify({'error': 'Email text is empty'}), 400
            
        if len(email_text) < 10:
            return jsonify({'error': 'Email text is too short'}), 400

        print(f"Processing email...")
        
        # Detect intent
        intent, explanation = detect_intent(email_text)
        print(f"Detected intent: {intent}")
        
        # Generate replies for all three tones
        formal_reply = generate_reply(email_text, intent, "formal")
        friendly_reply = generate_reply(email_text, intent, "friendly")
        persuasive_reply = generate_reply(email_text, intent, "persuasive")

        response_data = {
            'intent': intent,
            'intent_explanation': explanation,
            'replies': {
                'formal': formal_reply,
                'friendly': friendly_reply,
                'persuasive': persuasive_reply
            }
        }
        
        return jsonify(response_data), 200
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Backend is running'}), 200

if __name__ == '__main__':
    if not os.getenv('GROQ_API_KEY'):
        print("WARNING: GROQ_API_KEY not found!")
        print("Please create a .env file with your Groq API key")
    else:
        print("Groq API key found, starting server...")
    
    app.run(debug=True, host='0.0.0.0', port=5001)