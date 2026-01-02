import { useEffect } from 'react';
import { Trophy, Coins, TrendingUp, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Results() {
  // Example test results
  const results = {
    score: 8,
    total: 10,
    percentage: 80,
    coinsEarned: 31, // 25 for 80%+ test + 2*8 correct first try - 2*2 second try
    newBadges: [],
    wrongWords: ['necessary', 'embarrass']
  };

  useEffect(() => {
    // Celebrate!
    if (results.percentage >= 80) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Trophy Animation */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4 animate-bounce-slow">
            {results.percentage === 100 ? '🏆' : results.percentage >= 80 ? '🌟' : '💪'}
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {results.percentage === 100 ? 'Perfect!' : results.percentage >= 80 ? 'Great Job!' : 'Good Effort!'}
          </h1>
          <p className="text-gray-600">
            You got {results.score} out of {results.total} words correct
          </p>
        </div>

        {/* Score Circle */}
        <div className="card text-center mb-6">
          <div className="text-6xl font-bold text-blue-600 mb-2">
            {results.percentage}%
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <TrendingUp className="w-5 h-5" />
            <span>Personal best: 95%</span>
          </div>
        </div>

        {/* Coins Earned */}
        <div className="card bg-gradient-to-r from-yellow-100 to-orange-100 text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-5xl animate-pulse">🪙</span>
            <div>
              <div className="text-4xl font-bold text-coin-dark">
                +{results.coinsEarned}
              </div>
              <div className="text-sm text-gray-600">coins earned</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-yellow-200 text-sm text-gray-600">
            <div className="flex justify-between mb-1">
              <span>Test completion (80%+)</span>
              <span className="font-semibold">+25 🪙</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>8 words correct (first try)</span>
              <span className="font-semibold">+16 🪙</span>
            </div>
            <div className="flex justify-between text-orange-600">
              <span>2 words (second try)</span>
              <span className="font-semibold">-10 🪙</span>
            </div>
          </div>
        </div>

        {/* Streak Info */}
        <div className="card bg-gradient-to-r from-orange-100 to-red-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🔥</div>
            <div className="flex-1">
              <div className="text-xl font-bold text-gray-800">3 Day Streak!</div>
              <div className="text-sm text-gray-600">Keep it up! Next streak bonus at 7 days</div>
            </div>
            <div className="text-3xl font-bold text-orange-600">+10🪙</div>
          </div>
        </div>

        {/* Words to Practice */}
        {results.wrongWords.length > 0 && (
          <div className="card bg-blue-50 mb-6">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-600" />
              Words to Practice
            </h3>
            <div className="space-y-2">
              {results.wrongWords.map((word, index) => (
                <div key={index} className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-semibold text-gray-800">{word}</span>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Practice
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <button className="w-full btn btn-primary py-4 text-lg">
            Take Another Test
          </button>
          <button className="w-full btn btn-secondary py-4">
            View Progress
          </button>
        </div>
      </div>
    </div>
  );
}
