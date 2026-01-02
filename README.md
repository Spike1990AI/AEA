# Alba's Spelling Test App ⭐

Interactive web-based spelling test application for Alba (10) with gamification, custom keyboard, and coin rewards.

---

## 🚀 LIVE NOW

**Dev server is running at:** http://localhost:5173

Open that link to see 4 example interfaces! Use demo buttons (bottom-right) to navigate.

---

## ✨ Example Interfaces Built

### 1. 🏠 Home - Profile Selection
- Alba and Indie profiles with stats
- Shows coins, streak, badges
- Animated gradient cards

### 2. 📝 Test Play - Spelling Test
- **Custom QWERTY keyboard** (blocks native keyboard!)
- Text-to-speech for words (OpenAI TTS coming)
- Live spelling display
- Progress bar
- Immediate feedback

### 3. 🎉 Results - Celebration & Coins
- Animated confetti for high scores
- Detailed coin breakdown
- Streak tracking
- Words to practice

### 4. 🛍️ Reward Shop
- Grid of rewards (ice cream, screen time, etc.)
- Coin balance tracking
- Can't buy what you can't afford

---

## 🎯 Tech Stack

- React 18 + Vite
- Tailwind CSS (mobile-first)
- Lucide React icons
- Canvas Confetti animations
- OpenAI TTS API (to be integrated)

---

## 📱 Test on iPhone

```bash
# Find your IP
ifconfig | grep "inet " | grep -v 127.0.0.1

# Then on iPhone: http://YOUR_IP:5173
```

Add to Home Screen for full-screen mode!

---

## 🔊 Text-to-Speech Update

**New Requirement:** OpenAI TTS API

- Voice: "nova" or "shimmer" (preview both)
- Speed: 0.85-0.9 for clarity
- Cache audio locally after first generation
- Fallback to browser speech if API fails
- Pre-generate audio in admin mode for instant playback

---

## 📁 What's Built

✅ Custom keyboard component
✅ 4 example interface pages
✅ 11 word categories
✅ 10 achievement badges
✅ Mobile-optimized design
✅ Animation framework

⏳ LocalStorage service
⏳ Coin calculation logic
⏳ OpenAI TTS integration
⏳ Admin mode with PIN
⏳ Full data persistence

---

## 🛠️ Commands

```bash
# Dev server (running)
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

---

**See DEV-GUIDE.md for detailed testing instructions**
