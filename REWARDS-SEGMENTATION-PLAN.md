# Multi-Subject Rewards Segmentation Plan

## Overview
Structured reward tiers across Spelling (📚), Maths (🔢), and Science (🔬) to encourage balanced learning.

---

## Current System (Universal Rewards)
- **Single reward pool**: 86 rewards (50-30,000 coins)
- **Works for all subjects**: Coins from any subject can buy any reward
- **Problem**: No incentive to balance subjects - Alba could do only Spelling forever

---

## Proposed Segmentation System

### Option 1: Subject-Specific Bonus Rewards
Keep universal rewards + add subject-exclusive bonuses

#### Universal Rewards (Current 86 rewards)
- **Available to all subjects**
- Coins from Spelling, Maths, or Science can purchase
- Examples: Cinema trip, bowling, stickers, screen time

#### Subject-Specific Bonuses (New - 15 per subject = 45 total)

**📚 SPELLING BONUSES** (Earned with Spelling coins only)
- 100 coins: Word Game App (Wordle, Spelling Bee)
- 250 coins: Choose Next 10 Words to Learn
- 500 coins: Story Writing Session with Dad
- 750 coins: Poetry Writing Competition
- 1000 coins: Library Trip (Pick 3 Books)
- 1500 coins: Author Biography Book
- 2000 coins: Creative Writing Class
- 2500 coins: Personalized Storybook (Alba as main character)
- 3000 coins: Shakespeare Play Trip
- 4000 coins: Book Shop Spree (£20)
- 5000 coins: Writing Workshop Day
- 7500 coins: Meet an Author Event
- 10000 coins: Publish Alba's Story (Print Book)
- 12500 coins: Kindle E-Reader
- 15000 coins: Writing Retreat Weekend

**🔢 MATHS BONUSES** (Earned with Maths coins only)
- 100 coins: Maths Puzzle Book
- 250 coins: Number Game App (Prodigy, etc.)
- 500 coins: Dad's Tricky Maths Challenge
- 750 coins: Calculator Upgrade (Scientific)
- 1000 coins: Lego Building Challenge
- 1500 coins: Geometry Set (Compass, Protractor)
- 2000 coins: Brain Teaser Puzzle Box
- 2500 coins: Coding Basics Class
- 3000 coins: Science Museum Trip
- 4000 coins: Robotics Kit (Beginner)
- 5000 coins: Minecraft Education Session
- 7500 coins: STEM Workshop Day
- 10000 coins: Telescope (Beginner)
- 12500 coins: Raspberry Pi Computer Kit
- 15000 coins: Coding Camp Week

**🔬 SCIENCE BONUSES** (Earned with Science coins only)
- 100 coins: Science Experiment Book
- 250 coins: Cool Science Facts App
- 500 coins: Home Experiment Kit
- 750 coins: Magnifying Glass Set
- 1000 coins: Bug Catching Kit
- 1500 coins: Microscope (Kids)
- 2000 coins: Crystal Growing Kit
- 2500 coins: Planetarium Visit
- 3000 coins: Natural History Museum Trip
- 4000 coins: Geology Rock Collection
- 5000 coins: Chemistry Set (Safe)
- 7500 coins: Marine Biology Aquarium Trip
- 10000 coins: Telescope & Star Map
- 12500 coins: Science Summer Camp
- 15000 coins: Microscope (Advanced) + Slides

---

### Option 2: Tiered Cross-Subject Requirements
Unlock tiers by earning across MULTIPLE subjects

#### Tier 1: Starter Rewards (0-500 coins, Any Subject)
- Gold Star Sticker (50)
- High Five from Dad (50)
- Extra Story Time (100)
- Choose Music in Car (150)
- Stay Up 15 Min Late (200)

#### Tier 2: Bronze Level (500-1500 coins, Any Subject)
**Requirement**: At least 100 coins earned in 2 different subjects
- Park Picnic (800)
- Puzzle Together (1050)
- Art Session (1150)
- New Book (1200)

#### Tier 3: Silver Level (1500-3500 coins, Any Subject)
**Requirement**: At least 250 coins earned in ALL 3 subjects
- Cinema Trip (1300)
- Bowling Trip (1400)
- Trampoline Park (1700)
- Friend Playdate (1800)

#### Tier 4: Gold Level (3500-7000 coins, Any Subject)
**Requirement**: At least 500 coins earned in ALL 3 subjects
- Shopping Trip (3600)
- Theme Park Day (4500)
- Water Park (4800)
- Special Day Out (5000)

#### Tier 5: Platinum Level (7000-15000 coins, Any Subject)
**Requirement**: At least 1000 coins earned in ALL 3 subjects
- Museum/Gallery Trip (6500)
- Theatre Show (7500)
- Concert Tickets (8000)
- Spa Day (8500)

#### Tier 6: Diamond Level (15000-30000 coins, Any Subject)
**Requirement**: At least 2500 coins earned in ALL 3 subjects
- Makeover Day (11000)
- Redecorate Room (12000)
- New Gadget (15000)
- Weekend Trip (18000)
- Dream Day (30000)

---

### Option 3: Subject Coin Multipliers
Encourage weak subjects with dynamic pricing

**How it works:**
- Track coins earned per subject
- Weakest subject gets 25% discount on ALL rewards
- Strongest subject pays 25% premium

**Example:**
Alba has:
- Spelling: 500 coins (strongest)
- Maths: 200 coins (weakest)
- Science: 350 coins (middle)

Cinema Trip normally costs 1300 coins:
- Pay with **Maths coins**: 975 coins (25% discount)
- Pay with **Science coins**: 1300 coins (normal)
- Pay with **Spelling coins**: 1625 coins (25% premium)

**Result**: Alba incentivized to practice Maths to get better deals!

---

## Recommended Implementation: Hybrid System

Combine all 3 options:

### 1. Keep Universal Rewards (86 existing)
- Can be purchased with coins from ANY subject
- No restrictions

### 2. Add Subject-Specific Bonuses (15 per subject = 45 new)
- Only purchasable with that subject's coins
- Themed to encourage subject enthusiasm
- Total rewards: 131 (86 universal + 45 subject-specific)

### 3. Add Tier Unlocks (Cross-Subject Requirements)
- Universal rewards unlock in tiers
- Higher tiers require earning across multiple subjects
- Prevents "spelling only" strategy

### 4. Optional: Dynamic Pricing (Multipliers)
- Advanced feature for later
- Encourages balancing weak subjects

---

## Implementation Plan

### Phase 1: Subject-Specific Bonuses (Immediate)
1. Add 45 new subject-specific rewards to `sampleRewards` array
2. Add `subject` field to reward object: `{ id: X, name: "...", cost: Y, icon: "...", subject: 'spelling' }`
3. Filter rewards in shop by current subject
4. Show "Universal" tab + subject-specific tab

### Phase 2: Tier Unlocks (Week 2)
1. Add tier requirements to reward object
2. Track total coins earned per subject (already exists: `totalCoinsEarned`)
3. Check tier requirements before allowing purchase
4. Show "🔒 Unlock by earning X coins in Maths" message

### Phase 3: Dynamic Pricing (Optional - Week 3+)
1. Calculate subject balance
2. Apply multipliers to reward costs
3. Show original + adjusted price
4. Update on each test completion

---

## Data Structure Changes

### Reward Object (Enhanced)
```javascript
{
  id: 1,
  name: 'Gold Star Sticker',
  cost: 50,
  icon: '⭐',
  subject: null, // null = universal, 'spelling'/'maths'/'science' = subject-specific
  tier: 1, // 1-6 for tiered unlocks
  tierRequirements: {
    spelling: 0,   // Minimum coins needed from spelling
    maths: 0,      // Minimum coins needed from maths
    science: 0     // Minimum coins needed from science
  }
}
```

### Example Subject-Specific Reward
```javascript
{
  id: 87,
  name: 'Word Game App',
  cost: 100,
  icon: '📱',
  subject: 'spelling', // Only available in spelling shop
  tier: 1,
  tierRequirements: { spelling: 0, maths: 0, science: 0 }
}
```

### Example Tiered Universal Reward
```javascript
{
  id: 39,
  name: 'Cinema Trip',
  cost: 1300,
  icon: '🎥',
  subject: null, // Universal - can buy with any subject's coins
  tier: 3, // Silver tier
  tierRequirements: {
    spelling: 250,  // Need at least 250 total earned in spelling
    maths: 250,     // Need at least 250 total earned in maths
    science: 250    // Need at least 250 total earned in science
  }
}
```

---

## UI Changes Needed

### Reward Shop Screen
**Current**: Single list of all rewards

**New**: Tabbed interface
- Tab 1: "Universal" (86 rewards - any subject)
- Tab 2: "📚 Spelling Bonuses" (15 rewards - spelling only)
- Tab 3: "🔢 Maths Bonuses" (15 rewards - maths only)
- Tab 4: "🔬 Science Bonuses" (15 rewards - science only)

### Reward Card Display
**Show tier status:**
```
🎥 Cinema Trip - 1300 🪙
⭐⭐⭐ SILVER TIER
🔒 Unlock: Earn 250 in each subject
Progress: ✅ Spelling (300) | ❌ Maths (150/250) | ✅ Science (280)
```

### Subject Selection Screen
**Show unlock progress:**
```
📚 SPELLING
500 🪙 | 1,200 total earned
✅ Tier 1-3 Unlocked
⏳ Tier 4: Need 250 more

🔢 MATHS
150 🪙 | 400 total earned
✅ Tier 1-2 Unlocked
⏳ Tier 3: Need 100 more (ALL subjects)

🔬 SCIENCE
280 🪙 | 650 total earned
✅ Tier 1-3 Unlocked
⏳ Tier 4: Need 220 more
```

---

## Expected Behavior Changes

### Current Behavior
- Alba can earn 10,000 spelling coins
- Never touch Maths or Science
- Still buy Dream Day (30,000) with spelling coins only

### New Behavior (After Implementation)
- Alba earns 10,000 spelling coins
- Can buy all Tier 1-2 rewards immediately
- **Cannot buy Tier 3+ rewards** until she earns coins in Maths and Science too
- Encouraged to balance subjects to unlock better rewards
- Subject-specific bonuses give additional motivation per subject

---

## Reward Distribution Recommendation

### Universal Rewards (86 existing - keep as-is)
- Tier 1 (0-500): 15 rewards
- Tier 2 (500-1500): 10 rewards
- Tier 3 (1500-3500): 15 rewards
- Tier 4 (3500-7000): 15 rewards
- Tier 5 (7000-15000): 15 rewards
- Tier 6 (15000-30000): 16 rewards

### Subject-Specific Bonuses (45 new)
- 15 per subject
- Mix of low (100-500), medium (500-2500), high (2500-7500), epic (7500-15000)
- Themed to subject content

---

## Testing Plan

1. **Test tier unlocking**
   - Start fresh (0 coins all subjects)
   - Verify Tier 1 rewards available
   - Verify Tier 2+ locked
   - Earn 250 in each subject
   - Verify Tier 3 unlocks

2. **Test subject-specific rewards**
   - Go to Spelling shop
   - Verify spelling bonuses show
   - Verify maths/science bonuses hidden
   - Switch to Maths
   - Verify maths bonuses show

3. **Test cross-subject purchases**
   - Earn 1000 spelling coins
   - Buy universal reward with spelling coins
   - Verify balance deducted from spelling.coins
   - Switch to Maths
   - Verify same universal reward still claimable with maths coins

---

## Future Enhancements

### 1. Subject Badges
- "Spelling Master" (1000 total earned)
- "Maths Wizard" (1000 total earned)
- "Science Champion" (1000 total earned)
- "Triple Threat" (1000 in ALL subjects)

### 2. Weekly Challenges
- "Earn 100 coins in each subject this week" → Bonus reward

### 3. Subject Streaks
- Track streak per subject
- "5-day Spelling streak" → 50 bonus coins

### 4. Combined Mega Rewards
- Special rewards requiring coins from ALL subjects
- Example: "Weekend Trip" costs 5000 Spelling + 5000 Maths + 5000 Science

---

## Recommendation

**Start with Phase 1 (Subject-Specific Bonuses)**
- Easiest to implement
- Adds 45 new rewards
- Encourages subject engagement
- No breaking changes to existing system

**Add Phase 2 (Tier Unlocks) after 2 weeks**
- Observe Alba's behavior
- See if she naturally balances subjects
- If she focuses only on Spelling, add tier requirements

**Skip Phase 3 (Dynamic Pricing) for now**
- Too complex for initial rollout
- May confuse rather than motivate
- Can add later if needed

---

**Ready to implement? Let me know which option you prefer!**
