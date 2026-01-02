import { useState } from 'react';
import { Sparkles, Star, Trophy, Coins } from 'lucide-react';

export default function Home() {
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Example profile data
  const profiles = [
    {
      id: 'alba',
      name: 'Alba',
      avatar: '🌟',
      color: 'from-pink-400 to-purple-500',
      totalCoins: 127,
      currentStreak: 3,
      badges: 5
    },
    {
      id: 'indie',
      name: 'Indie',
      avatar: '✨',
      color: 'from-blue-400 to-cyan-500',
      totalCoins: 89,
      currentStreak: 2,
      badges: 3
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Spelling Stars ⭐
          </h1>
          <p className="text-gray-600">Choose your profile</p>
        </div>

        {/* Profile Selection */}
        <div className="space-y-4 mb-8">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => setSelectedProfile(profile.id)}
              className={`
                w-full p-6 rounded-2xl shadow-lg
                bg-gradient-to-r ${profile.color}
                text-white transition-all duration-200
                ${selectedProfile === profile.id ? 'scale-105 shadow-2xl' : 'hover:scale-102'}
                active:scale-95
              `}
            >
              <div className="flex items-center gap-4">
                <div className="text-6xl">{profile.avatar}</div>
                <div className="flex-1 text-left">
                  <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
                  <div className="flex gap-3 text-sm">
                    <span className="flex items-center gap-1">
                      <Coins className="w-4 h-4" />
                      {profile.totalCoins}
                    </span>
                    <span className="flex items-center gap-1">
                      🔥 {profile.currentStreak} day streak
                    </span>
                    <span className="flex items-center gap-1">
                      <Trophy className="w-4 h-4" />
                      {profile.badges}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        {selectedProfile && (
          <button className="w-full btn btn-primary py-4 text-lg animate-pulse">
            Continue as {profiles.find(p => p.id === selectedProfile)?.name}
          </button>
        )}

        {/* Admin Button */}
        <button className="w-full mt-4 text-gray-500 text-sm hover:text-gray-700">
          🔒 Admin Mode
        </button>
      </div>
    </div>
  );
}
