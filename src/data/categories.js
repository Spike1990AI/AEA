export const CATEGORIES = [
  {
    id: 'soft-c',
    name: 'Soft C',
    description: 'C sounds like S (city, dance)',
    color: 'bg-pink-100 text-pink-700',
    icon: '🔤'
  },
  {
    id: 'soft-g',
    name: 'Soft G',
    description: 'G sounds like J (giant, cage)',
    color: 'bg-purple-100 text-purple-700',
    icon: '🎯'
  },
  {
    id: 'double-letters',
    name: 'Double Letters',
    description: 'Words with doubled consonants',
    color: 'bg-blue-100 text-blue-700',
    icon: '✨'
  },
  {
    id: 'silent-letters',
    name: 'Silent Letters',
    description: 'Letters you don\'t hear (knight, write)',
    color: 'bg-green-100 text-green-700',
    icon: '🤫'
  },
  {
    id: 'tricky-endings',
    name: 'Tricky Endings',
    description: '-tion, -sion, -ous, -ious',
    color: 'bg-yellow-100 text-yellow-700',
    icon: '🎪'
  },
  {
    id: 'ie-ei',
    name: 'IE vs EI',
    description: 'I before E rules and exceptions',
    color: 'bg-red-100 text-red-700',
    icon: '🔀'
  },
  {
    id: 'homophones',
    name: 'Homophones',
    description: 'Sound the same, spelled different',
    color: 'bg-indigo-100 text-indigo-700',
    icon: '👯'
  },
  {
    id: 'prefixes',
    name: 'Prefixes',
    description: 'un-, re-, dis-, mis-',
    color: 'bg-teal-100 text-teal-700',
    icon: '⬅️'
  },
  {
    id: 'suffixes',
    name: 'Suffixes',
    description: '-ing, -ed, -ly, -ful',
    color: 'bg-orange-100 text-orange-700',
    icon: '➡️'
  },
  {
    id: 'compound',
    name: 'Compound Words',
    description: 'Two words combined',
    color: 'bg-cyan-100 text-cyan-700',
    icon: '🔗'
  },
  {
    id: 'general',
    name: 'General',
    description: 'Other tricky words',
    color: 'bg-gray-100 text-gray-700',
    icon: '📝'
  }
];

export const getCategoryById = (id) => {
  return CATEGORIES.find(cat => cat.id === id) || CATEGORIES[CATEGORIES.length - 1];
};
