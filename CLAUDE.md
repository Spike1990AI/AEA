# Alba's Learning App - Claude Code Instructions

## 🚨 CRITICAL: Component Location

**DO NOT edit files in `src/components/` - they are NOT used!**

### Components are defined INLINE in App.jsx

All components are defined inside `src/App.jsx` around line 1200+:

- **Keyboard** (line ~1207) - QWERTY keyboard for spelling/science
- **NumberPad** (line ~1228) - Number pad for maths
- **MultipleChoice** (defined inline in JSX)
- **TrueFalse** (defined inline in JSX)

**Files in `src/components/` are orphaned and ignored by the build.**

If you need to modify a component:
1. ✅ Search for it in `src/App.jsx` (e.g., `const Keyboard =`)
2. ✅ Edit it there
3. ❌ DO NOT edit `src/components/Keyboard.jsx` (not imported!)

---

## Project Structure

```
alba-spelling-app/
├── src/
│   ├── App.jsx                    # MAIN FILE - 4000+ lines, all components inline
│   ├── data/
│   │   ├── categories.js          # Spelling word categories
│   │   ├── mathsQuestions.js      # 100+ maths questions
│   │   └── scienceQuestions.js    # 108 science questions (21 with Challenge Mode)
│   ├── services/
│   │   ├── tts.js                 # OpenAI TTS for reading questions
│   │   └── aiMarking.js           # OpenAI GPT-4o-mini for Challenge Mode marking
│   └── components/                # ⚠️ NOT USED - orphaned files
│       └── Keyboard.jsx           # ❌ Ignored by build
├── dist/                          # Build output (deployed to GitHub Pages)
├── package.json
└── vite.config.js
```

---

## Key Features

### 1. Multi-Subject Learning
- **Spelling** (161 words) - QWERTY keyboard input
- **Maths** (100+ questions) - Number pad input
- **Science** (108 questions) - MCQ, True/False, Challenge Mode

### 2. Challenge Mode (Science Only)
- 21 questions have `acceptedConcepts` array
- AI marks typed answers (ignores spelling)
- +2 bonus coins for correct answers
- 30-second timeout protection
- Separate API key from TTS

### 3. Gamification
- Coins & rewards system
- Hot streak multipliers (2x, 3x)
- Badges (38 total)
- Mastery system (reduces coin rewards after 5+ correct)

### 4. Parent Dashboard
- Accessed via PIN (Settings → Parent Dashboard)
- Shows stats for Spelling, Maths, Science
- Benchmarks vs Year 5/6 averages
- Problem areas tracking
- CSV export

---

## Common Tasks

### Add Space Bar to Keyboard

**WRONG:**
```bash
# ❌ This does nothing
Edit src/components/Keyboard.jsx
```

**CORRECT:**
```bash
# ✅ Edit the inline component in App.jsx
1. Search for: const Keyboard = ({ onKey, onBackspace, onSubmit })
2. Add space bar inside the return statement
3. Example around line 1224:
   <button onClick={() => onKey(' ')} className="w-64 h-12...">SPACE</button>
```

### Add Science Challenge Mode Question

**File:** `src/data/scienceQuestions.js`

Add `acceptedConcepts` array to any question:
```javascript
{
  id: 99,
  question: "What is photosynthesis?",
  type: "multiple-choice",
  options: ["A", "B", "C", "D"],
  answer: 1,
  topic: "plants",
  ttsText: "What is photosynthesis?",
  acceptedConcepts: ["photosynthesis", "photo synthesis", "sunlight makes food", "plants make food"]
}
```

### Deploy Changes

```bash
cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/Cloud-Projects/Projects/alba-spelling-app

# Build
npm run build

# Deploy (force to clear cache)
npx gh-pages -d dist -f

# Live URL
# https://spike1990ai.github.io/alba-spelling-app/
```

**After deploy:** Users need hard refresh (Cmd+Shift+R or clear browser cache)

---

## API Keys (Settings)

### Two Separate Keys

1. **🔊 OpenAI TTS API Key**
   - localStorage: `openai_api_key`
   - Used by: `src/services/tts.js`
   - Purpose: Text-to-speech for reading questions

2. **🧠 AI Marking API Key**
   - localStorage: `openai_ai_marking_key`
   - Used by: `src/services/aiMarking.js`
   - Purpose: Challenge Mode answer marking

**Why separate?** TTS needs work, but AI marking is production-ready.

---

## Recent Bugs Fixed

### 1. White Screen on Challenge Mode Submit
**Problem:** Screen went white after submitting Challenge Mode answer

**Cause:** Result display checked `challengeMode && aiFeedback`, but `challengeMode` was reset to false before showing result. Fell through to MCQ display, tried to access `currentWord.options[selectedMCQOption]` where `selectedMCQOption` was null.

**Fix:** Changed condition to just `aiFeedback` (line ~2678 in App.jsx)

### 2. AI Marking Timeout
**Problem:** Requests hung indefinitely

**Fix:** Added 30-second timeout + Promise.race in `aiMarking.js`

### 3. Science Dashboard Not Working
**Problem:** Science tab showed no data

**Cause:** Dashboard used `mathsQuestions` or `allWords` but not `scienceQuestions`

**Fix:** Updated sourceList logic to include science (line ~3720 in App.jsx)

### 4. Space Bar Missing
**Problem:** Edited `src/components/Keyboard.jsx` but changes didn't appear

**Cause:** Keyboard is defined inline in App.jsx, not imported from components/

**Fix:** Added space bar to inline Keyboard component (line ~1224 in App.jsx)

---

## Data Storage

### localStorage Keys
- `openai_api_key` - TTS API key
- `openai_ai_marking_key` - AI Marking API key
- `parent_pin` - Parent dashboard PIN (4 digits)
- `admin_pin` - Admin settings PIN (4 digits)
- `github_token` - GitHub token for cloud sync
- `gist_id` - GitHub Gist ID for cloud backup
- Game data stored in Gist as `alba-spelling-data.json`

### Game Data Structure
```json
{
  "coins": 0,
  "totalCoinsEarned": 0,
  "streak": 0,
  "bestStreak": 0,
  "lastTestDate": "Thu Jan 02 2026",
  "earnedBadges": [],
  "claimedRewards": [],
  "currentSubject": "science",
  "spelling": {
    "coins": 228,
    "totalCoinsEarned": 228,
    "testHistory": [],
    "wordStats": {}
  },
  "maths": {
    "coins": 87,
    "totalCoinsEarned": 87,
    "testHistory": [],
    "questionStats": {}
  },
  "science": {
    "coins": 0,
    "totalCoinsEarned": 0,
    "testHistory": [],
    "questionStats": {}
  }
}
```

---

## GitHub Repo

**Repository:** Spike1990AI/alba-spelling-app
**Live URL:** https://spike1990ai.github.io/alba-spelling-app/
**Deployment:** GitHub Pages via `gh-pages` branch

---

## Development Notes

### Built With
- React 19.2.0
- Vite 7.2.4
- OpenAI SDK 4.x
- Tailwind CSS (inline styles)

### Mobile-First Design
- Touch-optimized (48px+ targets)
- No native keyboard (custom keyboards only)
- Haptic feedback support
- iPhone/iPad tested

### For Alba (10 years old, dyslexic)
- High contrast
- Large text
- Instant visual feedback
- Spelling doesn't matter in Challenge Mode
- Encouragement-focused
