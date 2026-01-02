# Changelog - Alba's Spelling App

## [2025-01-02] - UI Redesign & Two-Tier PIN System

### 🎨 Major UI Redesign - Subject Home Pages

**Implemented fun game-style home page design (Option 2)**

- **Animated mascot header** with floating sparkles (✨⭐💫)
  - Subject-specific emoji: 📚 English, 🔢 Maths, 🔬 Science
  - Gradient backgrounds with shimmer animations
  - "Ready to level up, Alba? 🚀" motivational text

- **Game-like stats grid** (3 colorful cards)
  - 🪙 Coins (yellow/orange gradient)
  - 🔥 Day Streak (red/pink gradient)
  - ⭐ Mastery % (green/emerald gradient)

- **Huge pulsing START TEST button**
  - Subject-specific gradient colors
  - Purple/Pink for English
  - Blue/Cyan for Maths
  - Emerald/Green for Science
  - Glowing pulse animation for emphasis

- **Quick access grid** (2x2 layout)
  - 📊 My Progress
  - 🎁 Rewards (with notification badge showing available rewards count)
  - 🏆 Badges (with "NEW!" badge when applicable)
  - ⚙️ Settings

- **Motivational messages** at bottom with dynamic recommendations

### 🔒 Two-Tier PIN Security System

**Level 1: Parent PIN (Default: 3521)**
- Access to reporting cards and dashboard
- For Mum to view Alba's progress
- Shows:
  - 📈 View Detailed Dashboard button
  - Quick stats: Day Streak 🔥 and Badges 🏆
  - 🔒 Enter Admin PIN button

**Level 2: Admin PIN (Default: 5756)**
- Access to system administration
- For Dad to manage settings
- Protected features:
  - 🔒 PIN Management (change both Parent and Admin PINs)
  - ☁️ GitHub Cloud Backup (token, data sync)
  - 🤖 OpenAI API Key (TTS configuration)
  - 🗑️ Audio Cache management

**PIN Entry Improvements:**
- Visual color coding: Purple for Parent PIN, Orange for Admin PIN
- Generic hint text (removed security issue of showing actual PIN numbers)
- Changed from "Forgot your PIN? Check Admin Settings to change it"

**Flow:**
1. Settings → Parent PIN (3521) → Reporting Cards
2. Click "View Full Report" → Dashboard (no second PIN needed)
3. Click "Enter Admin PIN" → Admin PIN (5756) → Admin Settings

### 🐛 Bug Fixes

**Fixed admin PIN display issues:**
- Replaced dynamic Tailwind class names with conditional full class names
- Admin PIN now shows orange dots correctly
- Parent PIN shows purple dots correctly

**Removed redundant PIN check:**
- ParentDashboard no longer requires a second PIN entry
- Once Parent PIN is entered, dashboard is accessible immediately

**Security fix:**
- Removed actual PIN numbers from hint text at bottom of PIN entry screen
- Was showing "Default Parent PIN: 3521" which defeats the purpose of having a PIN

### 🏷️ UI/UX Improvements

**Removed "Dad only" labels:**
- Cleaned up Settings button text
- Removed from subject selection screen Settings button
- Removed from home page Settings button

**Subject-specific timing labels:**
- **English Dashboard:**
  - "Avg Word Time"
  - "Slowest Words (Struggling)"
  - "Fastest Words (Confident)"
- **Maths/Science Dashboard:**
  - "Avg Question Time"
  - "Slowest Questions (Struggling)"
  - "Fastest Questions (Confident)"

### ✅ Technical Improvements

**Data isolation confirmed:**
- No cross-over between subjects
- Each subject has separate:
  - Test history
  - Word/Question stats
  - Timing data (duration & individual timings)
  - Coins
  - Total coins earned

**Timer verification:**
- Confirmed timers run for ALL subjects (spelling, maths, science)
- Test duration tracked from start to finish
- Individual word/question time tracked for each answer
- Timing data saved in test history for dashboard insights

### 📊 Dashboard Updates

**Timing Insights section:**
- Shows subject-specific terminology
- Filters data per subject (no cross-contamination)
- Displays:
  - Average test duration
  - Average word/question time
  - Slowest items (struggling indicators)
  - Fastest items (confidence indicators)

### 📤 Share Feature

**Share test results with Mum & Dad:**
- Beautiful purple/pink gradient share button on results screen
- Shows after every test completion
- Share includes:
  - Subject name and emoji (📚 English, 🔢 Maths, 🔬 Science)
  - Score with percentage
  - Coins earned
  - Encouraging message based on performance
- Uses Web Share API on mobile (native share sheet)
- Clipboard fallback for desktop browsers
- Formatted text ready for WhatsApp, Messages, or any app
- Example share text:
  ```
  🌟🌟🌟 Alba's English Test 📚

  Score: 5/5 (100%)
  Coins earned: 🪙 30

  Perfect score! 🎉
  ```

### ☁️ Auto-Sync for Parent Viewers

**Fixed parent dashboard sync delays:**
- **Auto-pull on dashboard open** - Parents always see Alba's latest data
- Dashboard automatically fetches from cloud when opened
- No manual refresh needed
- Finds the Gist with most coins (Alba's latest progress)
- Updates local cache for faster subsequent views

**Sync status indicator:**
- "Syncing latest data..." (pulsing blue dot while fetching)
- "✓ Synced X mins ago" (green badge when complete)
- "⚠️ Sync failed" (red warning if error)
- "⚠️ Cloud sync disabled" (yellow warning if no token)
- Real-time display shows how fresh the data is

**Sync diagnostics tool (Admin Settings):**
- "Check Local vs Cloud Data" button
- Shows all Gists with their coin values
- Displays which Gist is currently active (⭐)
- Shows created/updated timestamps
- "Force Pull from Cloud" button to manually sync

**Impact:**
- Eliminates delays between Alba's device and parent viewers
- Parents always see fresh data (auto-synced on load)
- Transparency about sync status and data freshness
- Easy troubleshooting with diagnostic tools

---

## Deployment

All changes deployed to: https://spike1990ai.github.io/alba-spelling-app/

**Build Details:**
- React 18 with Vite
- Tailwind CSS for styling
- GitHub Pages hosting
- Auto-deploys on push
