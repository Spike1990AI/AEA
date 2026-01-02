# Development Guide - Alba's Spelling App

## Quick Start (Terminal 1 - Main Development)

```bash
# Navigate to project
cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/Cloud-Projects/Projects/alba-spelling-app

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Parallel Terminal 2 - Testing & Support Commands

Open a second terminal for these helper commands:

### View Example Interfaces

The app currently has 4 example interfaces you can cycle through:

1. **Home** - Profile selection (Alba/Indie)
2. **Test Play** - Taking a spelling test with custom keyboard
3. **Results** - Test results with coins and celebration
4. **Reward Shop** - Spending coins on rewards

Navigate using the demo buttons in the bottom-right corner.

### Mobile Testing (iPhone Simulation)

```bash
# Open in iPhone simulator (if you have Xcode)
open -a Simulator

# Or open in browser with mobile view
# Chrome: Cmd+Opt+I → Toggle device toolbar
# Safari: Develop → Enter Responsive Design Mode
```

**Test on real iPhone:**
1. Find your local IP: `ifconfig | grep "inet " | grep -v 127.0.0.1`
2. On iPhone, navigate to `http://YOUR_IP:5173`
3. Add to Home Screen for full-screen testing

### Build Commands

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### File Watching

```bash
# Watch for file changes (auto-reload)
# Already enabled with Vite dev server
```

### Testing Text-to-Speech

```bash
# Open browser console and test TTS
window.speechSynthesis.speak(new SpeechSynthesisUtterance('Test'))
```

### Check Dependencies

```bash
# List installed packages
npm list --depth=0

# Check for updates
npm outdated
```

---

## Current Features Implemented

✅ **Phase 1: Setup**
- React 18 + Vite
- Tailwind CSS configured
- Mobile-first responsive design

✅ **UI Components Built:**
- Custom QWERTY Keyboard (no native keyboard interference)
- Home page with profile selection
- Test Play interface with TTS
- Results page with coin animations
- Reward Shop interface

✅ **Data Models:**
- Categories (11 types)
- Badges (10 achievements)

⏳ **Still To Build:**
- LocalStorage service
- Coin calculation logic
- Spellcheck/diff highlighting
- Admin mode
- Sound effects
- Full data persistence

---

## Mobile Testing Checklist

When testing on iPhone:

- [ ] Custom keyboard appears (native keyboard doesn't)
- [ ] Touch targets are comfortable (48px minimum)
- [ ] No zooming when tapping inputs
- [ ] Text-to-speech works
- [ ] Haptic feedback works (vibrations)
- [ ] Animations are smooth
- [ ] Safe areas respected (notch/home indicator)
- [ ] Add to Home Screen works (PWA)

---

## Common Issues & Fixes

### Native keyboard appears on iPhone
**Fix:** Input uses `readOnly` and positioned off-screen. Custom keyboard handles all typing.

### Text-to-speech doesn't work
**Fix:** Check browser permissions. Safari on iOS requires user interaction before first TTS use.

### Tailwind styles not updating
**Fix:** Restart dev server (`Ctrl+C` then `npm run dev`)

### Port 5173 already in use
**Fix:** Kill process: `lsof -ti:5173 | xargs kill -9`

---

## Project Structure

```
src/
├── components/
│   └── Keyboard.jsx          ✅ Custom QWERTY keyboard
├── pages/
│   ├── Home.jsx              ✅ Profile selection
│   ├── TestPlay.jsx          ✅ Test interface
│   ├── Results.jsx           ✅ Results + coins
│   └── RewardShop.jsx        ✅ Reward shop
├── data/
│   ├── categories.js         ✅ Word categories
│   └── badges.js             ✅ Badge definitions
├── services/                 ⏳ To build
│   ├── storage.js
│   ├── speech.js
│   ├── coins.js
│   └── spellCheck.js
└── App.jsx                   ✅ Main app + demo navigation
```

---

## Next Steps

1. Test current interfaces on iPhone
2. Build LocalStorage service for data persistence
3. Implement coin calculation logic
4. Build admin mode with PIN
5. Add sound effects
6. Deploy to GitHub Pages

---

## Shortcuts

```bash
# Terminal 1: Dev server
npm run dev

# Terminal 2: Build & preview
npm run build && npm run preview

# Check it works
curl http://localhost:5173
```

---

**Built for Alba (10) - Make spelling fun! ⭐**
