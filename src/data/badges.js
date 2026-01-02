export const BADGES = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first test',
    icon: '👣',
    color: 'bg-blue-100 text-blue-700',
    checkUnlock: (userData) => userData.testsCompleted >= 1
  },
  {
    id: 'perfect-10',
    name: 'Perfect 10',
    description: 'Get 100% on a 10-word test',
    icon: '💯',
    color: 'bg-green-100 text-green-700',
    checkUnlock: (userData) => userData.perfectTests >= 1
  },
  {
    id: 'streak-starter',
    name: 'Streak Starter',
    description: 'Complete tests for 3 days in a row',
    icon: '🔥',
    color: 'bg-orange-100 text-orange-700',
    checkUnlock: (userData) => userData.currentStreak >= 3
  },
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    description: 'Complete tests for 7 days in a row',
    icon: '🏆',
    color: 'bg-yellow-100 text-yellow-700',
    checkUnlock: (userData) => userData.currentStreak >= 7
  },
  {
    id: 'soft-c-slayer',
    name: 'Soft C Slayer',
    description: 'Master 10 soft C words',
    icon: '🎯',
    color: 'bg-pink-100 text-pink-700',
    checkUnlock: (userData) => userData.categoryMastery?.['soft-c'] >= 10
  },
  {
    id: 'double-trouble',
    name: 'Double Trouble',
    description: 'Master 10 double letter words',
    icon: '✨',
    color: 'bg-purple-100 text-purple-700',
    checkUnlock: (userData) => userData.categoryMastery?.['double-letters'] >= 10
  },
  {
    id: 'century-club',
    name: 'Century Club',
    description: 'Earn 100 total coins',
    icon: '💰',
    color: 'bg-yellow-100 text-yellow-700',
    checkUnlock: (userData) => userData.totalCoinsEarned >= 100
  },
  {
    id: 'high-roller',
    name: 'High Roller',
    description: 'Earn 1000 total coins',
    icon: '🤑',
    color: 'bg-green-100 text-green-700',
    checkUnlock: (userData) => userData.totalCoinsEarned >= 1000
  },
  {
    id: 'redemption',
    name: 'Redemption',
    description: 'Get a word right that you\'ve got wrong 3+ times',
    icon: '🎖️',
    color: 'bg-indigo-100 text-indigo-700',
    checkUnlock: (userData) => userData.redemptions >= 1
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Get 100% on 5 tests in a row',
    icon: '⭐',
    color: 'bg-cyan-100 text-cyan-700',
    checkUnlock: (userData) => userData.consecutivePerfect >= 5
  }
];

export const checkNewBadges = (userData, previousBadges = []) => {
  const newBadges = [];

  BADGES.forEach(badge => {
    if (!previousBadges.includes(badge.id) && badge.checkUnlock(userData)) {
      newBadges.push(badge);
    }
  });

  return newBadges;
};
