import { useState } from 'react';
import { Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import Keyboard from '../components/Keyboard';

export default function TestPlay() {
  const [currentWord, setCurrentWord] = useState('necessary');
  const [sentence, setSentence] = useState('It is necessary to wear a coat in winter.');
  const [userSpelling, setUserSpelling] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Example test data
  const progress = {
    current: 3,
    total: 10
  };

  const handleKeyPress = (key) => {
    setUserSpelling(prev => prev + key.toLowerCase());
  };

  const handleBackspace = () => {
    setUserSpelling(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setUserSpelling('');
  };

  const handleSubmit = () => {
    const correct = userSpelling.toLowerCase() === currentWord.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleSpeakWord = (slow = false) => {
    if (!soundEnabled) return;

    const utterance = new SpeechSynthesisUtterance(
      `Spell the word: ${currentWord}. ${sentence}`
    );
    utterance.lang = 'en-GB';
    utterance.rate = slow ? 0.6 : 0.9;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>

        <div className="flex items-center gap-4">
          <div className="text-sm font-semibold text-gray-600">
            Question {progress.current} of {progress.total}
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {soundEnabled ? (
              <Volume2 className="w-6 h-6 text-blue-500" />
            ) : (
              <VolumeX className="w-6 h-6 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 h-2">
        <div
          className="bg-blue-500 h-full transition-all duration-300"
          style={{ width: `${(progress.current / progress.total) * 100}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-between p-4">
        {/* Word Display Area */}
        <div className="w-full max-w-2xl mt-8">
          {!showResult ? (
            <>
              {/* Instruction */}
              <div className="text-center mb-6">
                <p className="text-lg text-gray-600 mb-4">
                  Listen and spell the word
                </p>
                <button
                  onClick={() => handleSpeakWord(false)}
                  className="btn btn-primary mb-2"
                >
                  <Volume2 className="w-5 h-5 inline mr-2" />
                  Hear Word
                </button>
                <button
                  onClick={() => handleSpeakWord(true)}
                  className="btn btn-secondary ml-2"
                >
                  <Volume2 className="w-5 h-5 inline mr-2" />
                  Slow
                </button>
              </div>

              {/* User's Spelling */}
              <div className="card text-center mb-6">
                <div className="text-3xl sm:text-4xl font-bold text-gray-800 min-h-[3rem] tracking-wider">
                  {userSpelling || <span className="text-gray-300">Start typing...</span>}
                </div>
              </div>

              {/* Example Sentence Hint */}
              <div className="text-center text-gray-500 italic mb-8">
                "{sentence}"
              </div>
            </>
          ) : (
            <>
              {/* Result Display */}
              <div className={`card text-center ${isCorrect ? '' : 'shake'}`}>
                <div className="text-6xl mb-4">
                  {isCorrect ? '🎉' : '🤔'}
                </div>
                <h2 className={`text-3xl font-bold mb-2 ${isCorrect ? 'text-green-600' : 'text-orange-600'}`}>
                  {isCorrect ? 'Perfect!' : 'Not quite...'}
                </h2>

                {!isCorrect && (
                  <div className="mt-6">
                    <p className="text-gray-600 mb-2">Your spelling:</p>
                    <div className="text-2xl font-bold text-gray-800 mb-4">
                      {userSpelling}
                    </div>
                    <p className="text-gray-600 mb-2">Correct spelling:</p>
                    <div className="text-2xl font-bold text-green-600">
                      {currentWord}
                    </div>
                  </div>
                )}

                {isCorrect && (
                  <div className="mt-6 flex items-center justify-center gap-2 text-2xl font-bold text-coin">
                    +2 <span className="text-3xl">🪙</span>
                  </div>
                )}

                <button className="btn btn-primary mt-8 w-full">
                  {isCorrect ? 'Next Word →' : 'Try Again'}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Keyboard */}
        {!showResult && (
          <Keyboard
            onKeyPress={handleKeyPress}
            onBackspace={handleBackspace}
            onClear={handleClear}
            onSubmit={handleSubmit}
            disabled={showResult}
          />
        )}
      </div>
    </div>
  );
}
