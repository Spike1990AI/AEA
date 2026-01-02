import OpenAI from 'openai';

class AIMarkingService {
  constructor() {
    this.client = null;
  }

  initialize() {
    const apiKey = localStorage.getItem('openai_ai_marking_key');
    if (!apiKey) {
      throw new Error('AI Marking API key not set. Please configure it in Settings.');
    }
    this.client = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
      timeout: 30000, // 30 second timeout
      maxRetries: 2
    });
  }

  async markScienceAnswer(question, studentAnswer, acceptedConcepts) {
    if (!this.client) {
      this.initialize();
    }

    const prompt = `You are a supportive Year 5/6 science teacher marking a 10-year-old dyslexic student's answer.

Question: "${question}"
Student answer: "${studentAnswer}"
Key concepts to look for: ${acceptedConcepts.join(', ')}

MARKING RULES:
- IGNORE all spelling and grammar errors completely
- Focus ONLY on scientific understanding
- Award 100% if the core concept is correct (even if poorly worded)
- Award 50% if partially correct (some understanding shown)
- Award 0% if major misconception or completely wrong
- Be very encouraging and supportive in feedback
- Explain what they got right (even if they got it wrong)
- Keep feedback brief (1-2 sentences max)

Return ONLY valid JSON in this exact format (no other text):
{
  "correct": true or false,
  "mark": 0 to 100,
  "feedback": "Your encouraging feedback here"
}`;

    try {
      // Create timeout promise (30 seconds)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out after 30 seconds')), 30000);
      });

      // Create API call promise
      const apiPromise = this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 150
      });

      // Race between API call and timeout
      const response = await Promise.race([apiPromise, timeoutPromise]);

      const result = JSON.parse(response.choices[0].message.content);
      return result;
    } catch (error) {
      console.error('AI Marking error:', error);

      // Provide specific error messages
      if (error.message?.includes('timed out')) {
        throw new Error('AI marking took too long. Please try again.');
      } else if (error.message?.includes('API key')) {
        throw new Error('Invalid API key. Please check Settings.');
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        throw new Error('Network error. Please check your internet connection.');
      } else {
        throw new Error('AI marking failed. Please try again.');
      }
    }
  }
}

export default new AIMarkingService();
