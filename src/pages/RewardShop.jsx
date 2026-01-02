import { useState } from 'react';
import { Coins, ShoppingBag, Star, Gift } from 'lucide-react';

export default function RewardShop() {
  const [selectedReward, setSelectedReward] = useState(null);

  // Example data
  const userCoins = 127;

  const rewards = [
    {
      id: 1,
      name: 'Pick Movie Night',
      cost: 100,
      description: 'Choose the family movie for Friday night',
      icon: '🎬',
      available: true
    },
    {
      id: 2,
      name: '+30 mins Screen Time',
      cost: 200,
      description: 'Extra 30 minutes on iPad or TV',
      icon: '📱',
      available: false
    },
    {
      id: 3,
      name: 'Ice Cream Trip',
      cost: 500,
      description: 'Special trip to get your favourite ice cream',
      icon: '🍦',
      available: false
    },
    {
      id: 4,
      name: 'New Book',
      cost: 1000,
      description: 'Choose a new book from the bookshop',
      icon: '📚',
      available: false
    },
    {
      id: 5,
      name: 'Day Out',
      cost: 2000,
      description: 'Special day out - you choose where!',
      icon: '🎡',
      available: false
    },
    {
      id: 6,
      name: 'Stay Up Late',
      cost: 150,
      description: 'Stay up 1 hour past bedtime (weekend only)',
      icon: '🌙',
      available: false
    }
  ];

  const canAfford = (cost) => userCoins >= cost;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-6 mb-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-purple-600" />
            Reward Shop
          </h1>

          {/* Coin Balance */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🪙</span>
              <div>
                <div className="text-2xl font-bold text-coin-dark">{userCoins}</div>
                <div className="text-sm text-gray-600">coins available</div>
              </div>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
              Earn More →
            </button>
          </div>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rewards.map((reward) => {
            const affordable = canAfford(reward.cost);

            return (
              <div
                key={reward.id}
                className={`
                  card relative overflow-hidden transition-all
                  ${affordable ? 'hover:shadow-xl cursor-pointer' : 'opacity-60'}
                  ${selectedReward === reward.id ? 'ring-4 ring-purple-500' : ''}
                `}
                onClick={() => affordable && setSelectedReward(reward.id)}
              >
                {/* Redeemed Badge */}
                {reward.available && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      Unlocked
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <div className="text-6xl mb-3">{reward.icon}</div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">
                    {reward.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {reward.description}
                  </p>

                  <div className="flex items-center justify-center gap-2 text-coin-dark font-bold text-xl">
                    <span>{reward.cost}</span>
                    <span className="text-2xl">🪙</span>
                  </div>

                  {!affordable && (
                    <div className="mt-3 text-xs text-gray-500">
                      Need {reward.cost - userCoins} more coins
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Buy Button */}
        {selectedReward && canAfford(rewards.find(r => r.id === selectedReward)?.cost) && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg border-t">
            <div className="max-w-2xl mx-auto">
              <button className="w-full btn btn-primary py-4 text-lg">
                <Gift className="w-6 h-6 inline mr-2" />
                Redeem {rewards.find(r => r.id === selectedReward)?.name}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
