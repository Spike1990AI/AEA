// OpenAI Text-to-Speech Service
// Uses OpenAI TTS API with caching and fallback to browser speech

const VOICE = 'shimmer'; // Options: 'nova', 'shimmer', 'alloy', 'echo', 'fable', 'onyx'
const SPEED = 0.75; // Slower for maximum clarity
const CACHE_KEY_PREFIX = 'tts_audio_';

class TTSService {
  constructor() {
    this.apiKey = this.getApiKey();
    this.audioCache = new Map();
    this.loadCacheFromStorage();
  }

  // Get API key from localStorage (set in admin mode)
  getApiKey() {
    return localStorage.getItem('openai_api_key');
  }

  setApiKey(key) {
    localStorage.setItem('openai_api_key', key);
    this.apiKey = key;
  }

  hasApiKey() {
    return !!this.apiKey;
  }

  // Load cached audio from localStorage
  loadCacheFromStorage() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(CACHE_KEY_PREFIX)) {
          const text = key.replace(CACHE_KEY_PREFIX, '');
          const audioData = localStorage.getItem(key);
          this.audioCache.set(text, audioData);
        }
      });
    } catch (e) {
      console.warn('Failed to load audio cache:', e);
    }
  }

  // Save audio to cache
  saveToCache(text, audioBlob) {
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Audio = reader.result;
        this.audioCache.set(text, base64Audio);
        localStorage.setItem(CACHE_KEY_PREFIX + text, base64Audio);
      };
      reader.readAsDataURL(audioBlob);
    } catch (e) {
      console.warn('Failed to cache audio:', e);
    }
  }

  // Get cached audio if available
  getCachedAudio(text) {
    return this.audioCache.get(text);
  }

  // Generate speech using OpenAI TTS API
  async generateSpeech(text) {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not set');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'tts-1',
          voice: VOICE,
          input: text,
          speed: SPEED
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      this.saveToCache(text, audioBlob);
      return audioBlob;
    } catch (error) {
      console.error('OpenAI TTS error:', error);
      throw error;
    }
  }

  // Fallback to browser speech synthesis
  speakWithBrowser(text, onEnd) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = SPEED;
      utterance.lang = 'en-GB';

      // Try to use a female voice (prefer UK voices for British English)
      const voices = speechSynthesis.getVoices();
      const femaleVoice = voices.find(v =>
        (v.name.includes('Kate') || v.name.includes('Samantha') || v.name.includes('Female')) &&
        v.lang.startsWith('en')
      ) || voices.find(v => v.lang.startsWith('en') && v.name.includes('Female'));

      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      utterance.onend = onEnd;
      speechSynthesis.speak(utterance);
      return true;
    }
    return false;
  }

  // Main speak function - tries OpenAI, falls back to browser
  async speak(text, onStart, onEnd, onError) {
    // Check cache first
    const cachedAudio = this.getCachedAudio(text);
    if (cachedAudio) {
      try {
        const audio = new Audio(cachedAudio);
        audio.onplay = onStart;
        audio.onended = onEnd;
        audio.onerror = () => {
          console.warn('Cached audio failed, regenerating...');
          this.speakUncached(text, onStart, onEnd, onError);
        };
        await audio.play();
        return;
      } catch (e) {
        console.warn('Failed to play cached audio:', e);
      }
    }

    // Not in cache, generate new
    await this.speakUncached(text, onStart, onEnd, onError);
  }

  async speakUncached(text, onStart, onEnd, onError) {
    // Try OpenAI TTS if API key is available
    if (this.hasApiKey()) {
      try {
        if (onStart) onStart();
        const audioBlob = await this.generateSpeech(text);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          if (onEnd) onEnd();
        };
        await audio.play();
        return;
      } catch (error) {
        console.warn('OpenAI TTS failed, falling back to browser speech:', error);
      }
    }

    // Fallback to browser speech
    if (onStart) onStart();
    const success = this.speakWithBrowser(text, onEnd);
    if (!success && onError) {
      onError(new Error('No speech synthesis available'));
    }
  }

  // Clear all cached audio
  clearCache() {
    this.audioCache.clear();
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(CACHE_KEY_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }
}

// Export singleton instance
export default new TTSService();
