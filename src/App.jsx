import React, { useState, useEffect } from 'react';
import ttsService from './services/tts';
import aiMarkingService from './services/aiMarking';
import { mathsQuestions, mathsCategories } from './data/mathsQuestions';
import { scienceQuestions, scienceCategories } from './data/scienceQuestions';

// ============ MASSIVE WORD LIST (160+ words) ============
const allWords = [
  // ===== TRICKY WORDS (20) =====
  { id: 1, word: 'because', sentence: 'I stayed home due to the rain.', category: 'tricky', difficulty: 'medium' },
  { id: 2, word: 'said', sentence: 'She told me earlier.', category: 'tricky', difficulty: 'easy' },
  { id: 3, word: 'could', sentence: 'Maybe I can help.', category: 'tricky', difficulty: 'easy' },
  { id: 4, word: 'would', sentence: 'I wish you had come.', category: 'tricky', difficulty: 'easy' },
  { id: 5, word: 'should', sentence: 'You ought to try it.', category: 'tricky', difficulty: 'easy' },
  { id: 6, word: 'people', sentence: 'Many humans were there.', category: 'tricky', difficulty: 'medium' },
  { id: 7, word: 'answer', sentence: 'Can you reply to this?', category: 'tricky', difficulty: 'medium' },
  { id: 8, word: 'busy', sentence: 'I have lots to do.', category: 'tricky', difficulty: 'easy' },
  { id: 9, word: 'beautiful', sentence: 'The view was lovely.', category: 'tricky', difficulty: 'hard' },
  { id: 10, word: 'again', sentence: 'Do it once more.', category: 'tricky', difficulty: 'easy' },
  { id: 11, word: 'enough', sentence: 'I have plenty now.', category: 'tricky', difficulty: 'medium' },
  { id: 12, word: 'through', sentence: 'Walk from one side to the other.', category: 'tricky', difficulty: 'hard' },
  { id: 13, word: 'thought', sentence: 'I had an idea.', category: 'tricky', difficulty: 'medium' },
  { id: 14, word: 'brought', sentence: 'I carried it here.', category: 'tricky', difficulty: 'medium' },
  { id: 15, word: 'caught', sentence: 'I grabbed the ball.', category: 'tricky', difficulty: 'medium' },
  { id: 16, word: 'taught', sentence: 'Someone showed me how.', category: 'tricky', difficulty: 'medium' },
  { id: 17, word: 'although', sentence: 'Even so, I tried.', category: 'tricky', difficulty: 'hard' },
  { id: 18, word: 'favourite', sentence: 'This is the one I like best.', category: 'tricky', difficulty: 'medium' },
  { id: 19, word: 'surprise', sentence: 'I did not expect that!', category: 'tricky', difficulty: 'medium' },
  { id: 20, word: 'library', sentence: 'A place full of books.', category: 'tricky', difficulty: 'medium' },

  // ===== I BEFORE E (15) =====
  { id: 21, word: 'friend', sentence: "She is my best pal.", category: 'i-before-e', difficulty: 'easy' },
  { id: 22, word: 'believe', sentence: 'I think it will work out.', category: 'i-before-e', difficulty: 'medium' },
  { id: 23, word: 'receive', sentence: 'Did you get my message?', category: 'i-before-e', difficulty: 'hard' },
  { id: 24, word: 'piece', sentence: 'Can I have a slice?', category: 'i-before-e', difficulty: 'medium' },
  { id: 25, word: 'achieve', sentence: 'You can reach your goals.', category: 'i-before-e', difficulty: 'hard' },
  { id: 26, word: 'weird', sentence: 'That was very strange.', category: 'i-before-e', difficulty: 'medium' },
  { id: 27, word: 'neighbour', sentence: 'The person next door.', category: 'i-before-e', difficulty: 'hard' },
  { id: 28, word: 'either', sentence: 'Pick one or the other.', category: 'i-before-e', difficulty: 'medium' },
  { id: 29, word: 'ceiling', sentence: 'Look up at the top.', category: 'i-before-e', difficulty: 'medium' },
  { id: 30, word: 'field', sentence: 'The cows were in the grass.', category: 'i-before-e', difficulty: 'easy' },
  { id: 31, word: 'shield', sentence: 'The knight held it for protection.', category: 'i-before-e', difficulty: 'medium' },
  { id: 32, word: 'thief', sentence: 'Someone who steals things.', category: 'i-before-e', difficulty: 'medium' },
  { id: 33, word: 'chief', sentence: 'The leader of the group.', category: 'i-before-e', difficulty: 'medium' },
  { id: 34, word: 'relief', sentence: 'I felt so much better.', category: 'i-before-e', difficulty: 'medium' },
  { id: 35, word: 'niece', sentence: 'My sister has a daughter.', category: 'i-before-e', difficulty: 'medium' },

  // ===== SOFT C (15) =====
  { id: 36, word: 'decide', sentence: 'I cannot choose what to wear.', category: 'soft-c', difficulty: 'medium' },
  { id: 37, word: 'certain', sentence: 'I am absolutely sure about it.', category: 'soft-c', difficulty: 'hard' },
  { id: 38, word: 'accident', sentence: 'The crash happened this morning.', category: 'soft-c', difficulty: 'hard' },
  { id: 39, word: 'circle', sentence: 'Draw a round shape.', category: 'soft-c', difficulty: 'medium' },
  { id: 40, word: 'celebrate', sentence: 'Let us have a party!', category: 'soft-c', difficulty: 'hard' },
  { id: 41, word: 'necessary', sentence: 'You need to do this.', category: 'soft-c', difficulty: 'hard' },
  { id: 42, word: 'notice', sentence: 'Did you spot it?', category: 'soft-c', difficulty: 'medium' },
  { id: 43, word: 'special', sentence: 'This is really important.', category: 'soft-c', difficulty: 'medium' },
  { id: 44, word: 'medicine', sentence: 'Take this to feel better.', category: 'soft-c', difficulty: 'hard' },
  { id: 45, word: 'exercise', sentence: 'Running keeps you fit.', category: 'soft-c', difficulty: 'hard' },
  { id: 46, word: 'science', sentence: 'We learn about nature.', category: 'soft-c', difficulty: 'medium' },
  { id: 47, word: 'experience', sentence: 'I have done this before.', category: 'soft-c', difficulty: 'hard' },
  { id: 48, word: 'difference', sentence: 'Can you spot what changed?', category: 'soft-c', difficulty: 'hard' },
  { id: 49, word: 'sentence', sentence: 'A group of words together.', category: 'soft-c', difficulty: 'medium' },
  { id: 50, word: 'peace', sentence: 'Calm and quiet everywhere.', category: 'soft-c', difficulty: 'medium' },

  // ===== DOUBLE LETTERS (18) =====
  { id: 51, word: 'different', sentence: 'This one is not the same.', category: 'double-letters', difficulty: 'medium' },
  { id: 52, word: 'beginning', sentence: 'This is just the start.', category: 'double-letters', difficulty: 'hard' },
  { id: 53, word: 'running', sentence: 'She was moving fast.', category: 'double-letters', difficulty: 'easy' },
  { id: 54, word: 'swimming', sentence: 'I love the pool.', category: 'double-letters', difficulty: 'medium' },
  { id: 55, word: 'happened', sentence: 'It occurred yesterday.', category: 'double-letters', difficulty: 'medium' },
  { id: 56, word: 'embarrass', sentence: 'Do not make me feel awkward.', category: 'double-letters', difficulty: 'hard' },
  { id: 57, word: 'committee', sentence: 'The group made a choice.', category: 'double-letters', difficulty: 'hard' },
  { id: 58, word: 'address', sentence: 'Where do you live?', category: 'double-letters', difficulty: 'medium' },
  { id: 59, word: 'immediately', sentence: 'Do it right now.', category: 'double-letters', difficulty: 'hard' },
  { id: 60, word: 'occasion', sentence: 'A special event or time.', category: 'double-letters', difficulty: 'hard' },
  { id: 61, word: 'success', sentence: 'You did really well!', category: 'double-letters', difficulty: 'medium' },
  { id: 62, word: 'possible', sentence: 'It might happen.', category: 'double-letters', difficulty: 'medium' },
  { id: 63, word: 'tomorrow', sentence: 'The day after today.', category: 'double-letters', difficulty: 'medium' },
  { id: 64, word: 'follow', sentence: 'Come along behind me.', category: 'double-letters', difficulty: 'easy' },
  { id: 65, word: 'recommend', sentence: 'I suggest you try this.', category: 'double-letters', difficulty: 'hard' },
  { id: 66, word: 'connect', sentence: 'Join these two together.', category: 'double-letters', difficulty: 'medium' },
  { id: 67, word: 'appear', sentence: 'Suddenly it showed up.', category: 'double-letters', difficulty: 'medium' },
  { id: 68, word: 'sudden', sentence: 'It was very quick.', category: 'double-letters', difficulty: 'easy' },

  // ===== SILENT LETTERS (18) =====
  { id: 69, word: 'knight', sentence: 'The warrior rode a horse.', category: 'silent-letters', difficulty: 'medium' },
  { id: 70, word: 'knife', sentence: 'Cut it with the blade.', category: 'silent-letters', difficulty: 'easy' },
  { id: 71, word: 'write', sentence: 'Put pen to paper.', category: 'silent-letters', difficulty: 'easy' },
  { id: 72, word: 'island', sentence: 'The land surrounded by water.', category: 'silent-letters', difficulty: 'medium' },
  { id: 73, word: 'castle', sentence: 'The king lived there.', category: 'silent-letters', difficulty: 'medium' },
  { id: 74, word: 'rhythm', sentence: 'The beat of the music.', category: 'silent-letters', difficulty: 'hard' },
  { id: 75, word: 'scissors', sentence: 'Use them to cut paper.', category: 'silent-letters', difficulty: 'medium' },
  { id: 76, word: 'climb', sentence: 'Go up the ladder.', category: 'silent-letters', difficulty: 'easy' },
  { id: 77, word: 'doubt', sentence: 'I am not sure.', category: 'silent-letters', difficulty: 'medium' },
  { id: 78, word: 'listen', sentence: 'Pay attention to this.', category: 'silent-letters', difficulty: 'easy' },
  { id: 79, word: 'honest', sentence: 'Always tell the truth.', category: 'silent-letters', difficulty: 'medium' },
  { id: 80, word: 'hour', sentence: 'Sixty minutes long.', category: 'silent-letters', difficulty: 'easy' },
  { id: 81, word: 'know', sentence: 'I understand this.', category: 'silent-letters', difficulty: 'easy' },
  { id: 82, word: 'knock', sentence: 'Tap on the door.', category: 'silent-letters', difficulty: 'easy' },
  { id: 83, word: 'wrong', sentence: 'That is not correct.', category: 'silent-letters', difficulty: 'easy' },
  { id: 84, word: 'wreck', sentence: 'The ship was destroyed.', category: 'silent-letters', difficulty: 'medium' },
  { id: 85, word: 'thumb', sentence: 'The short finger.', category: 'silent-letters', difficulty: 'easy' },
  { id: 86, word: 'comb', sentence: 'Use it on your hair.', category: 'silent-letters', difficulty: 'easy' },

  // ===== ENDINGS -TION/-SION/-OUS (15) =====
  { id: 87, word: 'station', sentence: 'Wait at the platform.', category: 'endings', difficulty: 'medium' },
  { id: 88, word: 'mention', sentence: 'Did you talk about it?', category: 'endings', difficulty: 'medium' },
  { id: 89, word: 'question', sentence: 'Can I ask something?', category: 'endings', difficulty: 'medium' },
  { id: 90, word: 'direction', sentence: 'Which way should I go?', category: 'endings', difficulty: 'hard' },
  { id: 91, word: 'decision', sentence: 'What did you pick?', category: 'endings', difficulty: 'hard' },
  { id: 92, word: 'famous', sentence: 'Everyone knows them.', category: 'endings', difficulty: 'medium' },
  { id: 93, word: 'dangerous', sentence: 'This is not safe.', category: 'endings', difficulty: 'hard' },
  { id: 94, word: 'serious', sentence: 'This is very important.', category: 'endings', difficulty: 'hard' },
  { id: 95, word: 'information', sentence: 'Facts and details.', category: 'endings', difficulty: 'hard' },
  { id: 96, word: 'education', sentence: 'Learning at school.', category: 'endings', difficulty: 'hard' },
  { id: 97, word: 'television', sentence: 'Watch shows on the screen.', category: 'endings', difficulty: 'hard' },
  { id: 98, word: 'nervous', sentence: 'Feeling a bit scared.', category: 'endings', difficulty: 'medium' },
  { id: 99, word: 'generous', sentence: 'Kind and giving.', category: 'endings', difficulty: 'hard' },
  { id: 100, word: 'curious', sentence: 'Wanting to know more.', category: 'endings', difficulty: 'medium' },
  { id: 101, word: 'jealous', sentence: 'Wanting what others have.', category: 'endings', difficulty: 'hard' },

  // ===== HOMOPHONES (18) =====
  { id: 102, word: 'their', sentence: 'It belongs to them.', category: 'homophones', difficulty: 'medium' },
  { id: 103, word: 'there', sentence: 'Look over in that place.', category: 'homophones', difficulty: 'medium' },
  { id: 104, word: 'hear', sentence: 'Use your ears to listen.', category: 'homophones', difficulty: 'easy' },
  { id: 105, word: 'here', sentence: 'Come to this spot.', category: 'homophones', difficulty: 'easy' },
  { id: 106, word: 'where', sentence: 'In what place?', category: 'homophones', difficulty: 'easy' },
  { id: 107, word: 'wear', sentence: 'Put on your clothes.', category: 'homophones', difficulty: 'easy' },
  { id: 108, word: 'weather', sentence: 'Is it sunny or rainy?', category: 'homophones', difficulty: 'medium' },
  { id: 109, word: 'whether', sentence: 'I wonder if it will happen.', category: 'homophones', difficulty: 'medium' },
  { id: 110, word: 'your', sentence: 'This belongs to you.', category: 'homophones', difficulty: 'easy' },
  { id: 111, word: 'to', sentence: 'Go over to the shop.', category: 'homophones', difficulty: 'easy' },
  { id: 112, word: 'too', sentence: 'I want one as well.', category: 'homophones', difficulty: 'easy' },
  { id: 113, word: 'two', sentence: 'The number after one.', category: 'homophones', difficulty: 'easy' },
  { id: 114, word: 'which', sentence: 'Pick one of these.', category: 'homophones', difficulty: 'medium' },
  { id: 115, word: 'witch', sentence: 'She has a black cat.', category: 'homophones', difficulty: 'medium' },
  { id: 116, word: 'week', sentence: 'Seven days long.', category: 'homophones', difficulty: 'easy' },
  { id: 117, word: 'weak', sentence: 'Not very strong.', category: 'homophones', difficulty: 'easy' },
  { id: 118, word: 'right', sentence: 'The correct answer.', category: 'homophones', difficulty: 'easy' },
  { id: 119, word: 'write', sentence: 'Use a pen for this.', category: 'homophones', difficulty: 'easy' },

  // ===== HARD SPELLINGS (15) =====
  { id: 120, word: 'definitely', sentence: 'I am totally sure.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 121, word: 'separate', sentence: 'Keep them apart.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 122, word: 'government', sentence: 'The leaders of our country.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 123, word: 'queue', sentence: 'Wait in the line.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 124, word: 'conscience', sentence: 'Knowing right from wrong.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 125, word: 'mischievous', sentence: 'Being a bit naughty.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 126, word: 'restaurant', sentence: 'A place to eat meals.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 127, word: 'Wednesday', sentence: 'The middle of the week.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 128, word: 'February', sentence: 'The shortest month.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 129, word: 'knowledge', sentence: 'What you learn and know.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 130, word: 'vegetable', sentence: 'Carrots and peas are these.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 131, word: 'chocolate', sentence: 'A sweet brown treat.', category: 'hard-spellings', difficulty: 'medium' },
  { id: 132, word: 'actually', sentence: 'In fact, this is true.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 133, word: 'basically', sentence: 'Simply put, this is it.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 134, word: 'probably', sentence: 'Most likely this will happen.', category: 'hard-spellings', difficulty: 'hard' },

  // ===== PREFIXES (15) =====
  { id: 135, word: 'unhappy', sentence: 'Feeling a bit sad.', category: 'prefixes', difficulty: 'easy' },
  { id: 136, word: 'unusual', sentence: 'Not like the others.', category: 'prefixes', difficulty: 'medium' },
  { id: 137, word: 'unknown', sentence: 'Nobody knows about it.', category: 'prefixes', difficulty: 'medium' },
  { id: 138, word: 'untidy', sentence: 'A bit of a mess.', category: 'prefixes', difficulty: 'easy' },
  { id: 139, word: 'return', sentence: 'Come back again.', category: 'prefixes', difficulty: 'easy' },
  { id: 140, word: 'rewrite', sentence: 'Do it again on paper.', category: 'prefixes', difficulty: 'medium' },
  { id: 141, word: 'remember', sentence: 'Keep it in your mind.', category: 'prefixes', difficulty: 'medium' },
  { id: 142, word: 'replace', sentence: 'Put a new one instead.', category: 'prefixes', difficulty: 'medium' },
  { id: 143, word: 'disappear', sentence: 'It vanished from sight.', category: 'prefixes', difficulty: 'hard' },
  { id: 144, word: 'disagree', sentence: 'I think differently.', category: 'prefixes', difficulty: 'medium' },
  { id: 145, word: 'discover', sentence: 'Find something new.', category: 'prefixes', difficulty: 'medium' },
  { id: 146, word: 'impossible', sentence: 'It cannot be done.', category: 'prefixes', difficulty: 'hard' },
  { id: 147, word: 'invisible', sentence: 'You cannot see it.', category: 'prefixes', difficulty: 'hard' },
  { id: 148, word: 'incorrect', sentence: 'That is wrong.', category: 'prefixes', difficulty: 'medium' },
  { id: 149, word: 'uncomfortable', sentence: 'Not feeling relaxed.', category: 'prefixes', difficulty: 'hard' },

  // ===== COMPOUND WORDS (12) =====
  { id: 150, word: 'something', sentence: 'There is a thing here.', category: 'compound', difficulty: 'easy' },
  { id: 151, word: 'everyone', sentence: 'All the people.', category: 'compound', difficulty: 'easy' },
  { id: 152, word: 'sometimes', sentence: 'Now and then.', category: 'compound', difficulty: 'easy' },
  { id: 153, word: 'everything', sentence: 'All of the things.', category: 'compound', difficulty: 'easy' },
  { id: 154, word: 'somewhere', sentence: 'In some place.', category: 'compound', difficulty: 'medium' },
  { id: 155, word: 'meanwhile', sentence: 'At the same time.', category: 'compound', difficulty: 'medium' },
  { id: 156, word: 'anywhere', sentence: 'In any place at all.', category: 'compound', difficulty: 'medium' },
  { id: 157, word: 'nothing', sentence: 'Not anything at all.', category: 'compound', difficulty: 'easy' },
  { id: 158, word: 'playground', sentence: 'Where children play.', category: 'compound', difficulty: 'easy' },
  { id: 159, word: 'birthday', sentence: 'The day you were born.', category: 'compound', difficulty: 'easy' },
  { id: 160, word: 'homework', sentence: 'School work at home.', category: 'compound', difficulty: 'easy' },
  { id: 161, word: 'breakfast', sentence: 'The first meal.', category: 'compound', difficulty: 'medium' },

  // ===== MORE TRICKY WORDS (25) =====
  { id: 162, word: 'February', sentence: 'The second month of the year.', category: 'tricky', difficulty: 'hard' },
  { id: 163, word: 'business', sentence: 'Running a shop or company.', category: 'tricky', difficulty: 'hard' },
  { id: 164, word: 'Wednesday', sentence: 'The middle of the week.', category: 'tricky', difficulty: 'medium' },
  { id: 165, word: 'separate', sentence: 'Keep things apart.', category: 'tricky', difficulty: 'hard' },
  { id: 166, word: 'definitely', sentence: 'For certain, without doubt.', category: 'tricky', difficulty: 'hard' },
  { id: 167, word: 'parliament', sentence: 'Where laws are made.', category: 'tricky', difficulty: 'hard' },
  { id: 168, word: 'government', sentence: 'People who run the country.', category: 'tricky', difficulty: 'hard' },
  { id: 169, word: 'environment', sentence: 'The world around us.', category: 'tricky', difficulty: 'hard' },
  { id: 170, word: 'develop', sentence: 'To grow and improve.', category: 'tricky', difficulty: 'medium' },
  { id: 171, word: 'interest', sentence: 'Something you find exciting.', category: 'tricky', difficulty: 'medium' },
  { id: 172, word: 'certain', sentence: 'I am sure about it.', category: 'tricky', difficulty: 'medium' },
  { id: 173, word: 'different', sentence: 'Not the same as others.', category: 'tricky', difficulty: 'medium' },
  { id: 174, word: 'difficult', sentence: 'Hard to do or understand.', category: 'tricky', difficulty: 'medium' },
  { id: 175, word: 'important', sentence: 'Something that really matters.', category: 'tricky', difficulty: 'medium' },
  { id: 176, word: 'remember', sentence: 'Keep in your mind.', category: 'tricky', difficulty: 'medium' },
  { id: 177, word: 'particular', sentence: 'One specific thing.', category: 'tricky', difficulty: 'hard' },
  { id: 178, word: 'regular', sentence: 'Happens often at set times.', category: 'tricky', difficulty: 'medium' },
  { id: 179, word: 'ordinary', sentence: 'Nothing special or unusual.', category: 'tricky', difficulty: 'medium' },
  { id: 180, word: 'century', sentence: 'One hundred years.', category: 'tricky', difficulty: 'medium' },
  { id: 181, word: 'various', sentence: 'Several different types.', category: 'tricky', difficulty: 'hard' },
  { id: 182, word: 'physical', sentence: 'To do with the body.', category: 'tricky', difficulty: 'hard' },
  { id: 183, word: 'continue', sentence: 'Keep going without stopping.', category: 'tricky', difficulty: 'medium' },
  { id: 184, word: 'decide', sentence: 'Make up your mind.', category: 'tricky', difficulty: 'easy' },
  { id: 185, word: 'describe', sentence: 'Tell what it is like.', category: 'tricky', difficulty: 'medium' },
  { id: 186, word: 'perhaps', sentence: 'It might happen, maybe.', category: 'tricky', difficulty: 'medium' },

  // ===== MORE DOUBLE LETTERS (20) =====
  { id: 187, word: 'tomorrow', sentence: 'The day after today.', category: 'double-letters', difficulty: 'medium' },
  { id: 188, word: 'happened', sentence: 'It took place before now.', category: 'double-letters', difficulty: 'medium' },
  { id: 189, word: 'beginning', sentence: 'The start of something.', category: 'double-letters', difficulty: 'hard' },
  { id: 190, word: 'success', sentence: 'When you do really well.', category: 'double-letters', difficulty: 'hard' },
  { id: 191, word: 'possess', sentence: 'To own or have something.', category: 'double-letters', difficulty: 'hard' },
  { id: 192, word: 'address', sentence: 'Where you live or send letters.', category: 'double-letters', difficulty: 'medium' },
  { id: 193, word: 'embarrass', sentence: 'Make someone feel awkward.', category: 'double-letters', difficulty: 'hard' },
  { id: 194, word: 'necessary', sentence: 'Something you must have.', category: 'double-letters', difficulty: 'hard' },
  { id: 195, word: 'occasion', sentence: 'A special time or event.', category: 'double-letters', difficulty: 'hard' },
  { id: 196, word: 'immediately', sentence: 'Right now, at once.', category: 'double-letters', difficulty: 'hard' },
  { id: 197, word: 'disappoint', sentence: 'Let someone down, make sad.', category: 'double-letters', difficulty: 'hard' },
  { id: 198, word: 'appreciate', sentence: 'Be thankful for something.', category: 'double-letters', difficulty: 'hard' },
  { id: 199, word: 'opposite', sentence: 'Complete other way round.', category: 'double-letters', difficulty: 'medium' },
  { id: 200, word: 'accept', sentence: 'Take what is offered.', category: 'double-letters', difficulty: 'medium' },
  { id: 201, word: 'manner', sentence: 'The way you behave.', category: 'double-letters', difficulty: 'medium' },
  { id: 202, word: 'summer', sentence: 'The warm season after spring.', category: 'double-letters', difficulty: 'easy' },
  { id: 203, word: 'dinner', sentence: 'The main meal of the day.', category: 'double-letters', difficulty: 'easy' },
  { id: 204, word: 'rabbit', sentence: 'A fluffy hopping animal.', category: 'double-letters', difficulty: 'easy' },
  { id: 205, word: 'bottle', sentence: 'A container for drinks.', category: 'double-letters', difficulty: 'easy' },
  { id: 206, word: 'letters', sentence: 'The alphabet symbols, a-z.', category: 'double-letters', difficulty: 'easy' },

  // ===== MORE SILENT LETTERS (15) =====
  { id: 207, word: 'doubt', sentence: 'Not being sure about something.', category: 'silent-letters', difficulty: 'hard' },
  { id: 208, word: 'island', sentence: 'Land surrounded by water.', category: 'silent-letters', difficulty: 'medium' },
  { id: 209, word: 'wrestle', sentence: 'Fight by holding and pushing.', category: 'silent-letters', difficulty: 'hard' },
  { id: 210, word: 'honest', sentence: 'Always telling the truth.', category: 'silent-letters', difficulty: 'medium' },
  { id: 211, word: 'honour', sentence: 'Respect and good reputation.', category: 'silent-letters', difficulty: 'hard' },
  { id: 212, word: 'answer', sentence: 'Reply to a question.', category: 'silent-letters', difficulty: 'medium' },
  { id: 213, word: 'listen', sentence: 'Pay attention with your ears.', category: 'silent-letters', difficulty: 'easy' },
  { id: 214, word: 'castle', sentence: 'A big stone fortress building.', category: 'silent-letters', difficulty: 'easy' },
  { id: 215, word: 'fasten', sentence: 'Join or attach things together.', category: 'silent-letters', difficulty: 'medium' },
  { id: 216, word: 'often', sentence: 'Many times, frequently.', category: 'silent-letters', difficulty: 'easy' },
  { id: 217, word: 'soften', sentence: 'Make something less hard.', category: 'silent-letters', difficulty: 'medium' },
  { id: 218, word: 'thistle', sentence: 'A prickly wild plant.', category: 'silent-letters', difficulty: 'hard' },
  { id: 219, word: 'design', sentence: 'Plan how something will look.', category: 'silent-letters', difficulty: 'medium' },
  { id: 220, word: 'resign', sentence: 'Leave your job or position.', category: 'silent-letters', difficulty: 'hard' },
  { id: 221, word: 'campaign', sentence: 'Organised effort to achieve a goal.', category: 'silent-letters', difficulty: 'hard' },

  // ===== MORE WORD ENDINGS (20) =====
  { id: 222, word: 'permission', sentence: 'Being allowed to do something.', category: 'endings', difficulty: 'hard' },
  { id: 223, word: 'discussion', sentence: 'Talking about a topic together.', category: 'endings', difficulty: 'hard' },
  { id: 224, word: 'expression', sentence: 'The look on your face.', category: 'endings', difficulty: 'hard' },
  { id: 225, word: 'profession', sentence: 'The job you do for work.', category: 'endings', difficulty: 'hard' },
  { id: 226, word: 'possession', sentence: 'Something that belongs to you.', category: 'endings', difficulty: 'hard' },
  { id: 227, word: 'confusion', sentence: 'Being mixed up and unclear.', category: 'endings', difficulty: 'hard' },
  { id: 228, word: 'decision', sentence: 'A choice you have made.', category: 'endings', difficulty: 'medium' },
  { id: 229, word: 'television', sentence: 'The TV you watch shows on.', category: 'endings', difficulty: 'medium' },
  { id: 230, word: 'division', sentence: 'Splitting into parts or groups.', category: 'endings', difficulty: 'medium' },
  { id: 231, word: 'revision', sentence: 'Going over work to learn it.', category: 'endings', difficulty: 'hard' },
  { id: 232, word: 'famous', sentence: 'Known by many people.', category: 'endings', difficulty: 'easy' },
  { id: 233, word: 'dangerous', sentence: 'Could cause harm or hurt.', category: 'endings', difficulty: 'medium' },
  { id: 234, word: 'generous', sentence: 'Happy to give and share.', category: 'endings', difficulty: 'medium' },
  { id: 235, word: 'nervous', sentence: 'Feeling worried or scared.', category: 'endings', difficulty: 'medium' },
  { id: 236, word: 'curious', sentence: 'Wanting to know more.', category: 'endings', difficulty: 'medium' },
  { id: 237, word: 'serious', sentence: 'Not joking, very important.', category: 'endings', difficulty: 'medium' },
  { id: 238, word: 'obvious', sentence: 'Very easy to see or understand.', category: 'endings', difficulty: 'hard' },
  { id: 239, word: 'previous', sentence: 'The one that came before.', category: 'endings', difficulty: 'hard' },
  { id: 240, word: 'various', sentence: 'Many different types.', category: 'endings', difficulty: 'hard' },
  { id: 241, word: 'furious', sentence: 'Very angry indeed.', category: 'endings', difficulty: 'medium' },

  // ===== MORE SOFT C WORDS (15) =====
  { id: 242, word: 'city', sentence: 'A big town with many people.', category: 'soft-c', difficulty: 'easy' },
  { id: 243, word: 'circle', sentence: 'A round shape like a ring.', category: 'soft-c', difficulty: 'easy' },
  { id: 244, word: 'ceiling', sentence: 'The top of a room inside.', category: 'soft-c', difficulty: 'medium' },
  { id: 245, word: 'centre', sentence: 'The middle point of something.', category: 'soft-c', difficulty: 'medium' },
  { id: 246, word: 'certain', sentence: 'Completely sure about it.', category: 'soft-c', difficulty: 'medium' },
  { id: 247, word: 'celebrate', sentence: 'Have a party for something good.', category: 'soft-c', difficulty: 'medium' },
  { id: 248, word: 'century', sentence: 'A hundred years of time.', category: 'soft-c', difficulty: 'medium' },
  { id: 249, word: 'principal', sentence: 'The head teacher of a school.', category: 'soft-c', difficulty: 'hard' },
  { id: 250, word: 'medicine', sentence: 'Something to make you better.', category: 'soft-c', difficulty: 'medium' },
  { id: 251, word: 'bicycle', sentence: 'A bike with two wheels.', category: 'soft-c', difficulty: 'easy' },
  { id: 252, word: 'decide', sentence: 'Choose what you will do.', category: 'soft-c', difficulty: 'medium' },
  { id: 253, word: 'recent', sentence: 'Not long ago, quite new.', category: 'soft-c', difficulty: 'medium' },
  { id: 254, word: 'decent', sentence: 'Good enough, acceptable.', category: 'soft-c', difficulty: 'hard' },
  { id: 255, word: 'percent', sentence: 'Out of one hundred parts.', category: 'soft-c', difficulty: 'hard' },
  { id: 256, word: 'balance', sentence: 'Being steady, not falling over.', category: 'soft-c', difficulty: 'medium' },

  // ===== MORE HOMOPHONES (15) =====
  { id: 257, word: 'whether', sentence: 'If this or that happens.', category: 'homophones', difficulty: 'hard' },
  { id: 258, word: 'weather', sentence: 'Rain, sun, wind or snow outside.', category: 'homophones', difficulty: 'medium' },
  { id: 259, word: 'accept', sentence: 'To take or agree to something.', category: 'homophones', difficulty: 'hard' },
  { id: 260, word: 'except', sentence: 'Not including this one thing.', category: 'homophones', difficulty: 'hard' },
  { id: 261, word: 'affect', sentence: 'To change or influence something.', category: 'homophones', difficulty: 'hard' },
  { id: 262, word: 'effect', sentence: 'The result of what happened.', category: 'homophones', difficulty: 'hard' },
  { id: 263, word: 'brake', sentence: 'Stop a car or bike moving.', category: 'homophones', difficulty: 'medium' },
  { id: 264, word: 'break', sentence: 'Smash into pieces or snap.', category: 'homophones', difficulty: 'medium' },
  { id: 265, word: 'medal', sentence: 'A prize for winning something.', category: 'homophones', difficulty: 'medium' },
  { id: 266, word: 'meddle', sentence: 'Interfere with someone else.', category: 'homophones', difficulty: 'hard' },
  { id: 267, word: 'father', sentence: 'Your male parent, your dad.', category: 'homophones', difficulty: 'easy' },
  { id: 268, word: 'farther', sentence: 'A longer distance away.', category: 'homophones', difficulty: 'hard' },
  { id: 269, word: 'peace', sentence: 'No fighting or war, calm.', category: 'homophones', difficulty: 'medium' },
  { id: 270, word: 'piece', sentence: 'A part or bit of something.', category: 'homophones', difficulty: 'medium' },
  { id: 271, word: 'principal', sentence: 'Most important or main one.', category: 'homophones', difficulty: 'hard' },

  // ===== MORE HARD SPELLINGS (15) =====
  { id: 272, word: 'excellent', sentence: 'Very very good indeed.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 273, word: 'experience', sentence: 'Something that happened to you.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 274, word: 'explanation', sentence: 'Telling how or why something is.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 275, word: 'exaggerate', sentence: 'Make something sound bigger.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 276, word: 'temperature', sentence: 'How hot or cold it is.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 277, word: 'literature', sentence: 'Books and written stories.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 278, word: 'recommend', sentence: 'Say something is good to try.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 279, word: 'restaurant', sentence: 'A place to eat meals out.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 280, word: 'secretary', sentence: 'Someone who does office work.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 281, word: 'recognise', sentence: 'Know who someone is when you see.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 282, word: 'pronunciation', sentence: 'How a word should sound.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 283, word: 'language', sentence: 'The words people speak.', category: 'hard-spellings', difficulty: 'medium' },
  { id: 284, word: 'lightning', sentence: 'Bright flash in a storm.', category: 'hard-spellings', difficulty: 'medium' },
  { id: 285, word: 'soldier', sentence: 'Someone in the army.', category: 'hard-spellings', difficulty: 'medium' },
  { id: 286, word: 'amateur', sentence: 'Not a professional, just for fun.', category: 'hard-spellings', difficulty: 'hard' },

  // ===== MORE PREFIXES (10) =====
  { id: 287, word: 'misunderstand', sentence: 'Get the wrong idea about something.', category: 'prefixes', difficulty: 'hard' },
  { id: 288, word: 'misbehave', sentence: 'Act badly or naughty.', category: 'prefixes', difficulty: 'medium' },
  { id: 289, word: 'illegal', sentence: 'Against the law, not allowed.', category: 'prefixes', difficulty: 'hard' },
  { id: 290, word: 'irregular', sentence: 'Not following the normal pattern.', category: 'prefixes', difficulty: 'hard' },
  { id: 291, word: 'inactive', sentence: 'Not moving or doing anything.', category: 'prefixes', difficulty: 'medium' },
  { id: 292, word: 'international', sentence: 'Between different countries.', category: 'prefixes', difficulty: 'hard' },
  { id: 293, word: 'preview', sentence: 'Look at something before it starts.', category: 'prefixes', difficulty: 'medium' },
  { id: 294, word: 'submarine', sentence: 'A ship that goes under water.', category: 'prefixes', difficulty: 'medium' },
  { id: 295, word: 'supermarket', sentence: 'Big shop selling food and goods.', category: 'prefixes', difficulty: 'easy' },
  { id: 296, word: 'telephone', sentence: 'Device for speaking to someone far.', category: 'prefixes', difficulty: 'easy' },

  // ===== MORE COMPOUND WORDS (4) =====
  { id: 297, word: 'understand', sentence: 'Know what something means.', category: 'compound', difficulty: 'easy' },
  { id: 298, word: 'somebody', sentence: 'A person, not sure who.', category: 'compound', difficulty: 'easy' },
  { id: 299, word: 'weekend', sentence: 'Saturday and Sunday together.', category: 'compound', difficulty: 'easy' },
  { id: 300, word: 'afternoon', sentence: 'Time between midday and evening.', category: 'compound', difficulty: 'easy' },

  // ===== SUFFIXES (18 words) =====
  { id: 301, word: 'playing', sentence: 'Having fun with toys or games.', category: 'suffixes', difficulty: 'easy' },
  { id: 302, word: 'running', sentence: 'Moving fast on your feet.', category: 'suffixes', difficulty: 'easy' },
  { id: 303, word: 'quickly', sentence: 'Done in a fast way.', category: 'suffixes', difficulty: 'easy' },
  { id: 304, word: 'slowly', sentence: 'Done in a slow way.', category: 'suffixes', difficulty: 'easy' },
  { id: 305, word: 'beautiful', sentence: 'Very pretty to look at.', category: 'suffixes', difficulty: 'medium' },
  { id: 306, word: 'wonderful', sentence: 'Really amazing and great.', category: 'suffixes', difficulty: 'medium' },
  { id: 307, word: 'hopeless', sentence: 'No chance of getting better.', category: 'suffixes', difficulty: 'medium' },
  { id: 308, word: 'careless', sentence: 'Not being careful enough.', category: 'suffixes', difficulty: 'medium' },
  { id: 309, word: 'happiness', sentence: 'The feeling of being happy.', category: 'suffixes', difficulty: 'medium' },
  { id: 310, word: 'darkness', sentence: 'When there is no light.', category: 'suffixes', difficulty: 'easy' },
  { id: 311, word: 'enjoyment', sentence: 'Having a good time.', category: 'suffixes', difficulty: 'medium' },
  { id: 312, word: 'movement', sentence: 'Changing position or place.', category: 'suffixes', difficulty: 'medium' },
  { id: 313, word: 'comfortable', sentence: 'Nice and cosy to use.', category: 'suffixes', difficulty: 'hard' },
  { id: 314, word: 'valuable', sentence: 'Worth a lot of money.', category: 'suffixes', difficulty: 'medium' },
  { id: 315, word: 'terrible', sentence: 'Very bad or awful.', category: 'suffixes', difficulty: 'medium' },
  { id: 316, word: 'kindness', sentence: 'Being nice to other people.', category: 'suffixes', difficulty: 'easy' },
  { id: 317, word: 'useful', sentence: 'Helpful for doing something.', category: 'suffixes', difficulty: 'easy' },
  { id: 318, word: 'endless', sentence: 'Going on and on forever.', category: 'suffixes', difficulty: 'medium' },

  // ===== TRICKY PLURALS (20 words) =====
  { id: 319, word: 'babies', sentence: 'More than one baby.', category: 'plurals', difficulty: 'easy' },
  { id: 320, word: 'ladies', sentence: 'More than one lady.', category: 'plurals', difficulty: 'easy' },
  { id: 321, word: 'stories', sentence: 'More than one story.', category: 'plurals', difficulty: 'easy' },
  { id: 322, word: 'knives', sentence: 'More than one knife.', category: 'plurals', difficulty: 'medium' },
  { id: 323, word: 'wives', sentence: 'More than one wife.', category: 'plurals', difficulty: 'medium' },
  { id: 324, word: 'lives', sentence: 'More than one life.', category: 'plurals', difficulty: 'medium' },
  { id: 325, word: 'shelves', sentence: 'More than one shelf.', category: 'plurals', difficulty: 'medium' },
  { id: 326, word: 'loaves', sentence: 'More than one loaf of bread.', category: 'plurals', difficulty: 'hard' },
  { id: 327, word: 'thieves', sentence: 'More than one thief.', category: 'plurals', difficulty: 'medium' },
  { id: 328, word: 'children', sentence: 'More than one child.', category: 'plurals', difficulty: 'easy' },
  { id: 329, word: 'teeth', sentence: 'More than one tooth.', category: 'plurals', difficulty: 'easy' },
  { id: 330, word: 'feet', sentence: 'More than one foot.', category: 'plurals', difficulty: 'easy' },
  { id: 331, word: 'geese', sentence: 'More than one goose.', category: 'plurals', difficulty: 'medium' },
  { id: 332, word: 'mice', sentence: 'More than one mouse.', category: 'plurals', difficulty: 'easy' },
  { id: 333, word: 'men', sentence: 'More than one man.', category: 'plurals', difficulty: 'easy' },
  { id: 334, word: 'women', sentence: 'More than one woman.', category: 'plurals', difficulty: 'easy' },
  { id: 335, word: 'oxen', sentence: 'More than one ox.', category: 'plurals', difficulty: 'hard' },
  { id: 336, word: 'heroes', sentence: 'More than one hero.', category: 'plurals', difficulty: 'medium' },
  { id: 337, word: 'potatoes', sentence: 'More than one potato.', category: 'plurals', difficulty: 'medium' },
  { id: 338, word: 'tomatoes', sentence: 'More than one tomato.', category: 'plurals', difficulty: 'medium' },

  // ===== IRREGULAR PAST TENSE (20 words) =====
  { id: 339, word: 'ran', sentence: 'She ran to catch the bus.', category: 'past-tense', difficulty: 'easy' },
  { id: 340, word: 'went', sentence: 'We went to the park yesterday.', category: 'past-tense', difficulty: 'easy' },
  { id: 341, word: 'came', sentence: 'They came to visit last week.', category: 'past-tense', difficulty: 'easy' },
  { id: 342, word: 'saw', sentence: 'I saw a rainbow this morning.', category: 'past-tense', difficulty: 'easy' },
  { id: 343, word: 'ate', sentence: 'He ate all his dinner.', category: 'past-tense', difficulty: 'easy' },
  { id: 344, word: 'wrote', sentence: 'She wrote a letter to her friend.', category: 'past-tense', difficulty: 'medium' },
  { id: 345, word: 'spoke', sentence: 'The teacher spoke to the class.', category: 'past-tense', difficulty: 'medium' },
  { id: 346, word: 'broke', sentence: 'The vase broke when it fell.', category: 'past-tense', difficulty: 'easy' },
  { id: 347, word: 'chose', sentence: 'She chose the red one.', category: 'past-tense', difficulty: 'medium' },
  { id: 348, word: 'drove', sentence: 'Dad drove us to school.', category: 'past-tense', difficulty: 'easy' },
  { id: 349, word: 'flew', sentence: 'The bird flew away quickly.', category: 'past-tense', difficulty: 'easy' },
  { id: 350, word: 'knew', sentence: 'I knew the answer straight away.', category: 'past-tense', difficulty: 'medium' },
  { id: 351, word: 'threw', sentence: 'He threw the ball over the fence.', category: 'past-tense', difficulty: 'medium' },
  { id: 352, word: 'grew', sentence: 'The flowers grew in the spring.', category: 'past-tense', difficulty: 'easy' },
  { id: 353, word: 'sang', sentence: 'We sang happy birthday together.', category: 'past-tense', difficulty: 'easy' },
  { id: 354, word: 'swam', sentence: 'She swam across the pool.', category: 'past-tense', difficulty: 'easy' },
  { id: 355, word: 'won', sentence: 'Our team won the match.', category: 'past-tense', difficulty: 'easy' },
  { id: 356, word: 'taught', sentence: 'Miss Jones taught us about fractions.', category: 'past-tense', difficulty: 'hard' },
  { id: 357, word: 'caught', sentence: 'I caught the ball with one hand.', category: 'past-tense', difficulty: 'medium' },
  { id: 358, word: 'brought', sentence: 'She brought her favourite toy.', category: 'past-tense', difficulty: 'medium' },
];

const sampleRewards = [
  // ========== TINY TREATS (45-105 coins) - Daily wins ==========
  { id: 1, name: 'Gold Star Sticker', cost: 45, icon: '⭐' },
  { id: 2, name: 'High Five from Dad', cost: 45, icon: '🖐️' },
  { id: 3, name: 'Victory Dance', cost: 75, icon: '💃' },
  { id: 4, name: 'Silly Photo Together', cost: 75, icon: '🤳' },
  { id: 5, name: 'Pick Background Music', cost: 105, icon: '🎵' },
  { id: 6, name: 'Stay Up 10 Mins Late', cost: 105, icon: '🌙' },

  // ========== QUICK WINS (120-300 coins) - Few days ==========
  { id: 7, name: 'Stay Up 15 Mins Late', cost: 120, icon: '🌛' },
  { id: 8, name: 'Pick a Snack', cost: 150, icon: '🍿' },
  { id: 9, name: 'Extra TV Episode', cost: 180, icon: '📺' },
  { id: 10, name: 'No Chores Pass', cost: 195, icon: '🎫' },
  { id: 11, name: 'Cookie Treat', cost: 195, icon: '🍪' },
  { id: 12, name: 'Extra Dessert', cost: 225, icon: '🧁' },
  { id: 13, name: 'Pick Car Music', cost: 255, icon: '🚗' },
  { id: 14, name: 'Lie In (30 mins)', cost: 270, icon: '😴' },
  { id: 15, name: 'Stay Up 30 Mins Late', cost: 300, icon: '🌜' },

  // ========== TREATS (345-705 coins) - Weekly goals ==========
  { id: 16, name: 'Boba Tea', cost: 345, icon: '🧋' },
  { id: 17, name: 'Pick Movie Night', cost: 405, icon: '🎬' },
  { id: 18, name: 'Smoothie Trip', cost: 420, icon: '🥤' },
  { id: 19, name: '30 Mins Screen Time', cost: 450, icon: '📱' },
  { id: 20, name: 'Hot Chocolate Trip', cost: 480, icon: '☕' },
  { id: 21, name: 'Sweet Shop Visit', cost: 495, icon: '🍬' },
  { id: 22, name: 'Ice Cream Trip', cost: 525, icon: '🍦' },
  { id: 23, name: 'Milkshake Trip', cost: 555, icon: '🥛' },
  { id: 24, name: 'Donut Run', cost: 570, icon: '🍩' },
  { id: 25, name: 'Breakfast in Bed', cost: 600, icon: '🥞' },
  { id: 26, name: 'Pancake Morning', cost: 630, icon: '🥞' },
  { id: 27, name: 'Waffle Treat', cost: 645, icon: '🧇' },
  { id: 28, name: 'Pick Dinner', cost: 705, icon: '🍕' },

  // ========== ACTIVITIES (750-1200 coins) - Bi-weekly goals ==========
  { id: 29, name: 'Games Night (Your Rules)', cost: 750, icon: '🎮' },
  { id: 30, name: 'Park Picnic', cost: 795, icon: '🧺' },
  { id: 31, name: '1 Hour Screen Time', cost: 855, icon: '💻' },
  { id: 32, name: 'Bubble Bath with Extras', cost: 900, icon: '🛁' },
  { id: 33, name: 'Nail Painting Session', cost: 945, icon: '💅' },
  { id: 34, name: 'Dance Party', cost: 1005, icon: '🪩' },
  { id: 35, name: 'Puzzle Together', cost: 1050, icon: '🧩' },
  { id: 36, name: 'Build Something Together', cost: 1095, icon: '🔧' },
  { id: 37, name: 'Art Session', cost: 1155, icon: '🎨' },
  { id: 38, name: 'New Book', cost: 1200, icon: '📚' },

  // ========== BIG REWARDS (1305-2010 coins) - Monthly goals ==========
  { id: 39, name: 'Cinema Trip', cost: 1305, icon: '🎥' },
  { id: 40, name: 'Bowling Trip', cost: 1395, icon: '🎳' },
  { id: 41, name: 'Baking Day Together', cost: 1500, icon: '🍰' },
  { id: 42, name: 'Craft Supplies Haul', cost: 1545, icon: '✂️' },
  { id: 43, name: 'Mini Golf', cost: 1605, icon: '⛳' },
  { id: 44, name: 'Trampoline Park', cost: 1695, icon: '🤸' },
  { id: 45, name: 'Friend Playdate', cost: 1800, icon: '👯' },
  { id: 46, name: 'Swimming Trip', cost: 1860, icon: '🏊' },
  { id: 47, name: 'Takeaway Night', cost: 1905, icon: '🥡' },
  { id: 48, name: 'Skip a Homework', cost: 2010, icon: '📝' },

  // ========== ADVENTURES (2205-3405 coins) - Term goals ==========
  { id: 49, name: 'Day Out (Local)', cost: 2205, icon: '🎡' },
  { id: 50, name: 'Escape Room', cost: 2400, icon: '🔐' },
  { id: 51, name: 'Pottery Painting', cost: 2505, icon: '🏺' },
  { id: 52, name: 'Soft Play (Big Kid Zone)', cost: 2595, icon: '🏰' },
  { id: 53, name: 'Laser Tag', cost: 2805, icon: '🔫' },
  { id: 54, name: 'Friend Sleepover', cost: 3000, icon: '🛏️' },
  { id: 55, name: 'Zoo/Aquarium Trip', cost: 3195, icon: '🐧' },
  { id: 56, name: 'Ice Skating', cost: 3405, icon: '⛸️' },

  // ========== EPIC REWARDS (3600-5505 coins) - Half-term goals ==========
  { id: 57, name: 'Shopping Trip', cost: 3600, icon: '🛍️' },
  { id: 58, name: 'Choose a New Game', cost: 3795, icon: '🎲' },
  { id: 59, name: 'Climbing Wall', cost: 4005, icon: '🧗' },
  { id: 60, name: 'Beach Day', cost: 4200, icon: '🏖️' },
  { id: 61, name: 'Theme Park Day', cost: 4500, icon: '🎢' },
  { id: 62, name: 'Water Park', cost: 4800, icon: '🌊' },
  { id: 63, name: 'Special Day Out', cost: 5010, icon: '✨' },
  { id: 64, name: 'Sleepover Party (2 Friends)', cost: 5505, icon: '🎉' },

  // ========== LEGENDARY (6000-10005 coins) - Half-year goals ==========
  { id: 65, name: 'Big Surprise', cost: 6000, icon: '🎁' },
  { id: 66, name: 'Museum/Gallery Trip', cost: 6495, icon: '🏛️' },
  { id: 67, name: 'Adventure Day', cost: 7005, icon: '🗺️' },
  { id: 68, name: 'Theatre Show', cost: 7500, icon: '🎭' },
  { id: 69, name: 'Concert/Show Tickets', cost: 8010, icon: '🎤' },
  { id: 70, name: 'Spa Day', cost: 8505, icon: '🧖' },
  { id: 71, name: 'Castle/Palace Visit', cost: 9000, icon: '🏰' },
  { id: 72, name: 'Forest Adventure', cost: 9495, icon: '🌲' },
  { id: 73, name: 'Ultimate Day Out', cost: 10005, icon: '🌟' },

  // ========== MYTHIC (11010-18000 coins) - Year goals ==========
  { id: 74, name: 'Makeover Day', cost: 11010, icon: '💄' },
  { id: 75, name: 'Redecorate Room', cost: 12000, icon: '🛋️' },
  { id: 76, name: 'Photography Day', cost: 13005, icon: '📸' },
  { id: 77, name: 'Cooking Class', cost: 14010, icon: '👩‍🍳' },
  { id: 78, name: 'New Gadget', cost: 15000, icon: '📱' },
  { id: 79, name: 'Horse Riding Lesson', cost: 16005, icon: '🐴' },
  { id: 80, name: 'Glamping Night', cost: 17010, icon: '⛺' },
  { id: 81, name: 'Weekend Trip', cost: 18000, icon: '🏨' },

  // ========== ULTIMATE (20010-30000 coins) - Champion rewards ==========
  { id: 82, name: 'Birthday Party Upgrade', cost: 20010, icon: '🎂' },
  { id: 83, name: 'Design Your Day', cost: 22005, icon: '📋' },
  { id: 84, name: 'Year Champion Prize', cost: 25005, icon: '🏆' },
  { id: 85, name: 'Ultimate Adventure', cost: 28005, icon: '🚀' },
  { id: 86, name: 'Dream Day', cost: 30000, icon: '👸' },
];

// ============ TIERED REWARD SYSTEM ============
// Calculate cost per subject (split evenly across 3 subjects)
const getRewardCostPerSubject = (totalCost) => {
  const base = Math.floor(totalCost / 3);
  const remainder = totalCost % 3;

  // Distribute remainder fairly: +1 to first subjects if remainder exists
  return {
    spelling: base + (remainder >= 1 ? 1 : 0),
    maths: base + (remainder >= 2 ? 1 : 0),
    science: base
  };
};

// Check if player can afford reward (has enough coins in ALL subjects)
const canAffordReward = (reward, gameData) => {
  const costs = getRewardCostPerSubject(reward.cost);
  return (
    gameData.spelling.coins >= costs.spelling &&
    gameData.maths.coins >= costs.maths &&
    gameData.science.coins >= costs.science
  );
};

// Get gaps for each subject (how many more coins needed)
const getRewardGaps = (reward, gameData) => {
  const costs = getRewardCostPerSubject(reward.cost);
  return {
    spelling: {
      current: gameData.spelling.coins,
      needed: costs.spelling,
      gap: Math.max(0, costs.spelling - gameData.spelling.coins),
      ready: gameData.spelling.coins >= costs.spelling
    },
    maths: {
      current: gameData.maths.coins,
      needed: costs.maths,
      gap: Math.max(0, costs.maths - gameData.maths.coins),
      ready: gameData.maths.coins >= costs.maths
    },
    science: {
      current: gameData.science.coins,
      needed: costs.science,
      gap: Math.max(0, costs.science - gameData.science.coins),
      ready: gameData.science.coins >= costs.science
    }
  };
};

// Determine tier based on reward cost
const getRewardTier = (cost) => {
  if (cost <= 300) return { tier: 1, name: 'Starter', requirements: { spelling: 0, maths: 0, science: 0 } };
  if (cost <= 700) return { tier: 2, name: 'Bronze', requirements: { spelling: 100, maths: 100, science: 0 } }; // 2 subjects
  if (cost <= 1500) return { tier: 3, name: 'Silver', requirements: { spelling: 250, maths: 250, science: 250 } }; // All 3
  if (cost <= 3500) return { tier: 4, name: 'Gold', requirements: { spelling: 500, maths: 500, science: 500 } };
  if (cost <= 7000) return { tier: 5, name: 'Platinum', requirements: { spelling: 1000, maths: 1000, science: 1000 } };
  return { tier: 6, name: 'Diamond', requirements: { spelling: 2500, maths: 2500, science: 2500 } };
};

// Check if reward tier is unlocked
const isRewardUnlocked = (reward, gameData) => {
  const tierInfo = getRewardTier(reward.cost);
  const { requirements } = tierInfo;

  // Check if player has earned enough total coins in each required subject
  const spellingEarned = gameData.spelling?.totalCoinsEarned || 0;
  const mathsEarned = gameData.maths?.totalCoinsEarned || 0;
  const scienceEarned = gameData.science?.totalCoinsEarned || 0;

  return spellingEarned >= requirements.spelling &&
         mathsEarned >= requirements.maths &&
         scienceEarned >= requirements.science;
};

// Get progress toward unlocking a reward
const getUnlockProgress = (reward, gameData) => {
  const tierInfo = getRewardTier(reward.cost);
  const { requirements } = tierInfo;

  const spellingEarned = gameData.spelling?.totalCoinsEarned || 0;
  const mathsEarned = gameData.maths?.totalCoinsEarned || 0;
  const scienceEarned = gameData.science?.totalCoinsEarned || 0;

  return {
    tier: tierInfo.tier,
    tierName: tierInfo.name,
    spelling: { current: spellingEarned, needed: requirements.spelling, met: spellingEarned >= requirements.spelling },
    maths: { current: mathsEarned, needed: requirements.maths, met: mathsEarned >= requirements.maths },
    science: { current: scienceEarned, needed: requirements.science, met: scienceEarned >= requirements.science },
    unlocked: spellingEarned >= requirements.spelling && mathsEarned >= requirements.maths && scienceEarned >= requirements.science
  };
};

const badges = [
  // ========== GETTING STARTED ==========
  { id: 'first', name: 'First Steps', icon: '👣', desc: 'Complete your first test' },
  { id: 'first5', name: 'Warming Up', icon: '🌡️', desc: 'Complete 5 tests' },
  { id: 'comeback', name: 'Back Again', icon: '🔄', desc: 'Return after a day off' },

  // ========== PERFECT SCORES ==========
  { id: 'perfect', name: 'Perfect Score', icon: '⭐', desc: 'Get 100% on a test' },
  { id: 'perfect3', name: 'Hat Trick', icon: '🎩', desc: '3 perfect scores' },
  { id: 'perfect5', name: 'High Five', icon: '🖐️', desc: '5 perfect scores' },
  { id: 'perfect10', name: 'Perfect Ten', icon: '💯', desc: '10 perfect scores' },
  { id: 'perfect15', name: 'Fifteen Flawless', icon: '🎀', desc: '15 perfect scores' },
  { id: 'perfect25', name: 'Quarter Century', icon: '🎯', desc: '25 perfect scores' },
  { id: 'perfect50', name: 'Half Century', icon: '🏹', desc: '50 perfect scores' },
  { id: 'perfect75', name: 'Three Quarters', icon: '🎪', desc: '75 perfect scores' },
  { id: 'perfect100', name: 'Centurion', icon: '🦅', desc: '100 perfect scores' },
  { id: 'perfect150', name: 'Spelling Sage', icon: '🧙‍♀️', desc: '150 perfect scores' },
  { id: 'perfect200', name: 'Word Wizard', icon: '✨', desc: '200 perfect scores' },

  // ========== STREAKS ==========
  { id: 'streak3', name: 'Streak Starter', icon: '🔥', desc: '3-day streak' },
  { id: 'streak5', name: 'Five Alive', icon: '🖐️', desc: '5-day streak' },
  { id: 'streak7', name: 'Week Warrior', icon: '💪', desc: '1-week streak' },
  { id: 'streak10', name: 'Ten Days Strong', icon: '🔟', desc: '10-day streak' },
  { id: 'streak14', name: 'Fortnight Fighter', icon: '⚔️', desc: '2-week streak' },
  { id: 'streak21', name: 'Triple Week', icon: '🏆', desc: '3-week streak' },
  { id: 'streak28', name: 'Month Master', icon: '👑', desc: '4-week streak' },
  { id: 'streak35', name: 'Five Week Fury', icon: '⚡', desc: '35-day streak' },
  { id: 'streak45', name: 'Six Week Star', icon: '🌟', desc: '45-day streak' },
  { id: 'streak60', name: 'Two Month Hero', icon: '🦸', desc: '60-day streak' },
  { id: 'streak75', name: 'Seventy Five', icon: '💎', desc: '75-day streak' },
  { id: 'streak90', name: 'Quarter Year', icon: '🌙', desc: '90-day streak' },
  { id: 'streak100', name: 'Century Streak', icon: '💯', desc: '100-day streak!' },
  { id: 'streak120', name: 'Four Month Legend', icon: '🔮', desc: '120-day streak' },
  { id: 'streak150', name: 'Five Month Fire', icon: '🌋', desc: '150-day streak' },
  { id: 'streak180', name: 'Half Year Hero', icon: '☀️', desc: '180-day streak' },
  { id: 'streak200', name: 'Two Hundred', icon: '🎊', desc: '200-day streak!' },
  { id: 'streak270', name: 'Nine Month Master', icon: '💫', desc: '270-day streak' },
  { id: 'streak300', name: 'Three Hundred', icon: '🏅', desc: '300-day streak!' },
  { id: 'streak365', name: 'YEAR CHAMPION', icon: '👸', desc: '365-day streak!' },

  // ========== COIN MILESTONES ==========
  { id: 'century', name: 'Century Club', icon: '💰', desc: 'Earn 100 coins' },
  { id: 'coins250', name: 'Coin Starter', icon: '🪙', desc: 'Earn 250 coins' },
  { id: 'coins500', name: 'Coin Collector', icon: '💎', desc: 'Earn 500 coins' },
  { id: 'coins750', name: 'Treasure Seeker', icon: '🗝️', desc: 'Earn 750 coins' },
  { id: 'coins1000', name: 'Treasure Hunter', icon: '🏴‍☠️', desc: 'Earn 1,000 coins' },
  { id: 'coins1500', name: 'Coin Hoarder', icon: '🏺', desc: 'Earn 1,500 coins' },
  { id: 'coins2000', name: 'Gold Digger', icon: '⛏️', desc: 'Earn 2,000 coins' },
  { id: 'coins2500', name: 'Money Bags', icon: '💵', desc: 'Earn 2,500 coins' },
  { id: 'coins3000', name: 'Cash Queen', icon: '👑', desc: 'Earn 3,000 coins' },
  { id: 'coins4000', name: 'Fortune Seeker', icon: '🔮', desc: 'Earn 4,000 coins' },
  { id: 'coins5000', name: 'Gold Rush', icon: '🥇', desc: 'Earn 5,000 coins' },
  { id: 'coins7500', name: 'Wealthy', icon: '💎', desc: 'Earn 7,500 coins' },
  { id: 'coins10000', name: 'Ten Thousand', icon: '🤑', desc: 'Earn 10,000 coins' },
  { id: 'coins12500', name: 'Richie Rich', icon: '🎰', desc: 'Earn 12,500 coins' },
  { id: 'coins15000', name: 'Fortune Finder', icon: '💸', desc: 'Earn 15,000 coins' },
  { id: 'coins17500', name: 'Gold Vault', icon: '🏦', desc: 'Earn 17,500 coins' },
  { id: 'coins20000', name: 'Mega Rich', icon: '💲', desc: 'Earn 20,000 coins' },
  { id: 'coins25000', name: 'Quarter Million', icon: '🌟', desc: 'Earn 25,000 coins!' },
  { id: 'coins30000', name: 'COIN QUEEN', icon: '👸', desc: 'Earn 30,000 coins!' },

  // ========== TEST MILESTONES ==========
  { id: 'tests5', name: 'First Few', icon: '📝', desc: '5 tests' },
  { id: 'tests10', name: 'Getting Started', icon: '📚', desc: '10 tests' },
  { id: 'tests15', name: 'Building Momentum', icon: '🎈', desc: '15 tests' },
  { id: 'tests25', name: 'Committed', icon: '📖', desc: '25 tests' },
  { id: 'tests40', name: 'Keep Going', icon: '🚶', desc: '40 tests' },
  { id: 'tests50', name: 'Dedicated', icon: '🧙', desc: '50 tests' },
  { id: 'tests75', name: 'Seventy Five', icon: '🎯', desc: '75 tests' },
  { id: 'tests100', name: 'Century', icon: '🏅', desc: '100 tests' },
  { id: 'tests125', name: 'Quarter Plus', icon: '📈', desc: '125 tests' },
  { id: 'tests150', name: 'Unstoppable', icon: '🚀', desc: '150 tests' },
  { id: 'tests175', name: 'Nearly There', icon: '🎪', desc: '175 tests' },
  { id: 'tests200', name: 'Super Speller', icon: '⚡', desc: '200 tests' },
  { id: 'tests225', name: 'Word Expert', icon: '📕', desc: '225 tests' },
  { id: 'tests250', name: 'Elite', icon: '🎖️', desc: '250 tests' },
  { id: 'tests275', name: 'Almost Legend', icon: '🌅', desc: '275 tests' },
  { id: 'tests300', name: 'Legendary', icon: '👨‍🎓', desc: '300 tests' },
  { id: 'tests325', name: 'Word Master', icon: '📜', desc: '325 tests' },
  { id: 'tests350', name: 'Nearly Champion', icon: '🎉', desc: '350 tests' },
  { id: 'tests365', name: 'YEAR OF SPELLING', icon: '📅', desc: '365 tests!' },
  { id: 'tests400', name: 'Beyond Legend', icon: '🌌', desc: '400 tests!' },

  // ========== CATEGORY MASTERY (All 10 categories) ==========
  { id: 'master_tricky', name: 'Tricky Master', icon: '🎭', desc: '90% on tricky words' },
  { id: 'master_ibeforee', name: 'I Before E Expert', icon: '👁️', desc: '90% on i-before-e' },
  { id: 'master_softc', name: 'Soft C Specialist', icon: '🐱', desc: '90% on soft-c words' },
  { id: 'master_double', name: 'Double Trouble', icon: '✌️', desc: '90% on double letters' },
  { id: 'master_silent', name: 'Silent Hero', icon: '🤫', desc: '90% on silent letters' },
  { id: 'master_endings', name: 'Ending Expert', icon: '🔚', desc: '90% on word endings' },
  { id: 'master_homophones', name: 'Sound Alike Pro', icon: '👂', desc: '90% on homophones' },
  { id: 'master_hard', name: 'Challenge Champion', icon: '💪', desc: '90% on hard spellings' },
  { id: 'master_prefixes', name: 'Prefix Pro', icon: '🔤', desc: '90% on prefixes' },
  { id: 'master_suffixes', name: 'Suffix Star', icon: '✨', desc: '90% on suffixes' },
  { id: 'master_compound', name: 'Compound King', icon: '🔗', desc: '90% on compound words' },
  { id: 'master_plurals', name: 'Plural Perfectionist', icon: '🔢', desc: '90% on tricky plurals' },
  { id: 'master_pasttense', name: 'Past Tense Pro', icon: '⏰', desc: '90% on past tense' },

  // ========== SPECIAL ACHIEVEMENTS ==========
  { id: 'speedster', name: 'Speedster', icon: '⚡', desc: 'Complete test in under 30s' },
  { id: 'patient', name: 'Patient Speller', icon: '🐢', desc: 'Take your time (2+ mins)' },
  { id: 'earlybird', name: 'Early Bird', icon: '🐦', desc: 'Test before 8am' },
  { id: 'nightowl', name: 'Night Owl', icon: '🦉', desc: 'Test after 8pm' },
  { id: 'weekend', name: 'Weekend Warrior', icon: '🎮', desc: 'Test on Saturday & Sunday' },
  { id: 'hotstreak5', name: 'Hot Streak', icon: '🔥', desc: '5 correct in a row (in-test)' },
  { id: 'allcorrect3', name: 'Triple Perfect', icon: '🎯', desc: '3 perfect tests in a row' },
  { id: 'allcorrect5', name: 'Five Star', icon: '⭐', desc: '5 perfect tests in a row' },
  { id: 'firsttry', name: 'First Try Hero', icon: '🏆', desc: 'Get word right you got wrong before' },

  // ========== MILESTONE ACHIEVEMENTS ==========
  { id: 'allrounder', name: 'All-Rounder', icon: '🌈', desc: '75%+ in 5 categories' },
  { id: 'versatile', name: 'Versatile', icon: '🎨', desc: '80%+ in 7 categories' },
  { id: 'mastery', name: 'Category Master', icon: '🏆', desc: '85%+ in all categories' },
  { id: 'perfectionist', name: 'Perfectionist', icon: '💎', desc: '90%+ in all categories' },
  { id: 'ultimate', name: 'ULTIMATE SPELLER', icon: '👸', desc: '95%+ in all categories!' },

  // ========== FUN BADGES ==========
  { id: 'consistent', name: 'Consistent', icon: '📊', desc: 'Same score 3 tests in a row' },
  { id: 'improver', name: 'Improver', icon: '📈', desc: 'Beat your average by 20%' },
  { id: 'determined', name: 'Determined', icon: '💪', desc: 'Keep trying after 3 wrong' },
  { id: 'curious', name: 'Curious', icon: '🔍', desc: 'Try all 10 word categories' },
  { id: 'collector', name: 'Badge Collector', icon: '🎖️', desc: 'Earn 25 badges' },
  { id: 'halfbadges', name: 'Halfway Hero', icon: '🌗', desc: 'Earn 50% of all badges' },
  { id: 'badgemaster', name: 'Badge Master', icon: '🏅', desc: 'Earn 75% of all badges' },
];

const categoryNames = {
  'tricky': 'Tricky Words',
  'i-before-e': 'I Before E',
  'soft-c': 'Soft C Words',
  'double-letters': 'Double Letters',
  'silent-letters': 'Silent Letters',
  'endings': 'Word Endings',
  'homophones': 'Sound-Alike Words',
  'hard-spellings': 'Challenge Words',
  'prefixes': 'Prefixes',
  'suffixes': 'Suffixes',
  'compound': 'Compound Words',
  'plurals': 'Tricky Plurals',
  'past-tense': 'Past Tense'
};

// ============ STORAGE HELPERS ============
const STORAGE_KEY = 'alba_spelling_data';

const getDefaultData = () => ({
  streak: 0,
  bestStreak: 0,
  lastTestDate: null,
  earnedBadges: [],
  claimedRewards: [],
  currentSubject: 'spelling', // Track which subject is active
  spelling: {
    coins: 0,
    totalCoinsEarned: 0,
    testHistory: [],
    wordStats: {}, // { wordId: { attempts: 0, correct: 0, lastAttempt: date } }
  },
  maths: {
    coins: 0,
    totalCoinsEarned: 0,
    testHistory: [],
    questionStats: {}, // { questionId: { attempts: 0, correct: 0, lastAttempt: date } }
  },
  science: {
    coins: 0,
    totalCoinsEarned: 0,
    testHistory: [],
    questionStats: {}, // { questionId: { attempts: 0, correct: 0, lastAttempt: date } }
  },
});

// Migration function to convert old single-subject data to multi-subject
const migrateToMultiSubject = (oldData) => {
  // Check if already migrated to per-subject coins
  if (oldData.spelling?.coins !== undefined) {
    console.log('✅ Data already migrated to per-subject coins');
    return oldData;
  }

  // Migrate old data structure (move global coins to spelling.coins)
  const transferredCoins = oldData.coins || 0;
  const transferredTotal = oldData.totalCoinsEarned || 0;

  console.log('🔄 MIGRATING TO PER-SUBJECT COIN SYSTEM:', {
    globalCoinsFound: transferredCoins,
    globalTotalFound: transferredTotal,
    transferringTo: 'spelling',
    testHistoryLength: oldData.testHistory?.length || 0,
    wordStatsCount: Object.keys(oldData.wordStats || {}).length
  });

  const migrated = {
    ...getDefaultData(),
    streak: oldData.streak || 0,
    bestStreak: oldData.bestStreak || 0,
    lastTestDate: oldData.lastTestDate || null,
    earnedBadges: oldData.earnedBadges || [],
    claimedRewards: oldData.claimedRewards || [],
    currentSubject: oldData.currentSubject || 'spelling',
    spelling: {
      coins: transferredCoins,
      totalCoinsEarned: transferredTotal,
      testHistory: oldData.testHistory || [],
      wordStats: oldData.wordStats || {},
    },
    maths: {
      coins: 0,
      totalCoinsEarned: 0,
      testHistory: [],
      questionStats: {},
    },
    science: {
      coins: 0,
      totalCoinsEarned: 0,
      testHistory: [],
      questionStats: {},
    },
  };

  console.log('✅ Migration complete. New coin balances:', {
    spelling: migrated.spelling.coins,
    maths: migrated.maths.coins,
    science: migrated.science.coins
  });

  return migrated;
};

const loadData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const migrated = migrateToMultiSubject(parsed);
      return { ...getDefaultData(), ...migrated };
    }
  } catch (e) { console.error('Failed to load:', e); }
  return getDefaultData();
};

// Debounce timer for cloud sync
let syncTimeout = null;

// Auto-download backup to device (silent, no user interaction needed)
const downloadBackup = (data, reason = 'auto') => {
  try {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `alba-backup-${timestamp}.json`;
    const content = JSON.stringify(data, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log(`✅ Backup downloaded: ${filename} (${reason})`);
  } catch (e) {
    console.error('❌ Backup download failed:', e);
  }
};

const saveData = async (data, downloadBackupNow = false) => {
  try {
    // GITHUB FIRST - Save to cloud immediately
    const syncResult = await syncToGist(data);

    if (syncResult && syncResult.success) {
      // Then cache locally for offline/performance
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log('✅ Data saved: GitHub (primary) + LocalStorage (cache)');
    } else {
      // If GitHub fails, fall back to LocalStorage only
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.warn('⚠️ Saved to LocalStorage only - GitHub sync failed');
    }

    // Auto-download backup if requested (after tests, major changes)
    if (downloadBackupNow) {
      downloadBackup(data, 'test-complete');
    }
  }
  catch (e) {
    console.error('Failed to save:', e);
    // Emergency fallback - at least save locally
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.warn('⚠️ Emergency save to LocalStorage only');
    } catch (err) {
      console.error('❌ CRITICAL: Could not save data anywhere!', err);
    }
  }
};

// BULLETPROOF sync function with retries and error handling
const syncToGist = async (data, retryCount = 0) => {
  const token = localStorage.getItem('github_token');
  if (!token) {
    console.warn('⚠️ No GitHub token - skipping cloud sync');
    return;
  }

  const gistId = localStorage.getItem('gist_id');
  const content = JSON.stringify(data, null, 2);

  const url = gistId
    ? `https://api.github.com/gists/${gistId}`
    : 'https://api.github.com/gists';

  const method = gistId ? 'PATCH' : 'POST';

  console.log(`☁️ SYNCING TO CLOUD (${method} attempt ${retryCount + 1}/3)...`);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: 'Alba Spelling Test Data - Auto-synced',
        public: false,
        files: {
          'alba-spelling-data.json': {
            content
          }
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const gist = await response.json();
    const newGistId = gist.id;
    localStorage.setItem('gist_id', newGistId);

    const spellingCoins = data.spelling?.coins || 0;
    const mathsCoins = data.maths?.coins || 0;
    const scienceCoins = data.science?.coins || 0;
    const totalCoins = spellingCoins + mathsCoins + scienceCoins;

    console.log(`✅ SYNC SUCCESS!`);
    console.log(`   Gist ID: ${newGistId}`);
    console.log(`   URL: https://gist.github.com/${gist.owner?.login || 'Spike1990AI'}/${newGistId}`);
    console.log(`   Coins: Spelling=${spellingCoins}, Maths=${mathsCoins}, Science=${scienceCoins}, Total=${totalCoins}`);
    console.log(`   Tests: ${(data.spelling?.testHistory?.length || 0) + (data.maths?.testHistory?.length || 0) + (data.science?.testHistory?.length || 0)}`);

    return { success: true, gistId: newGistId, url: gist.html_url };

  } catch (error) {
    console.error(`❌ SYNC FAILED (attempt ${retryCount + 1}/3):`, error.message);

    // Retry up to 3 times with exponential backoff
    if (retryCount < 2) {
      const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s
      console.log(`   Retrying in ${delay/1000}s...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return syncToGist(data, retryCount + 1);
    } else {
      console.error('❌ SYNC FAILED AFTER 3 ATTEMPTS - Data remains on device only');
      return { success: false, error: error.message };
    }
  }
};

// ============ DYSLEXIA-FRIENDLY HELPERS ============
// Check if two words are visually too similar (confusing for dyslexia)
const areVisuallySimilar = (word1, word2) => {
  // Same length and 80%+ letters match = too similar
  if (Math.abs(word1.length - word2.length) > 2) return false;

  const w1 = word1.toLowerCase();
  const w2 = word2.toLowerCase();
  const maxLen = Math.max(w1.length, w2.length);
  let matches = 0;

  for (let i = 0; i < Math.min(w1.length, w2.length); i++) {
    if (w1[i] === w2[i]) matches++;
  }

  return (matches / maxLen) > 0.75; // 75%+ similar = confusing
};

// ============ SMART WORD SELECTION ============
const selectSmartWords = (gameData, count = 5, wordPool = allWords) => {
  // Support per-subject data structure (spelling/maths/science)
  const subjectData = gameData.spelling || gameData; // Fall back to old structure for compatibility
  const { wordStats, testHistory } = subjectData;

  // Every 3rd test, do a RANDOM selection for variety
  const testCount = testHistory?.length || 0;
  if (testCount > 0 && testCount % 3 === 0) {
    // Pure random selection with category variety (but still avoid visually similar words)
    const shuffled = [...wordPool].sort(() => Math.random() - 0.5);
    const selected = [];
    const usedCategories = new Set();
    for (const word of shuffled) {
      if (selected.length >= count) break;
      if (selected.length < 3 && usedCategories.has(word.category)) continue;

      // DYSLEXIA-FRIENDLY: Skip if too similar to already selected words
      const tooSimilar = selected.some(w => areVisuallySimilar(w.word, word.word));
      if (tooSimilar) continue;

      selected.push(word);
      usedCategories.add(word.category);
    }
    while (selected.length < count && shuffled.length > selected.length) {
      const remaining = shuffled.filter(w =>
        !selected.includes(w) &&
        !selected.some(s => areVisuallySimilar(s.word, w.word))
      );
      if (remaining.length === 0) break;
      selected.push(remaining[0]);
    }
    return selected;
  }

  // Calculate category accuracy
  const categoryAccuracy = {};
  Object.keys(categoryNames).forEach(cat => {
    categoryAccuracy[cat] = { correct: 0, total: 0 };
  });

  testHistory.forEach(test => {
    test.words?.forEach(w => {
      if (categoryAccuracy[w.category]) {
        categoryAccuracy[w.category].total++;
        if (w.correct) categoryAccuracy[w.category].correct++;
      }
    });
  });

  // Score each word (lower = needs more practice)
  const scoredWords = wordPool.map(word => {
    const stats = wordStats[word.id] || { attempts: 0, correct: 0, consecutiveCorrect: 0 };
    const catStats = categoryAccuracy[word.category] || { correct: 0, total: 0 };
    const catAccuracy = catStats.total > 0 ? catStats.correct / catStats.total : 0.5;
    const wordAccuracy = stats.attempts > 0 ? stats.correct / stats.attempts : 0.5;

    // Lower score = higher priority (needs practice)
    let score = wordAccuracy * 0.4 + catAccuracy * 0.2;

    // Boost never-attempted words significantly
    if (stats.attempts === 0) score -= 0.5;

    // Boost words from weak categories
    if (catAccuracy < 0.5) score -= 0.15;

    // MASTERY SYSTEM: Penalize mastered words (reduce frequency)
    const consecutive = stats.consecutiveCorrect || 0;
    if (consecutive >= 5) score += 1.5; // Fully mastered - rarely show (90% less)
    else if (consecutive >= 3) score += 0.8; // Mastered - show less (70% less)

    // MUCH more randomness to prevent repetition (0.6 instead of 0.3)
    score += Math.random() * 0.6;

    return { ...word, score };
  });

  // Sort by score (lowest first = needs most practice)
  scoredWords.sort((a, b) => a.score - b.score);

  // Take top candidates but ensure category variety AND avoid visually similar words (dyslexia-friendly)
  const selected = [];
  const usedCategories = new Set();

  for (const word of scoredWords) {
    if (selected.length >= count) break;

    // Prefer variety in first 3 picks
    if (selected.length < 3 && usedCategories.has(word.category)) continue;

    // DYSLEXIA-FRIENDLY: Skip if too similar to already selected words
    const tooSimilar = selected.some(w => areVisuallySimilar(w.word, word.word));
    if (tooSimilar) continue;

    selected.push(word);
    usedCategories.add(word.category);
  }

  // Fill remaining slots if needed (also check for visual similarity)
  while (selected.length < count) {
    const remaining = scoredWords.filter(w =>
      !selected.includes(w) &&
      !selected.some(s => areVisuallySimilar(s.word, w.word))
    );
    if (remaining.length === 0) break;
    selected.push(remaining[0]);
  }

  // Shuffle final selection
  return selected.sort(() => Math.random() - 0.5);
};

const selectSmartMathsQuestions = (gameData, count = 5, questionPool = mathsQuestions) => {
  const mathsData = gameData.maths || { questionStats: {}, testHistory: [] };
  const { questionStats, testHistory } = mathsData;

  // Every 3rd test, do a RANDOM selection for variety
  const testCount = testHistory?.length || 0;
  if (testCount > 0 && testCount % 3 === 0) {
    const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  // Calculate topic accuracy
  const topicAccuracy = {};
  mathsCategories.forEach(cat => {
    topicAccuracy[cat.id] = { correct: 0, total: 0 };
  });

  testHistory.forEach(test => {
    test.words?.forEach(q => {
      if (topicAccuracy[q.category]) {
        topicAccuracy[q.category].total++;
        if (q.correct) topicAccuracy[q.category].correct++;
      }
    });
  });

  // Score each question (lower = needs more practice)
  const scoredQuestions = questionPool.map(question => {
    const stats = questionStats[question.id] || { attempts: 0, correct: 0, consecutiveCorrect: 0 };
    const topicStats = topicAccuracy[question.topic] || { correct: 0, total: 0 };
    const topicAcc = topicStats.total > 0 ? topicStats.correct / topicStats.total : 0.5;
    const questionAcc = stats.attempts > 0 ? stats.correct / stats.attempts : 0.5;

    // Lower score = higher priority
    let score = questionAcc * 0.4 + topicAcc * 0.2;

    // Boost never-attempted questions
    if (stats.attempts === 0) score -= 0.5;

    // Boost questions from weak topics
    if (topicAcc < 0.5) score -= 0.15;

    // MASTERY SYSTEM: Penalize mastered questions
    const consecutive = stats.consecutiveCorrect || 0;
    if (consecutive >= 5) score += 1.5;
    else if (consecutive >= 3) score += 0.8;

    // Add randomness
    score += Math.random() * 0.6;

    return { ...question, score };
  });

  // Sort by score (lowest first)
  scoredQuestions.sort((a, b) => a.score - b.score);

  // Take top candidates with topic variety
  const selected = [];
  const usedTopics = new Set();

  for (const question of scoredQuestions) {
    if (selected.length >= count) break;

    // Prefer variety in first 3 picks
    if (selected.length < 3 && usedTopics.has(question.topic)) continue;

    selected.push(question);
    usedTopics.add(question.topic);
  }

  // Fill remaining slots if needed
  while (selected.length < count && scoredQuestions.length > selected.length) {
    const remaining = scoredQuestions.filter(q => !selected.includes(q));
    if (remaining.length === 0) break;
    selected.push(remaining[0]);
  }

  // Shuffle final selection
  return selected.sort(() => Math.random() - 0.5);
};

const selectSmartScienceQuestions = (gameData, count = 5, questionPool = scienceQuestions) => {
  const scienceData = gameData.science || { questionStats: {}, testHistory: [] };
  const { questionStats, testHistory } = scienceData;

  // Every 3rd test, do a RANDOM selection for variety
  const testCount = testHistory?.length || 0;
  if (testCount > 0 && testCount % 3 === 0) {
    const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  // Calculate topic accuracy
  const topicAccuracy = {};
  scienceCategories.forEach(cat => {
    topicAccuracy[cat.id] = { correct: 0, total: 0 };
  });

  testHistory.forEach(test => {
    test.words?.forEach(q => {
      if (topicAccuracy[q.category]) {
        topicAccuracy[q.category].total++;
        if (q.correct) topicAccuracy[q.category].correct++;
      }
    });
  });

  // Score each question (lower = needs more practice)
  const scoredQuestions = questionPool.map(question => {
    const stats = questionStats[question.id] || { attempts: 0, correct: 0, consecutiveCorrect: 0 };
    const topicStats = topicAccuracy[question.topic] || { correct: 0, total: 0 };
    const topicAcc = topicStats.total > 0 ? topicStats.correct / topicStats.total : 0.5;
    const questionAcc = stats.attempts > 0 ? stats.correct / stats.attempts : 0.5;

    // Lower score = higher priority
    let score = questionAcc * 0.4 + topicAcc * 0.2;

    // Boost never-attempted questions
    if (stats.attempts === 0) score -= 0.5;

    // Boost questions from weak topics
    if (topicAcc < 0.5) score -= 0.15;

    // MASTERY SYSTEM: Penalize mastered questions
    const consecutive = stats.consecutiveCorrect || 0;
    if (consecutive >= 5) score += 1.5;
    else if (consecutive >= 3) score += 0.8;

    // Add randomness
    score += Math.random() * 0.6;

    return { ...question, score };
  });

  // Sort by score (lowest first)
  scoredQuestions.sort((a, b) => a.score - b.score);

  // Take top candidates with topic variety
  const selected = [];
  const usedTopics = new Set();

  for (const question of scoredQuestions) {
    if (selected.length >= count) break;

    // Prefer variety in first 3 picks
    if (selected.length < 3 && usedTopics.has(question.topic)) continue;

    selected.push(question);
    usedTopics.add(question.topic);
  }

  // Fill remaining slots if needed
  while (selected.length < count && scoredQuestions.length > selected.length) {
    const remaining = scoredQuestions.filter(q => !selected.includes(q));
    if (remaining.length === 0) break;
    selected.push(remaining[0]);
  }

  // Shuffle final selection
  return selected.sort(() => Math.random() - 0.5);
};

// ============ COMPONENTS ============
const Keyboard = ({ onKey, onBackspace, onSubmit }) => {
  const rows = [
    ['q','w','e','r','t','y','u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l'],
    ['z','x','c','v','b','n','m']
  ];
  return (
    <div className="mt-4">
      {rows.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 mb-1">
          {i === 2 && <button onClick={onBackspace} className="px-3 py-4 bg-red-400 text-white rounded-lg text-sm font-bold active:scale-95">←</button>}
          {row.map(k => (
            <button key={k} onClick={() => onKey(k)} className="w-8 h-12 bg-gray-200 rounded-lg text-lg font-semibold active:bg-gray-300 active:scale-95 uppercase">{k}</button>
          ))}
          {i === 2 && <button onClick={onSubmit} className="px-3 py-4 bg-green-500 text-white rounded-lg text-sm font-bold active:scale-95">✓</button>}
        </div>
      ))}
      {/* Space bar */}
      <div className="flex justify-center mt-2">
        <button onClick={() => onKey(' ')} className="w-64 h-12 bg-gray-200 rounded-lg font-semibold active:bg-gray-300 active:scale-95">SPACE</button>
      </div>
    </div>
  );
};

const NumberPad = ({ onKey, onBackspace, onSubmit, onClear }) => {
  const keys = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0', '.', '/']
  ];

  const handleKeyPress = (key) => {
    if (navigator.vibrate) navigator.vibrate(10);
    onKey(key);
  };

  const handleBackspace = () => {
    if (navigator.vibrate) navigator.vibrate(10);
    onBackspace();
  };

  const handleClear = () => {
    if (navigator.vibrate) navigator.vibrate(15);
    onClear();
  };

  const handleSubmit = () => {
    if (navigator.vibrate) navigator.vibrate(20);
    onSubmit();
  };

  return (
    <div className="mt-4 max-w-sm mx-auto">
      <div className="grid grid-cols-3 gap-2 mb-3">
        {keys.map((row, rowIdx) => (
          row.map((key, keyIdx) => (
            <button
              key={`${rowIdx}-${keyIdx}`}
              onClick={() => handleKeyPress(key)}
              className="h-16 bg-white rounded-xl text-2xl font-bold shadow-md active:scale-95 active:shadow-sm transition-all"
            >
              {key}
            </button>
          ))
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={handleClear}
          className="h-14 bg-gray-200 text-gray-800 rounded-xl font-semibold active:scale-95"
        >
          Clear
        </button>
        <button
          onClick={handleBackspace}
          className="h-14 bg-red-100 text-red-700 rounded-xl font-semibold active:scale-95"
        >
          ← Delete
        </button>
        <button
          onClick={handleSubmit}
          className="h-14 bg-green-500 text-white rounded-xl font-bold text-lg active:scale-95"
        >
          ✓ Check
        </button>
      </div>
    </div>
  );
};

const MultipleChoice = ({ question, options, selectedOption, onSelect, onSubmit, disabled }) => {
  const handleSelect = (index) => {
    if (disabled) return;
    if (navigator.vibrate) navigator.vibrate(10);
    onSelect(index);
  };

  const handleSubmit = () => {
    if (disabled || selectedOption === null) return;
    if (navigator.vibrate) navigator.vibrate(20);
    onSubmit();
  };

  return (
    <div className="mt-4">
      <div className="space-y-3 mb-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={disabled}
            className={`w-full p-4 rounded-xl text-left font-semibold text-lg transition-all active:scale-98 shadow-md ${
              selectedOption === index
                ? 'bg-indigo-500 text-white border-2 border-indigo-600'
                : 'bg-white text-gray-800 hover:bg-gray-50'
            } ${disabled ? 'opacity-50' : ''}`}
          >
            <span className="inline-block w-8 h-8 rounded-full bg-white/20 text-center leading-8 mr-3 font-bold">
              {String.fromCharCode(65 + index)}
            </span>
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={disabled || selectedOption === null}
        className={`w-full h-14 bg-green-500 text-white rounded-xl font-bold text-lg shadow-lg transition-all ${
          disabled || selectedOption === null ? 'opacity-50' : 'active:scale-95'
        }`}
      >
        ✓ Check Answer
      </button>
    </div>
  );
};

const TrueFalse = ({ question, selectedAnswer, onSelect, onSubmit, disabled }) => {
  const handleSelect = (value) => {
    if (disabled) return;
    if (navigator.vibrate) navigator.vibrate(10);
    onSelect(value);
  };

  const handleSubmit = () => {
    if (disabled || selectedAnswer === null) return;
    if (navigator.vibrate) navigator.vibrate(20);
    onSubmit();
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <button
          onClick={() => handleSelect(true)}
          disabled={disabled}
          className={`p-6 rounded-xl font-bold text-xl transition-all active:scale-95 shadow-lg ${
            selectedAnswer === true
              ? 'bg-green-500 text-white border-4 border-green-600'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          } ${disabled ? 'opacity-50' : ''}`}
        >
          <div className="text-4xl mb-2">✓</div>
          TRUE
        </button>
        <button
          onClick={() => handleSelect(false)}
          disabled={disabled}
          className={`p-6 rounded-xl font-bold text-xl transition-all active:scale-95 shadow-lg ${
            selectedAnswer === false
              ? 'bg-red-500 text-white border-4 border-red-600'
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          } ${disabled ? 'opacity-50' : ''}`}
        >
          <div className="text-4xl mb-2">✕</div>
          FALSE
        </button>
      </div>
      <button
        onClick={handleSubmit}
        disabled={disabled || selectedAnswer === null}
        className={`w-full h-14 bg-indigo-500 text-white rounded-xl font-bold text-lg shadow-lg transition-all ${
          disabled || selectedAnswer === null ? 'opacity-50' : 'active:scale-95'
        }`}
      >
        ✓ Check Answer
      </button>
    </div>
  );
};

const CoinAnimation = ({ amount }) => {
  const [show, setShow] = useState(true);
  useEffect(() => { const t = setTimeout(() => setShow(false), 1500); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-yellow-500 animate-bounce">+{amount} 🪙</div>;
};

const BadgePopup = ({ badge, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 text-center animate-bounce">
        <span className="text-6xl">{badge.icon}</span>
        <h2 className="text-2xl font-bold mt-4 text-gray-800">Badge Earned!</h2>
        <p className="text-xl font-semibold text-purple-600 mt-2">{badge.name}</p>
        <p className="text-gray-500 mt-1">{badge.desc}</p>
      </div>
    </div>
  );
};

// ============ MAIN APP ============
export default function App() {
  // Check URL params for parent mode
  const urlParams = new URLSearchParams(window.location.search);
  const isParentUrl = urlParams.get('parent') === 'true';

  // Set user type based on URL or stored value
  const initialUserType = isParentUrl ? 'parent' : (localStorage.getItem('user_type') || 'alba');
  const [userType, setUserType] = useState(initialUserType);

  // Set viewer mode based on user type
  const [screen, setScreen] = useState(isParentUrl ? 'settings' : 'subject-select');
  const [gameData, setGameData] = useState(loadData);

  // Save user type and viewer mode on mount
  React.useEffect(() => {
    localStorage.setItem('user_type', userType);
    localStorage.setItem('viewer_mode', userType === 'parent' ? 'true' : 'false');
  }, [userType]);

  // LOAD FROM GITHUB ON APP START (GitHub is primary storage)
  React.useEffect(() => {
    const loadFromGitHub = async () => {
      const token = localStorage.getItem('github_token');
      if (!token) {
        console.warn('⚠️ No GitHub token - using LocalStorage data only');
        return;
      }

      const gistId = localStorage.getItem('gist_id');
      if (!gistId) {
        console.warn('⚠️ No Gist ID - using LocalStorage data only');
        return;
      }

      try {
        console.log('☁️ Loading from GitHub (primary storage)...');
        const response = await fetch(`https://api.github.com/gists/${gistId}`, {
          headers: { 'Authorization': `token ${token}` }
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const gist = await response.json();
        const content = gist.files['alba-spelling-data.json']?.content;

        if (content) {
          const cloudData = JSON.parse(content);
          setGameData(cloudData);
          // Update LocalStorage cache
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
          console.log('✅ Loaded from GitHub successfully');
        }
      } catch (error) {
        console.error('❌ Failed to load from GitHub:', error.message);
        console.warn('⚠️ Using LocalStorage data as fallback');
      }
    };

    loadFromGitHub();
  }, []); // Run once on mount

  const [testWords, setTestWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [showResult, setShowResult] = useState(null);
  const [coinAnim, setCoinAnim] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [newBadge, setNewBadge] = useState(null);
  const [hotStreak, setHotStreak] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);

  // Science question selection state
  const [selectedMCQOption, setSelectedMCQOption] = useState(null);
  const [selectedTFAnswer, setSelectedTFAnswer] = useState(null);

  // Challenge Mode state (for typed answers in science)
  const [challengeMode, setChallengeMode] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);

  // Hidden timers for confidence tracking
  const [testStartTime, setTestStartTime] = useState(null);
  const [wordStartTime, setWordStartTime] = useState(null);
  const [wordTimings, setWordTimings] = useState([]);

  // Rewards screen state
  const [expandedReward, setExpandedReward] = useState(null);

  // Persist on change - GitHub FIRST, then LocalStorage cache
  useEffect(() => {
    // Only sync from Alba's device (not parent viewers)
    const isViewerMode = localStorage.getItem('viewer_mode') === 'true';
    if (!isViewerMode) {
      saveData(gameData); // GitHub first, then LocalStorage
    } else {
      console.log('⚠️ Viewer mode - data not saved (read-only)');
    }
  }, [gameData]);

  // Check streak on load
  useEffect(() => {
    const today = new Date().toDateString();
    const last = gameData.lastTestDate;
    if (last) {
      const lastDate = new Date(last);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastDate.toDateString() !== today && lastDate.toDateString() !== yesterday.toDateString()) {
        setGameData(prev => ({ ...prev, streak: 0 }));
      }
    }
  }, []);

  // Auto-load from cloud on startup
  useEffect(() => {
    const autoSync = async () => {
      const token = localStorage.getItem('github_token');
      if (!token) return;

      try {
        const res = await fetch('https://api.github.com/gists', { headers: { 'Authorization': `token ${token}` } });
        if (!res.ok) return;

        const gists = await res.json();
        const albaGists = gists.filter(g => g.files['alba-spelling-data.json']);
        if (albaGists.length === 0) return;

        // Fetch ALL Gists to check their data
        const gistDataPromises = albaGists.map(async (g) => {
          const r = await fetch(`https://api.github.com/gists/${g.id}`, { headers: { 'Authorization': `token ${token}` } });
          if (!r.ok) return null;
          const full = await r.json();
          const data = JSON.parse(full.files['alba-spelling-data.json'].content);
          // Calculate total coins across all subjects (new structure) or use legacy totalCoinsEarned (old structure)
          const totalCoins = data.spelling?.totalCoinsEarned || data.maths?.totalCoinsEarned || data.science?.totalCoinsEarned
            ? (data.spelling?.totalCoinsEarned || 0) + (data.maths?.totalCoinsEarned || 0) + (data.science?.totalCoinsEarned || 0)
            : (data.totalCoinsEarned || 0);
          return { id: g.id, coins: totalCoins };
        });
        const gistData = (await Promise.all(gistDataPromises)).filter(Boolean);

        // Pick the one with the MOST coins (Alba's, not empty one)
        const best = gistData.sort((a, b) => b.coins - a.coins)[0];
        if (!best || best.coins === 0) return;

        const latest = albaGists.find(g => g.id === best.id);
        const gistRes = await fetch(`https://api.github.com/gists/${latest.id}`, { headers: { 'Authorization': `token ${token}` } });
        if (!gistRes.ok) return;

        const gist = await gistRes.json();
        const cloudData = JSON.parse(gist.files['alba-spelling-data.json'].content);
        const migratedCloud = migrateToMultiSubject(cloudData);

        // Load cloud data if it has more coins
        if (migratedCloud.totalCoinsEarned > gameData.totalCoinsEarned) {
          localStorage.setItem('alba_spelling_data', JSON.stringify(migratedCloud));
          localStorage.setItem('gist_id', latest.id);
          setGameData(migratedCloud);
        }
      } catch (e) {
        console.error('Auto-sync failed:', e);
      }
    };

    autoSync();
  }, []); // Run once on mount

  const { coins, streak, earnedBadges, totalCoinsEarned, bestStreak, claimedRewards, currentSubject, spelling, maths, science } = gameData;

  // Get current subject data
  const currentSubjectData = gameData[currentSubject] || spelling;
  const testHistory = currentSubjectData.testHistory || [];
  const wordStats = currentSubjectData.wordStats || currentSubjectData.questionStats || {};

  // Badge checking - comprehensive for 104 badges!
  const checkBadges = (data) => {
    const newBadges = [];

    // Combine test histories from all subjects
    const allTestHistory = [
      ...(data.spelling?.testHistory || []),
      ...(data.maths?.testHistory || []),
      ...(data.science?.testHistory || [])
    ];

    const perfectTests = allTestHistory.filter(t => t.score === t.total).length;
    const testCount = allTestHistory.length;

    // Getting started
    if (!data.earnedBadges.includes('first') && testCount >= 1) newBadges.push('first');
    if (!data.earnedBadges.includes('first5') && testCount >= 5) newBadges.push('first5');

    // Perfect scores (11 badges)
    if (!data.earnedBadges.includes('perfect') && perfectTests >= 1) newBadges.push('perfect');
    if (!data.earnedBadges.includes('perfect3') && perfectTests >= 3) newBadges.push('perfect3');
    if (!data.earnedBadges.includes('perfect5') && perfectTests >= 5) newBadges.push('perfect5');
    if (!data.earnedBadges.includes('perfect10') && perfectTests >= 10) newBadges.push('perfect10');
    if (!data.earnedBadges.includes('perfect15') && perfectTests >= 15) newBadges.push('perfect15');
    if (!data.earnedBadges.includes('perfect25') && perfectTests >= 25) newBadges.push('perfect25');
    if (!data.earnedBadges.includes('perfect50') && perfectTests >= 50) newBadges.push('perfect50');
    if (!data.earnedBadges.includes('perfect75') && perfectTests >= 75) newBadges.push('perfect75');
    if (!data.earnedBadges.includes('perfect100') && perfectTests >= 100) newBadges.push('perfect100');
    if (!data.earnedBadges.includes('perfect150') && perfectTests >= 150) newBadges.push('perfect150');
    if (!data.earnedBadges.includes('perfect200') && perfectTests >= 200) newBadges.push('perfect200');

    // Streaks (20 badges)
    if (!data.earnedBadges.includes('streak3') && data.streak >= 3) newBadges.push('streak3');
    if (!data.earnedBadges.includes('streak5') && data.streak >= 5) newBadges.push('streak5');
    if (!data.earnedBadges.includes('streak7') && data.streak >= 7) newBadges.push('streak7');
    if (!data.earnedBadges.includes('streak10') && data.streak >= 10) newBadges.push('streak10');
    if (!data.earnedBadges.includes('streak14') && data.streak >= 14) newBadges.push('streak14');
    if (!data.earnedBadges.includes('streak21') && data.streak >= 21) newBadges.push('streak21');
    if (!data.earnedBadges.includes('streak28') && data.streak >= 28) newBadges.push('streak28');
    if (!data.earnedBadges.includes('streak35') && data.streak >= 35) newBadges.push('streak35');
    if (!data.earnedBadges.includes('streak45') && data.streak >= 45) newBadges.push('streak45');
    if (!data.earnedBadges.includes('streak60') && data.streak >= 60) newBadges.push('streak60');
    if (!data.earnedBadges.includes('streak75') && data.streak >= 75) newBadges.push('streak75');
    if (!data.earnedBadges.includes('streak90') && data.streak >= 90) newBadges.push('streak90');
    if (!data.earnedBadges.includes('streak100') && data.streak >= 100) newBadges.push('streak100');
    if (!data.earnedBadges.includes('streak120') && data.streak >= 120) newBadges.push('streak120');
    if (!data.earnedBadges.includes('streak150') && data.streak >= 150) newBadges.push('streak150');
    if (!data.earnedBadges.includes('streak180') && data.streak >= 180) newBadges.push('streak180');
    if (!data.earnedBadges.includes('streak200') && data.streak >= 200) newBadges.push('streak200');
    if (!data.earnedBadges.includes('streak270') && data.streak >= 270) newBadges.push('streak270');
    if (!data.earnedBadges.includes('streak300') && data.streak >= 300) newBadges.push('streak300');
    if (!data.earnedBadges.includes('streak365') && data.streak >= 365) newBadges.push('streak365');

    // Coin milestones (19 badges)
    if (!data.earnedBadges.includes('century') && data.totalCoinsEarned >= 100) newBadges.push('century');
    if (!data.earnedBadges.includes('coins250') && data.totalCoinsEarned >= 250) newBadges.push('coins250');
    if (!data.earnedBadges.includes('coins500') && data.totalCoinsEarned >= 500) newBadges.push('coins500');
    if (!data.earnedBadges.includes('coins750') && data.totalCoinsEarned >= 750) newBadges.push('coins750');
    if (!data.earnedBadges.includes('coins1000') && data.totalCoinsEarned >= 1000) newBadges.push('coins1000');
    if (!data.earnedBadges.includes('coins1500') && data.totalCoinsEarned >= 1500) newBadges.push('coins1500');
    if (!data.earnedBadges.includes('coins2000') && data.totalCoinsEarned >= 2000) newBadges.push('coins2000');
    if (!data.earnedBadges.includes('coins2500') && data.totalCoinsEarned >= 2500) newBadges.push('coins2500');
    if (!data.earnedBadges.includes('coins3000') && data.totalCoinsEarned >= 3000) newBadges.push('coins3000');
    if (!data.earnedBadges.includes('coins4000') && data.totalCoinsEarned >= 4000) newBadges.push('coins4000');
    if (!data.earnedBadges.includes('coins5000') && data.totalCoinsEarned >= 5000) newBadges.push('coins5000');
    if (!data.earnedBadges.includes('coins7500') && data.totalCoinsEarned >= 7500) newBadges.push('coins7500');
    if (!data.earnedBadges.includes('coins10000') && data.totalCoinsEarned >= 10000) newBadges.push('coins10000');
    if (!data.earnedBadges.includes('coins12500') && data.totalCoinsEarned >= 12500) newBadges.push('coins12500');
    if (!data.earnedBadges.includes('coins15000') && data.totalCoinsEarned >= 15000) newBadges.push('coins15000');
    if (!data.earnedBadges.includes('coins17500') && data.totalCoinsEarned >= 17500) newBadges.push('coins17500');
    if (!data.earnedBadges.includes('coins20000') && data.totalCoinsEarned >= 20000) newBadges.push('coins20000');
    if (!data.earnedBadges.includes('coins25000') && data.totalCoinsEarned >= 25000) newBadges.push('coins25000');
    if (!data.earnedBadges.includes('coins30000') && data.totalCoinsEarned >= 30000) newBadges.push('coins30000');

    // Test milestones (20 badges)
    if (!data.earnedBadges.includes('tests5') && testCount >= 5) newBadges.push('tests5');
    if (!data.earnedBadges.includes('tests10') && testCount >= 10) newBadges.push('tests10');
    if (!data.earnedBadges.includes('tests15') && testCount >= 15) newBadges.push('tests15');
    if (!data.earnedBadges.includes('tests25') && testCount >= 25) newBadges.push('tests25');
    if (!data.earnedBadges.includes('tests40') && testCount >= 40) newBadges.push('tests40');
    if (!data.earnedBadges.includes('tests50') && testCount >= 50) newBadges.push('tests50');
    if (!data.earnedBadges.includes('tests75') && testCount >= 75) newBadges.push('tests75');
    if (!data.earnedBadges.includes('tests100') && testCount >= 100) newBadges.push('tests100');
    if (!data.earnedBadges.includes('tests125') && testCount >= 125) newBadges.push('tests125');
    if (!data.earnedBadges.includes('tests150') && testCount >= 150) newBadges.push('tests150');
    if (!data.earnedBadges.includes('tests175') && testCount >= 175) newBadges.push('tests175');
    if (!data.earnedBadges.includes('tests200') && testCount >= 200) newBadges.push('tests200');
    if (!data.earnedBadges.includes('tests225') && testCount >= 225) newBadges.push('tests225');
    if (!data.earnedBadges.includes('tests250') && testCount >= 250) newBadges.push('tests250');
    if (!data.earnedBadges.includes('tests275') && testCount >= 275) newBadges.push('tests275');
    if (!data.earnedBadges.includes('tests300') && testCount >= 300) newBadges.push('tests300');
    if (!data.earnedBadges.includes('tests325') && testCount >= 325) newBadges.push('tests325');
    if (!data.earnedBadges.includes('tests350') && testCount >= 350) newBadges.push('tests350');
    if (!data.earnedBadges.includes('tests365') && testCount >= 365) newBadges.push('tests365');
    if (!data.earnedBadges.includes('tests400') && testCount >= 400) newBadges.push('tests400');

    // Category mastery
    const catStats = {};
    allTestHistory.forEach(test => {
      test.words?.forEach(w => {
        if (!catStats[w.category]) catStats[w.category] = { correct: 0, total: 0 };
        catStats[w.category].total++;
        if (w.correct) catStats[w.category].correct++;
      });
    });
    const getCatPct = (cat) => catStats[cat] && catStats[cat].total >= 10 ? (catStats[cat].correct / catStats[cat].total) * 100 : 0;

    // All 10 category mastery badges
    if (!data.earnedBadges.includes('master_tricky') && getCatPct('tricky') >= 90) newBadges.push('master_tricky');
    if (!data.earnedBadges.includes('master_ibeforee') && getCatPct('i-before-e') >= 90) newBadges.push('master_ibeforee');
    if (!data.earnedBadges.includes('master_softc') && getCatPct('soft-c') >= 90) newBadges.push('master_softc');
    if (!data.earnedBadges.includes('master_double') && getCatPct('double-letters') >= 90) newBadges.push('master_double');
    if (!data.earnedBadges.includes('master_silent') && getCatPct('silent-letters') >= 90) newBadges.push('master_silent');
    if (!data.earnedBadges.includes('master_endings') && getCatPct('endings') >= 90) newBadges.push('master_endings');
    if (!data.earnedBadges.includes('master_homophones') && getCatPct('homophones') >= 90) newBadges.push('master_homophones');
    if (!data.earnedBadges.includes('master_hard') && getCatPct('hard-spellings') >= 90) newBadges.push('master_hard');
    if (!data.earnedBadges.includes('master_prefixes') && getCatPct('prefixes') >= 90) newBadges.push('master_prefixes');
    if (!data.earnedBadges.includes('master_compound') && getCatPct('compound') >= 90) newBadges.push('master_compound');

    // Milestone achievements
    const catsWithAttempts = Object.keys(catStats).filter(c => catStats[c].total >= 5);
    const catsAbove75 = catsWithAttempts.filter(c => (catStats[c].correct / catStats[c].total) >= 0.75);
    const catsAbove80 = catsWithAttempts.filter(c => (catStats[c].correct / catStats[c].total) >= 0.80);
    const catsAbove85 = catsWithAttempts.filter(c => (catStats[c].correct / catStats[c].total) >= 0.85);
    const catsAbove90 = catsWithAttempts.filter(c => (catStats[c].correct / catStats[c].total) >= 0.90);
    const catsAbove95 = catsWithAttempts.filter(c => (catStats[c].correct / catStats[c].total) >= 0.95);

    if (!data.earnedBadges.includes('allrounder') && catsAbove75.length >= 5) newBadges.push('allrounder');
    if (!data.earnedBadges.includes('versatile') && catsAbove80.length >= 7) newBadges.push('versatile');
    if (!data.earnedBadges.includes('mastery') && catsAbove85.length >= 10) newBadges.push('mastery');
    if (!data.earnedBadges.includes('perfectionist') && catsAbove90.length >= 10) newBadges.push('perfectionist');
    if (!data.earnedBadges.includes('ultimate') && catsAbove95.length >= 10) newBadges.push('ultimate');

    // Curious - tried all 10 categories
    const categoriesTried = new Set();
    allTestHistory.forEach(test => { test.words?.forEach(w => categoriesTried.add(w.category)); });
    if (!data.earnedBadges.includes('curious') && categoriesTried.size >= 10) newBadges.push('curious');

    // Badge collection badges
    const totalBadges = data.earnedBadges.length + newBadges.length;
    if (!data.earnedBadges.includes('collector') && totalBadges >= 25) newBadges.push('collector');
    if (!data.earnedBadges.includes('halfbadges') && totalBadges >= Math.floor(badges.length / 2)) newBadges.push('halfbadges');
    if (!data.earnedBadges.includes('badgemaster') && totalBadges >= Math.floor(badges.length * 0.75)) newBadges.push('badgemaster');

    if (newBadges.length > 0) {
      setNewBadge(badges.find(b => b.id === newBadges[0]));
      return [...data.earnedBadges, ...newBadges];
    }
    return data.earnedBadges;
  };

  const speak = async (text) => {
    setSpeaking(true);
    await ttsService.speak(text, () => setSpeaking(true), () => setSpeaking(false), () => setSpeaking(false));
  };

  const startTest = () => {
    let questions;
    if (currentSubject === 'maths') {
      questions = selectSmartMathsQuestions(gameData, 5);
    } else if (currentSubject === 'spelling') {
      questions = selectSmartWords(gameData, 5);
    } else if (currentSubject === 'science') {
      questions = selectSmartScienceQuestions(gameData, 5);
    } else {
      questions = [];
    }
    setTestWords(questions);
    setCurrentIndex(0);
    setInput('');
    setResults([]);
    setShowResult(null);
    setHotStreak(0);
    setHintUsed(false);
    setSelectedMCQOption(null);
    setSelectedTFAnswer(null);
    setChallengeMode(false);
    setAiFeedback(null);

    // Start timers (hidden from user)
    setTestStartTime(Date.now());
    setWordStartTime(Date.now());
    setWordTimings([]);

    setScreen('test');
  };

  const startCategoryTest = (topicId) => {
    let questions;
    if (currentSubject === 'maths') {
      // Filter questions by topic
      const topicQuestions = mathsQuestions.filter(q => q.topic === topicId);
      // Smart selection within this topic
      questions = selectSmartMathsQuestions(gameData, 5, topicQuestions);
    } else if (currentSubject === 'spelling') {
      // Filter words by category
      const categoryWords = allWords.filter(w => w.category === topicId);
      questions = selectSmartWords(gameData, 5, categoryWords);
    } else if (currentSubject === 'science') {
      // Filter questions by topic
      const topicQuestions = scienceQuestions.filter(q => q.topic === topicId);
      questions = selectSmartScienceQuestions(gameData, 5, topicQuestions);
    } else {
      questions = [];
    }
    setTestWords(questions);
    setCurrentIndex(0);
    setInput('');
    setResults([]);
    setShowResult(null);
    setHotStreak(0);
    setHintUsed(false);
    setSelectedMCQOption(null);
    setSelectedTFAnswer(null);

    setTestStartTime(Date.now());
    setWordStartTime(Date.now());
    setWordTimings([]);

    setScreen('test');
  };

  const handleKey = (k) => { if (showResult === null) setInput(prev => prev + k); };
  const handleBackspace = () => { if (showResult === null) setInput(prev => prev.slice(0, -1)); };

  const handleSubmit = async () => {
    // Check if we have an answer
    const hasAnswer = currentSubject === 'science'
      ? (challengeMode ? input.trim() !== '' : (testWords[currentIndex]?.type === 'multiple-choice' ? selectedMCQOption !== null : selectedTFAnswer !== null))
      : input.trim() !== '';

    if (!hasAnswer || showResult !== null || aiThinking) return;
    const item = testWords[currentIndex];

    // Check answer based on subject type
    let correct = false;
    let displayText = '';
    let categoryField = '';
    let bonusCoins = 0;

    if (currentSubject === 'science' && challengeMode && item.acceptedConcepts) {
      // CHALLENGE MODE: AI marks typed answer
      setAiThinking(true);
      try {
        const aiResult = await aiMarkingService.markScienceAnswer(
          item.question,
          input.trim(),
          item.acceptedConcepts
        );
        setAiThinking(false);
        correct = aiResult.correct;
        displayText = item.question;
        categoryField = item.topic;
        bonusCoins = correct ? 2 : 0; // +2 bonus coins for correct challenge mode answer
        setAiFeedback(aiResult.feedback);
      } catch (error) {
        setAiThinking(false);
        alert(error.message || 'AI marking failed. Please try again.');
        return;
      }
    } else if (currentSubject === 'science') {
      // Science: MCQ or True/False
      if (item.type === 'multiple-choice') {
        correct = selectedMCQOption === item.answer;
        displayText = item.question;
      } else if (item.type === 'true-false') {
        correct = selectedTFAnswer === item.answer;
        displayText = item.question;
      }
      categoryField = item.topic;
    } else if (currentSubject === 'maths') {
      // Maths: compare numeric values (support both decimals and fractions)
      const parseAnswer = (ans) => {
        if (ans.includes('/')) {
          const [num, denom] = ans.split('/').map(s => parseFloat(s.trim()));
          return (!isNaN(num) && !isNaN(denom) && denom !== 0) ? num / denom : NaN;
        }
        return parseFloat(ans);
      };

      const userAnswer = parseAnswer(input.trim());
      const correctAnswer = parseAnswer(item.answer);
      correct = !isNaN(userAnswer) && Math.abs(userAnswer - correctAnswer) < 0.01; // Allow tiny floating point differences
      displayText = item.question;
      categoryField = item.topic;
    } else if (currentSubject === 'spelling') {
      // Spelling: compare strings (case-insensitive)
      correct = input.toLowerCase().trim() === item.word.toLowerCase();
      displayText = item.word;
      categoryField = item.category;
    }

    // Hot streak multiplier: 1st = 1 coin, 2nd = 2 coins, 3rd+ = 3 coins
    let earned = 0;
    let newStreak = hotStreak;
    if (correct) {
      newStreak = hotStreak + 1;
      if (newStreak === 1) earned = 1;
      else if (newStreak === 2) earned = 2;
      else earned = 3; // 3+ streak

      // MASTERY SYSTEM: Reduce coins for mastered items
      const stats = currentSubject === 'spelling'
        ? (gameData.spelling.wordStats[item.id] || { consecutiveCorrect: 0 })
        : currentSubject === 'maths'
        ? (gameData.maths.questionStats[item.id] || { consecutiveCorrect: 0 })
        : (gameData.science.questionStats[item.id] || { consecutiveCorrect: 0 });
      const consecutive = stats.consecutiveCorrect || 0;
      if (consecutive >= 5) {
        earned = Math.max(0.25, earned * 0.25);
      } else if (consecutive >= 3) {
        earned = Math.max(0.5, earned * 0.5);
      }

      // HINT PENALTY: Reduce coins by 50% if hint was used
      if (hintUsed) {
        earned = Math.max(0.5, earned * 0.5);
      }

      // CHALLENGE MODE BONUS: Add bonus coins (not affected by mastery/hint penalties)
      earned += bonusCoins;

      setHotStreak(newStreak);
    } else {
      setHotStreak(0); // Reset streak on wrong answer
    }

    // Calculate time spent on this word (hidden timer)
    const timeSpent = wordStartTime ? Math.round((Date.now() - wordStartTime) / 1000) : 0;

    const newResult = {
      word: displayText,
      wordId: item.id,
      attempt: challengeMode && currentSubject === 'science' ? input.trim() : (currentSubject === 'science' && item.type === 'multiple-choice' ? item.options[selectedMCQOption] : input),
      correct,
      coins: earned,
      category: categoryField,
      timeSpent,
      challengeMode: challengeMode && currentSubject === 'science',
      aiFeedback: aiFeedback || undefined
    };
    console.log('📝 Saving result:', newResult);
    setResults(prev => {
      const updated = [...prev, newResult];
      console.log('✅ Results now:', updated.length, 'items');
      return updated;
    });

    // Record timing for this word
    setWordTimings(prev => [...prev, { wordId: item.id, word: displayText, timeSpent, correct }]);
    setShowResult({ correct, word: displayText, attempt: input.trim(), streak: newStreak });
    if (earned > 0) {
      setCoinAnim(earned);
      setTimeout(() => setCoinAnim(null), 1600);
    }
  };

  const finishTest = () => {
    try {
      console.log('🏁 Finishing test. Results array has:', results.length, 'items');
      console.log('📊 Full results:', results);

      // Prevent double-calling finishTest
      if (screen === 'results') {
        console.log('⚠️ Already on results screen, skipping finishTest');
        return;
      }

      const allResults = [...results];
    const correctCount = allResults.filter(r => r.correct).length;
    const pct = (correctCount / testWords.length) * 100;
    // Completion bonus (reduced for year-long economy)
    let bonus = 2;
    if (pct === 100) bonus = 20;
    else if (pct >= 80) bonus = 10;
    else if (pct >= 60) bonus = 5;

    const questionCoins = allResults.reduce((a, r) => a + r.coins, 0);
    const totalEarned = questionCoins + bonus;

    console.log('💰 COIN CALCULATION:', {
      subject: currentSubject,
      questionsEarned: questionCoins,
      completionBonus: bonus,
      totalEarned: totalEarned,
      breakdown: allResults.map(r => ({ word: r.word, correct: r.correct, coins: r.coins }))
    });

    const today = new Date().toDateString();
    const last = gameData.lastTestDate;

    let newStreak = 1;
    if (last) {
      const lastDate = new Date(last);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastDate.toDateString() === today) newStreak = gameData.streak;
      else if (lastDate.toDateString() === yesterday.toDateString()) newStreak = gameData.streak + 1;
    }

    // Update stats (wordStats for spelling, questionStats for maths/science)
    const subjectData = gameData[currentSubject];
    const statsField = currentSubject === 'spelling' ? 'wordStats' : 'questionStats';
    const newStats = { ...subjectData[statsField] };

    allResults.forEach(r => {
      const prev = newStats[r.wordId] || { attempts: 0, correct: 0, consecutiveCorrect: 0 };
      newStats[r.wordId] = {
        attempts: prev.attempts + 1,
        correct: prev.correct + (r.correct ? 1 : 0),
        consecutiveCorrect: r.correct ? (prev.consecutiveCorrect || 0) + 1 : 0, // Track streak for mastery
        lastAttempt: today
      };
    });

    const previousCoins = subjectData.coins;
    const newCoins = previousCoins + totalEarned;

    console.log('🏦 UPDATING COIN BALANCE:', {
      subject: currentSubject,
      previousBalance: previousCoins,
      coinsAdded: totalEarned,
      newBalance: newCoins,
      previousTotal: subjectData.totalCoinsEarned,
      newTotal: subjectData.totalCoinsEarned + totalEarned
    });

    // Calculate total test duration (hidden timer)
    const testDuration = testStartTime ? Math.round((Date.now() - testStartTime) / 1000) : 0;

    const newData = {
      ...gameData,
      streak: newStreak,
      bestStreak: Math.max(gameData.bestStreak, newStreak),
      lastTestDate: today,
      [currentSubject]: {
        ...subjectData,
        coins: newCoins,
        totalCoinsEarned: subjectData.totalCoinsEarned + totalEarned,
        testHistory: [...subjectData.testHistory, {
          date: today,
          score: correctCount,
          total: testWords.length,
          words: allResults.map(r => ({ word: r.word, wordId: r.wordId, correct: r.correct, category: r.category, timeSpent: r.timeSpent })),
          duration: testDuration,
          wordTimings: wordTimings
        }],
        [statsField]: newStats
      }
    };

      newData.earnedBadges = checkBadges(newData);
      setGameData(newData);

      // Trigger immediate backup download after test completion
      saveData(newData, true); // true = download backup

      console.log('✅ Test complete! Navigating to results screen');
      setScreen('results');
    } catch (error) {
      console.error('❌ ERROR in finishTest:', error);
      alert(`Error saving test results: ${error.message}\n\nPlease try again or contact support.`);
    }
  };

  const nextWord = () => {
    console.log('➡️ nextWord called. currentIndex:', currentIndex, 'testWords.length:', testWords.length);
    if (currentIndex < testWords.length - 1) {
      console.log('Moving to next question');
      setCurrentIndex(prev => prev + 1);
      setInput('');
      setShowResult(null);
      setHintUsed(false); // Reset hint for next question
      setSelectedMCQOption(null); // Reset MCQ selection for next question
      setSelectedTFAnswer(null); // Reset T/F selection for next question
      setChallengeMode(false); // Reset challenge mode for next question
      setAiFeedback(null); // Reset AI feedback for next question
      setWordStartTime(Date.now()); // Reset word timer for next word
    } else {
      console.log('Last question - calling finishTest()');
      finishTest();
    }
  };

  const showHint = () => {
    const item = testWords[currentIndex];
    setHintUsed(true);

    if (currentSubject === 'maths') {
      // For maths, show a helpful hint based on the answer
      const answer = item.answer;
      let hintText = '';

      if (item.topic === 'times-tables') {
        hintText = `💡 Hint: The answer is between ${Math.floor(parseFloat(answer) / 10) * 10} and ${Math.ceil(parseFloat(answer) / 10) * 10}`;
      } else if (item.topic === 'fractions') {
        hintText = `💡 Hint: Try converting to a common denominator!`;
      } else if (answer.includes('/')) {
        hintText = `💡 Hint: The answer is a fraction (use the / key)`;
      } else {
        const partial = answer.substring(0, Math.ceil(answer.length / 2));
        hintText = `💡 Hint: The answer starts with ${partial}...`;
      }

      alert(hintText + '\n\n⚠️ Coins reduced by 50% for using hint!');
    } else if (currentSubject === 'spelling') {
      // For spelling, show first few letters
      const partial = item.word.substring(0, Math.ceil(item.word.length / 2));
      alert(`💡 Hint: The word starts with "${partial}..."\n\n⚠️ Coins reduced by 50% for using hint!`);
    }
  };

  const claimReward = (reward) => {
    const canAfford = canAffordReward(reward, gameData);
    const tierUnlocked = isRewardUnlocked(reward, gameData);

    if (canAfford && tierUnlocked && !claimedRewards.includes(reward.id)) {
      const costs = getRewardCostPerSubject(reward.cost);

      console.log('🎁 REWARD CLAIMED:', {
        reward: reward.name,
        totalCost: reward.cost,
        costs: costs,
        previousBalances: {
          spelling: gameData.spelling.coins,
          maths: gameData.maths.coins,
          science: gameData.science.coins
        }
      });

      setGameData(prev => ({
        ...prev,
        spelling: {
          ...prev.spelling,
          coins: prev.spelling.coins - costs.spelling
        },
        maths: {
          ...prev.maths,
          coins: prev.maths.coins - costs.maths
        },
        science: {
          ...prev.science,
          coins: prev.science.coins - costs.science
        },
        claimedRewards: [...prev.claimedRewards, reward.id]
      }));
    } else {
      const gaps = getRewardGaps(reward, gameData);
      console.log('❌ REWARD CLAIM FAILED:', {
        reward: reward.name,
        cost: reward.cost,
        gaps: gaps,
        tierUnlocked: tierUnlocked,
        alreadyClaimed: claimedRewards.includes(reward.id),
        reason: claimedRewards.includes(reward.id) ? 'Already claimed' :
                !tierUnlocked ? 'Tier not unlocked' : 'Not enough coins'
      });
    }
  };

  // Calculate stats
  const getStats = () => {
    if (testHistory.length === 0) return { testsDone: 0, avgScore: 0, weeklyCoins: 0 };
    const totalCorrect = testHistory.reduce((a, t) => a + t.score, 0);
    const totalQ = testHistory.reduce((a, t) => a + t.total, 0);
    const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);
    const recentTests = testHistory.filter(t => new Date(t.date) >= weekAgo);
    const weeklyCoins = recentTests.reduce((a, t) => {
      const wc = t.words.filter(w => w.correct).length * 2;
      const pct = (t.score / t.total) * 100;
      return a + wc + (pct === 100 ? 50 : pct >= 80 ? 25 : pct >= 60 ? 10 : 5);
    }, 0);
    return { testsDone: testHistory.length, avgScore: Math.round((totalCorrect / totalQ) * 100), weeklyCoins };
  };

  // Category analysis
  const getCategoryStats = () => {
    const catData = {};
    testHistory.forEach(test => {
      test.words?.forEach(w => {
        if (!catData[w.category]) catData[w.category] = { correct: 0, total: 0 };
        catData[w.category].total++;
        if (w.correct) catData[w.category].correct++;
      });
    });

    // Get category names based on current subject
    const getCategoryName = (cat) => {
      if (currentSubject === 'maths') {
        const mathsCat = mathsCategories.find(c => c.id === cat);
        return mathsCat ? mathsCat.name : cat;
      } else if (currentSubject === 'spelling') {
        return categoryNames[cat] || cat;
      }
      return cat;
    };

    return Object.entries(catData).map(([cat, data]) => ({
      category: cat,
      name: getCategoryName(cat),
      pct: Math.round((data.correct / data.total) * 100),
      total: data.total
    })).sort((a, b) => a.pct - b.pct);
  };

  // Get recommendation
  const getRecommendation = () => {
    const cats = getCategoryStats();
    if (cats.length === 0) return { text: "Start your first test to see recommendations!", type: 'info' };
    const weakest = cats[0];
    if (weakest.pct < 50) return { text: `Focus on ${weakest.name} - only ${weakest.pct}% correct`, type: 'warning' };
    if (weakest.pct < 70) return { text: `${weakest.name} needs more practice (${weakest.pct}%)`, type: 'tip' };
    return { text: "Great work! Keep practicing to stay sharp!", type: 'success' };
  };

  const stats = getStats();
  const categoryStats = getCategoryStats();
  const recommendation = getRecommendation();
  const currentWord = testWords[currentIndex];

  // ============ SCREENS ============

  // Login Screen - Who's using the app?
  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-purple-700 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-7xl mb-4">👋</div>
            <h1 className="text-4xl font-black text-white mb-2">Who's using the app?</h1>
            <p className="text-white/80">Choose your profile to continue</p>
          </div>

          <div className="space-y-4">
            {/* Alba's Profile */}
            <button
              onClick={() => {
                localStorage.setItem('user_type', 'alba');
                localStorage.setItem('viewer_mode', 'false');
                setUserType('alba');
              }}
              className="w-full bg-white rounded-3xl p-8 shadow-2xl active:scale-95 transition-all"
            >
              <div className="text-center">
                <div className="text-6xl mb-3">✏️</div>
                <div className="font-black text-2xl text-gray-800 mb-1">Alba</div>
                <div className="text-gray-600 text-sm">Take tests & earn coins!</div>
              </div>
            </button>

            {/* Parent/Viewer Profile */}
            <button
              onClick={() => {
                localStorage.setItem('user_type', 'parent');
                localStorage.setItem('viewer_mode', 'true');
                setUserType('parent');
              }}
              className="w-full bg-white/20 backdrop-blur rounded-3xl p-8 border-2 border-white/30 active:scale-95 transition-all"
            >
              <div className="text-center">
                <div className="text-6xl mb-3">👁️</div>
                <div className="font-bold text-xl text-white mb-1">Mum / Dad</div>
                <div className="text-white/70 text-sm">View progress & reports</div>
              </div>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-xs">You can change this in Settings anytime</p>
          </div>
        </div>
      </div>
    );
  }

  // Subject Selection Screen
  if (screen === 'subject-select') {
    const getSubjectStats = (subject) => {
      const data = gameData[subject];
      if (!data || !data.testHistory || data.testHistory.length === 0) {
        return { lastScore: null, mastery: 0, totalTests: 0 };
      }

      const testHistory = data.testHistory;
      const lastTest = testHistory[testHistory.length - 1];
      const lastScore = lastTest ? Math.round((lastTest.score / lastTest.total) * 100) : null;

      // Calculate mastery percentage (words with 5+ consecutive correct)
      const stats = subject === 'spelling' ? data.wordStats : data.questionStats;
      const masteredCount = Object.values(stats).filter(s => s.consecutiveCorrect >= 5).length;
      const totalItems = subject === 'spelling' ? allWords.length :
                         subject === 'maths' ? mathsQuestions.length : 0;
      const mastery = totalItems > 0 ? Math.round((masteredCount / totalItems) * 100) : 0;

      return { lastScore, mastery, totalTests: testHistory.length };
    };

    const spellingStats = getSubjectStats('spelling');
    const mathsStats = getSubjectStats('maths');
    const scienceStats = getSubjectStats('science');

    const selectSubject = (subject) => {
      setGameData(prev => ({ ...prev, currentSubject: subject }));
      setScreen('home');
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-600 via-pink-500 to-orange-500 p-4">
        {newBadge && <BadgePopup badge={newBadge} onClose={() => setNewBadge(null)} />}
        <div className="max-w-md mx-auto">
          {/* Header with per-subject coins and streak */}
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-white/80 text-xs uppercase tracking-wide font-semibold">Your Coins</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <span className="text-xl font-bold text-white">{streak} days</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 bg-white/10 rounded-xl p-2">
                <div className="flex items-center gap-1 justify-center">
                  <span className="text-xl">📚</span>
                  <span className="text-lg font-bold text-white">{spelling.coins}</span>
                  <span className="text-xs text-white/60">🪙</span>
                </div>
              </div>
              <div className="flex-1 bg-white/10 rounded-xl p-2">
                <div className="flex items-center gap-1 justify-center">
                  <span className="text-xl">🔢</span>
                  <span className="text-lg font-bold text-white">{maths.coins}</span>
                  <span className="text-xs text-white/60">🪙</span>
                </div>
              </div>
              <div className="flex-1 bg-white/10 rounded-xl p-2">
                <div className="flex items-center gap-1 justify-center">
                  <span className="text-xl">🔬</span>
                  <span className="text-lg font-bold text-white">{science.coins}</span>
                  <span className="text-xs text-white/60">🪙</span>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white text-center mb-2">Alba's Learning</h1>
          <p className="text-white/90 text-center mb-8 text-lg">Choose your subject! 🎓</p>

          {/* Subject Cards */}
          <div className="space-y-4">
            {/* English */}
            <button
              onClick={() => selectSubject('spelling')}
              className="w-full bg-white rounded-3xl p-6 shadow-xl active:scale-98 transition-transform"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-5xl">📚</span>
                <div className="text-left flex-1">
                  <div className="font-bold text-2xl text-purple-600">English</div>
                  <div className="text-gray-500 text-sm">Spelling & literacy skills</div>
                </div>
              </div>
              {spellingStats.totalTests > 0 && (
                <div className="flex gap-4 text-sm">
                  <div className="flex-1 bg-purple-50 rounded-lg p-2">
                    <div className="text-purple-600 font-semibold">Last Score</div>
                    <div className="text-2xl font-bold text-purple-700">{spellingStats.lastScore}%</div>
                  </div>
                  <div className="flex-1 bg-purple-50 rounded-lg p-2">
                    <div className="text-purple-600 font-semibold">Mastery</div>
                    <div className="text-2xl font-bold text-purple-700">{spellingStats.mastery}%</div>
                  </div>
                  <div className="flex-1 bg-purple-50 rounded-lg p-2">
                    <div className="text-purple-600 font-semibold">Tests</div>
                    <div className="text-2xl font-bold text-purple-700">{spellingStats.totalTests}</div>
                  </div>
                </div>
              )}
            </button>

            {/* Maths */}
            <button
              onClick={() => selectSubject('maths')}
              className="w-full bg-white rounded-3xl p-6 shadow-xl active:scale-98 transition-transform"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-5xl">🔢</span>
                <div className="text-left flex-1">
                  <div className="font-bold text-2xl text-blue-600">Maths</div>
                  <div className="text-gray-500 text-sm">105 questions across 8 topics</div>
                </div>
              </div>
              {mathsStats.totalTests > 0 ? (
                <div className="flex gap-4 text-sm">
                  <div className="flex-1 bg-blue-50 rounded-lg p-2">
                    <div className="text-blue-600 font-semibold">Last Score</div>
                    <div className="text-2xl font-bold text-blue-700">{mathsStats.lastScore}%</div>
                  </div>
                  <div className="flex-1 bg-blue-50 rounded-lg p-2">
                    <div className="text-blue-600 font-semibold">Mastery</div>
                    <div className="text-2xl font-bold text-blue-700">{mathsStats.mastery}%</div>
                  </div>
                  <div className="flex-1 bg-blue-50 rounded-lg p-2">
                    <div className="text-blue-600 font-semibold">Tests</div>
                    <div className="text-2xl font-bold text-blue-700">{mathsStats.totalTests}</div>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <span className="text-blue-600 font-semibold">✨ New! Start your first test</span>
                </div>
              )}
            </button>

            {/* Science */}
            <button
              onClick={() => selectSubject('science')}
              className="w-full bg-white rounded-3xl p-6 shadow-xl active:scale-98 transition-transform"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-5xl">🔬</span>
                <div className="text-left flex-1">
                  <div className="font-bold text-2xl text-emerald-600">Science</div>
                  <div className="text-gray-500 text-sm">AI-marked answers & multiple choice</div>
                </div>
              </div>
              {scienceStats.totalTests > 0 ? (
                <div className="flex gap-4 text-sm">
                  <div className="flex-1 bg-emerald-50 rounded-lg p-2">
                    <div className="text-emerald-600 font-semibold">Last Score</div>
                    <div className="text-2xl font-bold text-emerald-700">{scienceStats.lastScore}%</div>
                  </div>
                  <div className="flex-1 bg-emerald-50 rounded-lg p-2">
                    <div className="text-emerald-600 font-semibold">Mastery</div>
                    <div className="text-2xl font-bold text-emerald-700">{scienceStats.mastery}%</div>
                  </div>
                  <div className="flex-1 bg-emerald-50 rounded-lg p-2">
                    <div className="text-emerald-600 font-semibold">Tests</div>
                    <div className="text-2xl font-bold text-emerald-700">{scienceStats.totalTests}</div>
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-50 rounded-lg p-3 text-center">
                  <span className="text-emerald-600 font-semibold">✨ New! Start your first test</span>
                </div>
              )}
            </button>

            {/* Rewards & Badges Row */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {/* Rewards Shop Button */}
              <button
                onClick={() => setScreen('rewards')}
                className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-4 shadow-xl active:scale-95 transition-transform"
              >
                <div className="text-center mb-3">
                  <span className="text-4xl">🎁</span>
                </div>
                <div className="font-bold text-lg text-white mb-2">Rewards</div>
                <div className="flex gap-2 text-xs">
                  <div className="flex-1 bg-white/20 backdrop-blur rounded-lg p-2">
                    <div className="text-white/70 font-semibold">Ready</div>
                    <div className="text-lg font-bold text-white">
                      {sampleRewards.filter(r => isRewardUnlocked(r, gameData) && canAffordReward(r, gameData) && !claimedRewards.includes(r.id)).length}
                    </div>
                  </div>
                  <div className="flex-1 bg-white/20 backdrop-blur rounded-lg p-2">
                    <div className="text-white/70 font-semibold">Got</div>
                    <div className="text-lg font-bold text-white">{claimedRewards.length}/{sampleRewards.length}</div>
                  </div>
                </div>
              </button>

              {/* Badges Button */}
              <button
                onClick={() => setScreen('badges')}
                className="bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl p-4 shadow-xl active:scale-95 transition-transform"
              >
                <div className="text-center mb-3">
                  <span className="text-4xl">🏆</span>
                </div>
                <div className="font-bold text-lg text-white mb-2">Badges</div>
                <div className="flex gap-2 text-xs">
                  <div className="flex-1 bg-white/20 backdrop-blur rounded-lg p-2">
                    <div className="text-white/70 font-semibold">Earned</div>
                    <div className="text-lg font-bold text-white">{earnedBadges.length}</div>
                  </div>
                  <div className="flex-1 bg-white/20 backdrop-blur rounded-lg p-2">
                    <div className="text-white/70 font-semibold">Total</div>
                    <div className="text-lg font-bold text-white">{badges.length}</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Settings button */}
          <button onClick={() => setScreen('settings')} className="w-full mt-6 bg-white/10 rounded-2xl p-4 shadow active:scale-98 flex items-center justify-center gap-2">
            <span className="text-2xl">⚙️</span>
            <span className="text-white text-sm">Settings</span>
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'home') {
    const subjectName = currentSubject === 'spelling' ? 'English' : currentSubject === 'maths' ? 'Maths' : 'Science';
    const subjectIcon = currentSubject === 'spelling' ? '📚' : currentSubject === 'maths' ? '🔢' : '🔬';
    const itemType = currentSubject === 'maths' ? 'questions' : currentSubject === 'spelling' ? 'words' : 'questions';
    const bgGradient = currentSubject === 'spelling' ? 'from-purple-500 to-indigo-600' : currentSubject === 'maths' ? 'from-blue-500 to-cyan-600' : 'from-emerald-500 to-teal-600';

    // Theme colors
    const headerGradient = currentSubject === 'spelling' ? 'from-purple-600 to-pink-500' : currentSubject === 'maths' ? 'from-blue-600 to-cyan-500' : 'from-emerald-600 to-teal-500';
    const buttonGradient = currentSubject === 'spelling' ? 'from-purple-500 to-pink-600' : currentSubject === 'maths' ? 'from-blue-500 to-cyan-600' : 'from-emerald-500 to-teal-600';
    const accentColor = currentSubject === 'spelling' ? 'purple' : currentSubject === 'maths' ? 'blue' : 'emerald';

    return (
      <div className={`min-h-screen bg-gradient-to-b ${bgGradient} p-4`}>
        {newBadge && <BadgePopup badge={newBadge} onClose={() => setNewBadge(null)} />}
        <div className="max-w-md mx-auto">
          {/* Back button */}
          <button
            onClick={() => setScreen('subject-select')}
            className="text-white/80 text-sm mb-4 flex items-center gap-1 active:scale-95"
          >
            ← Back to Subjects
          </button>

          {/* Animated Mascot Header */}
          <div className={`bg-gradient-to-r ${headerGradient} rounded-3xl p-6 mb-4 shadow-2xl relative overflow-hidden`}>
            {/* Sparkle effects */}
            <div className="absolute top-2 right-2 text-2xl animate-bounce" style={{animationDelay: '0s'}}>✨</div>
            <div className="absolute bottom-2 left-2 text-2xl animate-bounce" style={{animationDelay: '1s'}}>⭐</div>
            <div className="absolute top-1/2 right-4 text-xl animate-bounce" style={{animationDelay: '0.5s'}}>💫</div>

            <div className="text-center relative z-10">
              <div className="text-7xl mb-3">{subjectIcon}</div>
              <h1 className="text-3xl font-black text-white mb-2">{subjectName} Adventure!</h1>
              <p className="text-white/90 text-sm">Ready to level up, Alba? 🚀</p>
            </div>
          </div>

          {/* Game Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-3 shadow-lg text-center active:scale-95 transition-all">
              <div className="text-3xl mb-1">🪙</div>
              <div className="text-2xl font-black text-white">{gameData[currentSubject].coins}</div>
              <div className="text-xs text-white/80 font-semibold">Coins</div>
            </div>
            <div className="bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl p-3 shadow-lg text-center active:scale-95 transition-all">
              <div className="text-3xl mb-1">🔥</div>
              <div className="text-2xl font-black text-white">{streak}</div>
              <div className="text-xs text-white/80 font-semibold">Day Streak</div>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-3 shadow-lg text-center active:scale-95 transition-all">
              <div className="text-3xl mb-1">⭐</div>
              <div className="text-2xl font-black text-white">{stats.mastery}%</div>
              <div className="text-xs text-white/80 font-semibold">Mastery</div>
            </div>
          </div>

          {/* Big START TEST Button */}
          <button onClick={startTest} className={`w-full bg-gradient-to-r ${buttonGradient} rounded-3xl p-8 mb-4 shadow-2xl active:scale-95 transition-all relative overflow-hidden`}>
            <div className="flex items-center justify-center gap-4 relative z-10">
              <span className="text-6xl">✏️</span>
              <div className="text-left">
                <div className="font-black text-2xl text-white mb-1">START TEST!</div>
                <div className="text-white/90 font-semibold">5 {itemType} ready 🎯</div>
              </div>
            </div>
          </button>

          {/* Topic-Specific Tests (Maths & Science) */}
          {currentSubject === 'maths' && (
            <div className="mb-4">
              <h2 className="text-white font-bold text-sm mb-2 px-2">Or practice a specific topic:</h2>
              <div className="grid grid-cols-2 gap-2">
                {mathsCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => startCategoryTest(cat.id)}
                    className="bg-white/90 rounded-xl p-4 shadow active:scale-95 text-left"
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <div className="font-semibold text-sm text-gray-800">{cat.name}</div>
                    <div className="text-xs text-gray-500">
                      {mathsQuestions.filter(q => q.topic === cat.id).length} questions
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentSubject === 'science' && (
            <div className="mb-4">
              <h2 className="text-white font-bold text-sm mb-2 px-2">Or practice a specific topic:</h2>
              <div className="grid grid-cols-2 gap-2">
                {scienceCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => startCategoryTest(cat.id)}
                    className="bg-white/90 rounded-xl p-4 shadow active:scale-95 text-left"
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <div className="font-semibold text-sm text-gray-800">{cat.name}</div>
                    <div className="text-xs text-gray-500">
                      {scienceQuestions.filter(q => q.topic === cat.id).length} questions
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Access Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Progress */}
            <button
              onClick={() => setScreen('progress')}
              className={`bg-gradient-to-br from-${accentColor}-400 to-${accentColor}-500 rounded-2xl p-4 shadow-xl active:scale-95 transition-all`}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <div className="font-bold text-white text-sm">My Progress</div>
              </div>
            </button>

            {/* Rewards */}
            <button
              onClick={() => setScreen('rewards')}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-4 shadow-xl active:scale-95 transition-all relative"
            >
              {(() => {
                const unlockedRewards = sampleRewards.filter(r => isRewardUnlocked(r, gameData) && !claimedRewards.includes(r.id));
                const affordableRewards = unlockedRewards.filter(r => canAffordReward(r, gameData));
                return affordableRewards.length > 0 ? (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {affordableRewards.length}
                  </div>
                ) : null;
              })()}
              <div className="text-center">
                <div className="text-4xl mb-2">🎁</div>
                <div className="font-bold text-white text-sm">Rewards</div>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Badges */}
            <button
              onClick={() => setScreen('badges')}
              className="bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl p-4 shadow-xl active:scale-95 transition-all relative"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">🏆</div>
                <div className="font-bold text-white text-sm">Badges</div>
                <div className="text-white/80 text-xs mt-1">{earnedBadges.length}/{badges.length} earned</div>
              </div>
            </button>

            {/* Settings */}
            <button
              onClick={() => setScreen('settings')}
              className="bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl p-4 shadow-xl active:scale-95 transition-all"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">⚙️</div>
                <div className="font-bold text-white text-sm">Settings</div>
              </div>
            </button>
          </div>

          {/* Motivational Message */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border-2 border-white/30">
            <p className="text-white text-center font-semibold">
              {recommendation.type === 'warning' ? `⚠️ ${recommendation.text}` :
               recommendation.type === 'success' ? `🌟 ${recommendation.text}` :
               `💡 ${recommendation.text}`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'settings') {
    return <SettingsScreen ttsService={ttsService} onBack={() => setScreen('home')} onOpenDashboard={() => setScreen('dashboard')} />;
  }

  if (screen === 'dashboard') {
    return <ParentDashboard gameData={gameData} onBack={() => setScreen('settings')} />;
  }

  if (screen === 'test' && currentWord) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-500 to-cyan-600 p-4 relative">
        {coinAnim && <CoinAnimation amount={coinAnim} />}
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setScreen('home')} className="text-white/80 text-sm">✕ Quit</button>
            <div className="flex items-center gap-4">
              {hotStreak >= 2 && (
                <div className="flex items-center gap-1 bg-orange-500 px-3 py-1 rounded-full">
                  <span className="text-lg">🔥</span>
                  <span className="text-sm font-bold text-white">{hotStreak}x</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-xl">🪙</span>
                <span className="text-lg font-bold text-white">{gameData[currentSubject].coins}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/20 rounded-full h-2 mb-6">
            <div className="bg-white rounded-full h-2 transition-all" style={{ width: `${((currentIndex + 1) / testWords.length) * 100}%` }} />
          </div>
          <p className="text-white/80 text-center text-sm mb-4">{currentSubject === 'spelling' ? 'Word' : 'Question'} {currentIndex + 1} of {testWords.length}</p>

          <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
            {currentSubject === 'spelling' ? (
              <>
                <button onClick={() => speak(`${currentWord.word}. ${currentWord.sentence}. ${currentWord.word}.`)} disabled={speaking} className="w-full bg-indigo-100 rounded-xl p-4 mb-4 flex items-center justify-center gap-2 active:bg-indigo-200">
                  <span className="text-2xl">{speaking ? '🔊' : '🔈'}</span>
                  <span className="font-semibold text-indigo-700">Hear Word</span>
                </button>
                <p className="text-gray-500 text-center text-sm mb-4">"{currentWord.sentence}"</p>
              </>
            ) : currentSubject === 'maths' ? (
              <>
                <div className="text-center mb-4 p-6 bg-indigo-50 rounded-xl">
                  <p className="text-4xl font-bold text-indigo-900">{currentWord.question}</p>
                </div>
                <button onClick={() => speak(currentWord.ttsText || currentWord.question)} disabled={speaking} className="w-full bg-indigo-100 rounded-xl p-3 mb-4 flex items-center justify-center gap-2 active:bg-indigo-200">
                  <span className="text-xl">{speaking ? '🔊' : '🔈'}</span>
                  <span className="font-semibold text-indigo-700 text-sm">Hear Question</span>
                </button>
              </>
            ) : currentSubject === 'science' ? (
              <>
                <div className="text-center mb-4 p-6 bg-purple-50 rounded-xl">
                  <p className="text-2xl font-bold text-purple-900">{currentWord.question}</p>
                </div>
                <button onClick={() => speak(currentWord.ttsText || currentWord.question)} disabled={speaking} className="w-full bg-purple-100 rounded-xl p-3 mb-4 flex items-center justify-center gap-2 active:bg-purple-200">
                  <span className="text-xl">{speaking ? '🔊' : '🔈'}</span>
                  <span className="font-semibold text-purple-700 text-sm">Hear Question</span>
                </button>
              </>
            ) : null}

            {currentSubject !== 'science' && (
              <div className="bg-gray-100 rounded-xl p-4 min-h-16 flex items-center justify-center mb-2">
                <span className="text-2xl font-bold tracking-wider text-gray-800">{input || <span className="text-gray-400">{currentSubject === 'maths' ? 'Your answer...' : 'Type here...'}</span>}</span>
              </div>
            )}

            {showResult !== null && (
              <div className={`rounded-xl p-4 mb-2 ${showResult.correct ? 'bg-green-100' : 'bg-red-100'}`}>
                {showResult.correct ? (
                  <p className="text-center font-bold text-green-700">
                    ✓ Correct! +{showResult.streak === 1 ? 1 : showResult.streak === 2 ? 2 : 3} 🪙
                    {challengeMode && bonusCoins > 0 && <span className="block text-sm mt-1 text-purple-700">💪 Challenge Mode Bonus: +{bonusCoins} 🪙</span>}
                    {showResult.streak >= 2 && <span className="block text-sm mt-1">🔥 {showResult.streak} in a row! Streak bonus!</span>}
                  </p>
                ) : (
                  <div className="text-center">
                    <p className="font-bold text-red-700 mb-3">Let's learn together! 💪</p>

                    {currentSubject === 'spelling' ? (
                      <>
                        {/* Your spelling - bigger, clearer for dyslexia */}
                        <div className="mb-2">
                          <p className="text-xs text-gray-600 mb-1">You wrote:</p>
                          <div className="flex justify-center gap-1 mb-3">
                            {(showResult.attempt || '').split('').map((letter, i) => {
                              const correctWord = showResult.word.toLowerCase();
                              const isCorrect = i < correctWord.length && letter === correctWord[i];
                              return (
                                <span
                                  key={i}
                                  className={`text-2xl font-bold px-1 rounded ${isCorrect ? 'text-green-600' : 'text-red-600'}`}
                                  style={{ fontFamily: 'monospace' }}
                                >
                                  {letter}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        {/* Correct spelling - clear reference */}
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Correct spelling:</p>
                          <div className="flex justify-center gap-1">
                            {showResult.word.toLowerCase().split('').map((letter, i) => (
                              <span
                                key={i}
                                className="text-2xl font-bold text-green-700 px-1"
                                style={{ fontFamily: 'monospace' }}
                              >
                                {letter}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : currentSubject === 'maths' ? (
                      <>
                        <p className="text-2xl font-bold text-red-700 mb-2">Your answer: {showResult.attempt}</p>
                        <p className="text-2xl font-bold text-green-700">Correct answer: {currentWord.answer}</p>
                      </>
                    ) : currentSubject === 'science' ? (
                      <>
                        {aiFeedback ? (
                          // Challenge Mode: Show AI feedback
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600 mb-1">Your answer:</p>
                            <p className="text-lg font-semibold text-purple-800 bg-purple-50 p-3 rounded-lg">{showResult.attempt}</p>
                            <p className="text-sm text-purple-700 font-semibold mb-1">🤖 AI Teacher says:</p>
                            <p className="text-base text-purple-900 bg-purple-100 p-3 rounded-lg">{aiFeedback}</p>
                          </div>
                        ) : currentWord.type === 'multiple-choice' ? (
                          <>
                            <p className="text-lg font-bold text-red-700 mb-2">Your answer: {currentWord.options[selectedMCQOption]}</p>
                            <p className="text-lg font-bold text-green-700">Correct answer: {currentWord.options[currentWord.answer]}</p>
                          </>
                        ) : (
                          <>
                            <p className="text-2xl font-bold text-red-700 mb-2">Your answer: {selectedTFAnswer ? 'TRUE' : 'FALSE'}</p>
                            <p className="text-2xl font-bold text-green-700">Correct answer: {currentWord.answer ? 'TRUE' : 'FALSE'}</p>
                          </>
                        )}
                      </>
                    ) : null}
                  </div>
                )}
              </div>
            )}
          </div>

          {showResult === null ? (
            <>
              {/* Hint button - only show if hint not already used */}
              {!hintUsed && (
                <div className="mb-3 flex justify-center">
                  <button
                    onClick={showHint}
                    className="bg-yellow-100 text-yellow-700 px-6 py-2 rounded-xl font-semibold text-sm active:scale-95 shadow-md border-2 border-yellow-300"
                  >
                    💡 Need a Hint? (50% coin penalty)
                  </button>
                </div>
              )}
              {hintUsed && (
                <div className="mb-3 flex justify-center">
                  <p className="text-yellow-600 text-sm font-semibold">⚠️ Hint used - coins reduced by 50%</p>
                </div>
              )}
              {currentSubject === 'science' ? (
                challengeMode ? (
                  // Challenge Mode: Text input for typed answer
                  <>
                    <div className="bg-purple-50 rounded-xl p-4 mb-3">
                      <p className="text-purple-700 text-sm font-semibold text-center mb-2">
                        💪 Challenge Mode - Type Your Answer
                      </p>
                      <p className="text-purple-600 text-xs text-center">
                        Spelling doesn't matter! Worth up to {hotStreak === 0 ? 3 : hotStreak === 1 ? 4 : 5} 🪙
                      </p>
                    </div>
                    <div className="bg-gray-100 rounded-xl p-4 min-h-24 flex items-center justify-center mb-2">
                      <textarea
                        value={input}
                        readOnly
                        disabled={aiThinking}
                        className="w-full bg-transparent text-lg font-semibold text-gray-800 outline-none resize-none cursor-default"
                        placeholder="Explain your answer here..."
                        rows={3}
                      />
                    </div>
                    {aiThinking && (
                      <div className="text-center text-purple-600 font-semibold mb-2">
                        🤖 AI is marking your answer...
                      </div>
                    )}
                    {!showResult && !aiThinking && (
                      <button
                        onClick={() => {
                          setChallengeMode(false);
                          setInput('');
                        }}
                        className="w-full mb-2 bg-gray-200 text-gray-700 rounded-xl p-2 text-sm font-semibold active:scale-95"
                      >
                        ← Back to Multiple Choice
                      </button>
                    )}
                    <Keyboard onKey={handleKey} onBackspace={handleBackspace} onSubmit={handleSubmit} />
                  </>
                ) : currentWord.type === 'multiple-choice' ? (
                  <>
                    <MultipleChoice
                      question={currentWord.question}
                      options={currentWord.options}
                      selectedOption={selectedMCQOption}
                      onSelect={setSelectedMCQOption}
                      onSubmit={handleSubmit}
                      disabled={false}
                    />
                    {currentWord.acceptedConcepts && !showResult && (
                      <button
                        onClick={() => {
                          setChallengeMode(true);
                          setSelectedMCQOption(null);
                        }}
                        className="w-full mt-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-4 font-bold shadow-lg active:scale-95"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-2xl">💪</span>
                          <span>Challenge Mode - Type Answer for +2 Bonus 🪙</span>
                        </div>
                      </button>
                    )}
                  </>
                ) : (
                  <TrueFalse
                    question={currentWord.question}
                    selectedAnswer={selectedTFAnswer}
                    onSelect={setSelectedTFAnswer}
                    onSubmit={handleSubmit}
                    disabled={false}
                  />
                )
              ) : currentSubject === 'maths' ? (
                <NumberPad
                  onKey={handleKey}
                  onBackspace={handleBackspace}
                  onSubmit={handleSubmit}
                  onClear={() => setInput('')}
                />
              ) : (
                <Keyboard onKey={handleKey} onBackspace={handleBackspace} onSubmit={handleSubmit} />
              )}
            </>
          ) : (
            <button onClick={nextWord} className="w-full bg-white rounded-xl p-4 font-bold text-indigo-600 text-lg active:scale-98">
              {currentIndex < testWords.length - 1 ? `Next ${currentSubject === 'spelling' ? 'Word' : 'Question'} →` : 'See Results'}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (screen === 'results') {
    // Handle empty results (shouldn't happen but safety check)
    if (!results || results.length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-red-500 to-orange-600 p-4 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md">
            <p className="text-6xl mb-4">⚠️</p>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">No Results Found</h1>
            <p className="text-gray-600 mb-6">
              Something went wrong. No test results were recorded.
              This might be a bug - please try taking the test again.
            </p>
            <button onClick={() => setScreen('home')} className="w-full bg-red-600 text-white rounded-xl p-4 font-bold">
              Back to Home
            </button>
          </div>
        </div>
      );
    }

    const correctCount = results.filter(r => r.correct).length;
    const pct = results.length > 0 ? (correctCount / results.length) * 100 : 0;
    const totalEarned = results.reduce((a, r) => a + r.coins, 0) + (pct === 100 ? 20 : pct >= 80 ? 10 : pct >= 60 ? 5 : 2);

    return (
      <div className="min-h-screen bg-gradient-to-b from-green-500 to-emerald-600 p-4">
        {newBadge && <BadgePopup badge={newBadge} onClose={() => setNewBadge(null)} />}
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <span className="text-6xl">{pct === 100 ? '🌟' : pct >= 60 ? '👏' : '💪'}</span>
            <h1 className="text-3xl font-bold text-white mt-4">Test Complete!</h1>
            <p className="text-white/80 text-xl mt-2">{correctCount}/{results.length} correct</p>
          </div>

          <div className="bg-white rounded-2xl p-4 mb-6">
            {results.map((r, i) => (
              <div key={i} className={`flex items-center justify-between p-3 ${i > 0 ? 'border-t' : ''}`}>
                <div>
                  <span className={`font-bold ${r.correct ? 'text-green-600' : 'text-red-600'}`}>{r.word}</span>
                  {!r.correct && <span className="text-gray-400 text-sm ml-2">({r.attempt})</span>}
                </div>
                <span>{r.correct ? '✓' : '✗'}</span>
              </div>
            ))}
          </div>

          <div className="bg-white/20 rounded-2xl p-4 mb-6 text-center">
            <p className="text-white font-bold text-lg">Coins Earned</p>
            <p className="text-3xl text-white">🪙 {totalEarned}</p>
          </div>

          {/* Share Button */}
          <button
            onClick={async () => {
              const subjectEmoji = subject === 'spelling' ? '📚' : subject === 'maths' ? '🔢' : '🔬';
              const subjectName = subject === 'spelling' ? 'English' : subject === 'maths' ? 'Maths' : 'Science';
              const scoreEmoji = pct === 100 ? '🌟🌟🌟' : pct >= 80 ? '⭐⭐' : pct >= 60 ? '⭐' : '💪';

              const shareText = `${scoreEmoji} Alba's ${subjectName} Test ${subjectEmoji}\n\nScore: ${correctCount}/${results.length} (${Math.round(pct)}%)\nCoins earned: 🪙 ${totalEarned}\n\n${pct === 100 ? 'Perfect score! 🎉' : pct >= 80 ? 'Great job! 👏' : pct >= 60 ? 'Keep practicing! 💪' : 'Well done for trying! 🌈'}`;

              // Try Web Share API first (works on mobile)
              if (navigator.share) {
                try {
                  await navigator.share({
                    title: `Alba's ${subjectName} Test Results`,
                    text: shareText
                  });
                } catch (err) {
                  // User cancelled or error - no action needed
                  if (err.name !== 'AbortError') {
                    console.log('Share failed:', err);
                  }
                }
              } else {
                // Fallback to clipboard
                try {
                  await navigator.clipboard.writeText(shareText);
                  alert('✓ Copied to clipboard! Now you can paste it in WhatsApp or Messages');
                } catch (err) {
                  // Manual copy fallback
                  const textArea = document.createElement('textarea');
                  textArea.value = shareText;
                  textArea.style.position = 'fixed';
                  textArea.style.left = '-999999px';
                  document.body.appendChild(textArea);
                  textArea.select();
                  try {
                    document.execCommand('copy');
                    alert('✓ Copied to clipboard! Now you can paste it in WhatsApp or Messages');
                  } catch (err2) {
                    alert('Share text:\n\n' + shareText);
                  }
                  document.body.removeChild(textArea);
                }
              }
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl p-4 font-bold text-white text-lg mb-3 active:scale-95 shadow-lg flex items-center justify-center gap-2"
          >
            <span className="text-2xl">📤</span>
            <span>Share with Mum & Dad</span>
          </button>

          <button onClick={() => setScreen('home')} className="w-full bg-white rounded-xl p-4 font-bold text-green-600 text-lg">Done</button>
        </div>
      </div>
    );
  }

  if (screen === 'rewards') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-400 via-pink-400 to-rose-400 p-4">
        <div className="max-w-md mx-auto">
          {/* Header with all coins */}
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4 mb-4">
            <button onClick={() => setScreen('home')} className="text-white/80 mb-3">← Back</button>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">🎁 Rewards</h1>
              <div className="flex gap-2">
                <div className="bg-white/30 backdrop-blur rounded-lg px-3 py-1 flex items-center gap-1">
                  <span className="text-xl">📚</span>
                  <span className="text-white font-bold">{spelling.coins}</span>
                </div>
                <div className="bg-white/30 backdrop-blur rounded-lg px-3 py-1 flex items-center gap-1">
                  <span className="text-xl">🔢</span>
                  <span className="text-white font-bold">{maths.coins}</span>
                </div>
                <div className="bg-white/30 backdrop-blur rounded-lg px-3 py-1 flex items-center gap-1">
                  <span className="text-xl">🔬</span>
                  <span className="text-white font-bold">{science.coins}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rewards grid - card catalog style */}
          <div className="grid grid-cols-2 gap-3">
            {sampleRewards.map(r => {
              const claimed = claimedRewards.includes(r.id);
              const tierUnlocked = isRewardUnlocked(r, gameData);
              const progress = getUnlockProgress(r, gameData);
              const canAfford = canAffordReward(r, gameData);
              const gaps = getRewardGaps(r, gameData);
              const canClaim = tierUnlocked && canAfford && !claimed;
              const isExpanded = expandedReward === r.id;

              return (
                <div
                  key={r.id}
                  onClick={() => setExpandedReward(isExpanded ? null : r.id)}
                  className={`bg-white rounded-2xl p-4 shadow-lg transition-all ${
                    !tierUnlocked ? 'opacity-40 grayscale' : 'active:scale-95 cursor-pointer'
                  } ${claimed ? 'border-4 border-purple-400' : ''}`}
                >
                  {/* Icon and tier stars */}
                  <div className="text-center mb-2">
                    <div className="text-5xl mb-2">{r.icon}</div>
                    <div className="flex justify-center gap-0.5 mb-1">
                      {Array.from({ length: progress.tier }).map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xs">⭐</span>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="font-bold text-sm text-gray-800 text-center mb-2 leading-tight min-h-[32px]">
                    {r.name}
                  </div>

                  {/* Cost - big and clear */}
                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-2 mb-2">
                    <div className="text-center">
                      <div className="text-2xl font-black text-orange-600">{r.cost}</div>
                      <div className="text-xs text-orange-500 font-semibold">coins total</div>
                    </div>
                  </div>

                  {/* Status */}
                  {claimed ? (
                    <div className="bg-purple-100 rounded-lg py-2 text-center">
                      <span className="text-purple-600 font-bold text-sm">✓ Claimed!</span>
                    </div>
                  ) : !tierUnlocked ? (
                    <div className="bg-gray-100 rounded-lg py-2 text-center">
                      <span className="text-gray-500 font-bold text-xs">🔒 Locked</span>
                    </div>
                  ) : canAfford ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); claimReward(r); }}
                      className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg py-2 font-bold text-sm shadow-lg active:scale-95"
                    >
                      Claim! 🎉
                    </button>
                  ) : (
                    <div className="bg-red-50 rounded-lg py-2 text-center">
                      <span className="text-red-500 font-bold text-xs">Need more 🪙</span>
                    </div>
                  )}

                  {/* Expandable breakdown */}
                  {isExpanded && !claimed && (
                    <div className="mt-3 pt-3 border-t border-gray-200 space-y-1" onClick={(e) => e.stopPropagation()}>
                      <div className="text-xs font-semibold text-gray-600 mb-2 text-center">Cost per subject:</div>
                      <div className={`rounded p-2 flex justify-between items-center ${gaps.spelling.ready ? 'bg-green-50' : 'bg-red-50'}`}>
                        <span className="text-sm">📚 {gaps.spelling.needed}</span>
                        <span className={`text-xs font-bold ${gaps.spelling.ready ? 'text-green-600' : 'text-red-600'}`}>
                          {gaps.spelling.ready ? '✓' : `-${gaps.spelling.gap}`}
                        </span>
                      </div>
                      <div className={`rounded p-2 flex justify-between items-center ${gaps.maths.ready ? 'bg-green-50' : 'bg-red-50'}`}>
                        <span className="text-sm">🔢 {gaps.maths.needed}</span>
                        <span className={`text-xs font-bold ${gaps.maths.ready ? 'text-green-600' : 'text-red-600'}`}>
                          {gaps.maths.ready ? '✓' : `-${gaps.maths.gap}`}
                        </span>
                      </div>
                      <div className={`rounded p-2 flex justify-between items-center ${gaps.science.ready ? 'bg-green-50' : 'bg-red-50'}`}>
                        <span className="text-sm">🔬 {gaps.science.needed}</span>
                        <span className={`text-xs font-bold ${gaps.science.ready ? 'text-green-600' : 'text-red-600'}`}>
                          {gaps.science.ready ? '✓' : `-${gaps.science.gap}`}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'badges') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-500 to-rose-600 p-4">
        <div className="max-w-md mx-auto">
          <button onClick={() => setScreen('home')} className="text-white/80 mb-6">← Back</button>
          <h1 className="text-2xl font-bold text-white text-center mb-6">🏆 Badges</h1>
          <div className="grid grid-cols-3 gap-3">
            {badges.map(b => {
              const earned = earnedBadges.includes(b.id);
              return (
                <div key={b.id} className={`bg-white rounded-xl p-4 text-center ${!earned && 'opacity-40 grayscale'}`}>
                  <span className="text-3xl">{b.icon}</span>
                  <p className="text-xs font-bold mt-2 text-gray-700">{b.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'progress') {
    const weeklyTarget = 250;
    const subjectName = currentSubject === 'spelling' ? 'Spelling' : currentSubject === 'maths' ? 'Maths' : 'Science';
    const subjectIcon = currentSubject === 'spelling' ? '📚' : currentSubject === 'maths' ? '🔢' : '🔬';
    const categoryLabel = currentSubject === 'maths' ? 'Topic Accuracy' : 'Category Accuracy';
    const itemLabel = currentSubject === 'maths' ? 'questions' : 'words';

    // Get subject-specific data
    const subjectData = gameData[currentSubject];
    const subjectTestHistory = subjectData?.testHistory || [];
    const subjectCoins = subjectData?.totalCoinsEarned || 0;

    // Calculate stats from THIS subject's data only
    const subjectStats = (() => {
      if (subjectTestHistory.length === 0) return { testsDone: 0, avgScore: 0, weeklyCoins: 0 };
      const totalCorrect = subjectTestHistory.reduce((a, t) => a + t.score, 0);
      const totalQ = subjectTestHistory.reduce((a, t) => a + t.total, 0);
      const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);
      const recentTests = subjectTestHistory.filter(t => new Date(t.date) >= weekAgo);
      const weeklyCoins = recentTests.reduce((a, t) => {
        const wc = t.words.filter(w => w.correct).length * 2;
        const pct = (t.score / t.total) * 100;
        return a + wc + (pct === 100 ? 50 : pct >= 80 ? 25 : pct >= 60 ? 10 : 5);
      }, 0);
      return { testsDone: subjectTestHistory.length, avgScore: Math.round((totalCorrect / totalQ) * 100), weeklyCoins };
    })();

    // Calculate category stats from THIS subject only
    const subjectCategoryStats = (() => {
      const catData = {};
      subjectTestHistory.forEach(test => {
        test.words?.forEach(w => {
          if (!catData[w.category]) catData[w.category] = { correct: 0, total: 0 };
          catData[w.category].total++;
          if (w.correct) catData[w.category].correct++;
        });
      });

      const getCategoryName = (cat) => {
        if (currentSubject === 'maths') {
          const mathsCat = mathsCategories.find(c => c.id === cat);
          return mathsCat ? mathsCat.name : cat;
        } else if (currentSubject === 'spelling') {
          return categoryNames[cat] || cat;
        }
        return cat;
      };

      return Object.entries(catData).map(([cat, data]) => ({
        category: cat,
        name: getCategoryName(cat),
        pct: Math.round((data.correct / data.total) * 100),
        total: data.total
      })).sort((a, b) => a.pct - b.pct);
    })();

    const weeklyPct = Math.min(100, Math.round((subjectStats.weeklyCoins / weeklyTarget) * 100));

    // Subject-specific gradient colors
    const gradientClass = currentSubject === 'spelling'
      ? 'from-purple-500 to-indigo-600'
      : currentSubject === 'maths'
      ? 'from-blue-500 to-cyan-600'
      : 'from-emerald-500 to-teal-600';

    return (
      <div className={`min-h-screen bg-gradient-to-b ${gradientClass} p-4`}>
        <div className="max-w-md mx-auto">
          <button onClick={() => setScreen('home')} className="text-white/80 mb-6">← Back</button>
          <h1 className="text-2xl font-bold text-white text-center mb-4 flex items-center justify-center gap-2">
            <span>{subjectIcon}</span>
            <span>{subjectName} Progress</span>
          </h1>
          <p className="text-white/70 text-center text-sm mb-6">Your {subjectName.toLowerCase()} performance - {subjectStats.testsDone} tests completed</p>

          <div className="bg-white rounded-2xl p-6 mb-4">
            <h2 className="font-bold text-gray-800 mb-4">Weekly Target</h2>
            <div className="bg-gray-100 rounded-full h-4 mb-2">
              <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-full h-4 transition-all" style={{ width: `${weeklyPct}%` }} />
            </div>
            <p className="text-gray-500 text-sm">{subjectStats.weeklyCoins} / {weeklyTarget} coins this week ({currentSubject})</p>
          </div>

          {subjectCategoryStats.length > 0 && (
            <div className="bg-white rounded-2xl p-6 mb-4">
              <h2 className="font-bold text-gray-800 mb-3">{categoryLabel}</h2>
              <p className="text-gray-500 text-xs mb-3">Based on {subjectTestHistory.length} {currentSubject} tests</p>
              <div className="space-y-2">
                {subjectCategoryStats.map((cat, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-gray-600">{cat.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-100 rounded-full h-2">
                        <div className={`h-2 rounded-full ${cat.pct < 50 ? 'bg-red-500' : cat.pct < 75 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${cat.pct}%` }} />
                      </div>
                      <span className={`font-bold text-sm ${cat.pct < 50 ? 'text-red-500' : cat.pct < 75 ? 'text-yellow-500' : 'text-green-500'}`}>{cat.pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl p-6 mb-4">
            <h2 className="font-bold text-gray-800 mb-3">{subjectName} Stats</h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div><p className="text-2xl font-bold text-blue-600">{subjectStats.testsDone}</p><p className="text-gray-500 text-sm">Tests Done</p></div>
              <div><p className="text-2xl font-bold text-blue-600">{subjectStats.avgScore}%</p><p className="text-gray-500 text-sm">Avg Score</p></div>
              <div><p className="text-2xl font-bold text-blue-600">{streak}</p><p className="text-gray-500 text-sm">Day Streak</p></div>
              <div><p className="text-2xl font-bold text-blue-600">{bestStreak}</p><p className="text-gray-500 text-sm">Best Streak</p></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-bold text-gray-800 mb-3">{subjectName} All Time</h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div><p className="text-2xl font-bold text-blue-600">{subjectCoins}</p><p className="text-gray-500 text-sm">Total Coins</p></div>
              <div><p className="text-2xl font-bold text-blue-600">{subjectStats.testsDone}</p><p className="text-gray-500 text-sm">Total Tests</p></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Settings component (separate to avoid useState rules violation)
function SettingsScreen({ ttsService, onBack, onOpenDashboard }) {
  const [firstPinVerified, setFirstPinVerified] = useState(false);
  const [showAdminSettings, setShowAdminSettings] = useState(false);
  const [adminPinVerified, setAdminPinVerified] = useState(false);

  // First PIN: Access to reporting cards (for Mum)
  if (!firstPinVerified) {
    return <PinEntry
      onSuccess={() => setFirstPinVerified(true)}
      onBack={onBack}
      pinType="parent"
      title="Parent Access"
      subtitle="Enter PIN to view reports"
    />;
  }

  // Second PIN: Access to admin settings (for Dad)
  if (showAdminSettings && !adminPinVerified) {
    return <PinEntry
      onSuccess={() => setAdminPinVerified(true)}
      onBack={() => setShowAdminSettings(false)}
      pinType="admin"
      title="Admin Access"
      subtitle="Enter admin PIN for settings"
    />;
  }

  // Show admin settings if second PIN verified
  if (adminPinVerified) {
    return <AdminSettings
      ttsService={ttsService}
      onBack={() => {
        setAdminPinVerified(false);
        setShowAdminSettings(false);
      }}
    />;
  }

  // Show reporting cards (first PIN verified)
  return <ReportingCards
    onBack={onBack}
    onOpenDashboard={onOpenDashboard}
    onOpenAdminSettings={() => setShowAdminSettings(true)}
  />;
}

// Reporting Cards Component (for Mum - first PIN level)
function ReportingCards({ onBack, onOpenDashboard, onOpenAdminSettings }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-600 p-4">
      <div className="max-w-md mx-auto">
        <button onClick={onBack} className="text-white/80 mb-6">← Back</button>
        <h1 className="text-3xl font-bold text-white text-center mb-2">📊 Reports</h1>
        <p className="text-white/80 text-center mb-6">Track Alba's progress</p>

        {/* Dashboard Card */}
        <div className="bg-white rounded-3xl p-6 mb-4 shadow-2xl">
          <div className="text-center mb-4">
            <span className="text-6xl mb-3 block">📈</span>
            <h2 className="font-bold text-2xl text-gray-800 mb-2">Detailed Dashboard</h2>
            <p className="text-gray-600 text-sm">View complete progress report with graphs and stats</p>
          </div>
          <button
            onClick={onOpenDashboard}
            className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 active:scale-95 shadow-lg"
          >
            View Full Report 📊
          </button>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-center">
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-2xl font-black text-white">{localStorage.getItem('streak') || 0}</div>
            <div className="text-xs text-white/80 font-semibold">Day Streak</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-black text-white">
              {(() => {
                const data = JSON.parse(localStorage.getItem('alba_spelling_data') || '{}');
                return ((data.spelling?.badges?.length || 0) + (data.maths?.badges?.length || 0) + (data.science?.badges?.length || 0));
              })()}
            </div>
            <div className="text-xs text-white/80 font-semibold">Badges</div>
          </div>
        </div>

        {/* Admin Settings Button */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border-2 border-white/30">
          <div className="text-center mb-4">
            <span className="text-5xl mb-3 block">⚙️</span>
            <h2 className="font-bold text-xl text-white mb-2">Admin Settings</h2>
            <p className="text-white/70 text-sm">Manage APIs, word banks, and system settings</p>
          </div>
          <button
            onClick={onOpenAdminSettings}
            className="w-full py-3 rounded-2xl font-bold text-purple-600 bg-white active:scale-95 shadow-lg"
          >
            🔒 Enter Admin PIN
          </button>
        </div>
      </div>
    </div>
  );
}

// Admin Settings Component (for Dad - second PIN level)
function AdminSettings({ ttsService, onBack }) {
  const [apiKey, setApiKey] = useState(ttsService.getApiKey() || '');
  const [saved, setSaved] = useState(false);
  const [aiMarkingKey, setAiMarkingKey] = useState(localStorage.getItem('openai_ai_marking_key') || '');
  const [aiMarkingSaved, setAiMarkingSaved] = useState(false);
  const [newParentPin, setNewParentPin] = useState('');
  const [newAdminPin, setNewAdminPin] = useState('');
  const [parentPinSaved, setParentPinSaved] = useState(false);
  const [adminPinSaved, setAdminPinSaved] = useState(false);
  const [githubToken, setGithubToken] = useState(localStorage.getItem('github_token') || '');
  const [githubSaved, setGithubSaved] = useState(false);
  const [manualGistId, setManualGistId] = useState('');
  const [viewerMode, setViewerMode] = useState(localStorage.getItem('viewer_mode') === 'true');

  const handleSave = () => {
    ttsService.setApiKey(apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAiMarkingSave = () => {
    localStorage.setItem('openai_ai_marking_key', aiMarkingKey);
    setAiMarkingSaved(true);
    setTimeout(() => setAiMarkingSaved(false), 2000);
  };

  const handleParentPinSave = () => {
    if (newParentPin.length === 4 && /^\d{4}$/.test(newParentPin)) {
      localStorage.setItem('parent_pin', newParentPin);
      setParentPinSaved(true);
      setNewParentPin('');
      setTimeout(() => setParentPinSaved(false), 2000);
    } else {
      alert('PIN must be exactly 4 digits');
    }
  };

  const handleAdminPinSave = () => {
    if (newAdminPin.length === 4 && /^\d{4}$/.test(newAdminPin)) {
      localStorage.setItem('admin_pin', newAdminPin);
      setAdminPinSaved(true);
      setNewAdminPin('');
      setTimeout(() => setAdminPinSaved(false), 2000);
    } else {
      alert('PIN must be exactly 4 digits');
    }
  };

  const handleGithubSave = () => {
    localStorage.setItem('github_token', githubToken);
    setGithubSaved(true);
    setTimeout(() => setGithubSaved(false), 2000);
  };

  // REMOVED: deleteEmptyGists - dangerous function that could delete important data

  const findAndDownload = async () => {
    const token = localStorage.getItem('github_token');
    if (!token) {
      alert('Please add your GitHub token first!');
      return;
    }

    try {
      // Search for Gists with alba-spelling-data
      const listResponse = await fetch('https://api.github.com/gists', {
        headers: { 'Authorization': `token ${token}` }
      });

      if (!listResponse.ok) {
        alert('Failed to fetch Gists. Check your token.');
        return;
      }

      const gists = await listResponse.json();
      const albaGists = gists.filter(g => g.files['alba-spelling-data.json']);

      if (albaGists.length === 0) {
        alert('No Alba spelling data found. Has Alba taken a test yet?');
        return;
      }

      // Check ALL Gists and pick the one with MOST coins (Alba's data, not empty)
      const gistDataPromises = albaGists.map(async (g) => {
        const r = await fetch(`https://api.github.com/gists/${g.id}`, { headers: { 'Authorization': `token ${token}` } });
        if (!r.ok) return null;
        const full = await r.json();
        const data = JSON.parse(full.files['alba-spelling-data.json'].content);
        // Calculate total coins across all subjects (new structure) or use legacy totalCoinsEarned (old structure)
        const totalCoins = data.spelling?.totalCoinsEarned || data.maths?.totalCoinsEarned || data.science?.totalCoinsEarned
          ? (data.spelling?.totalCoinsEarned || 0) + (data.maths?.totalCoinsEarned || 0) + (data.science?.totalCoinsEarned || 0)
          : (data.totalCoinsEarned || 0);
        return { id: g.id, coins: totalCoins, data };
      });
      const gistData = (await Promise.all(gistDataPromises)).filter(Boolean);

      // Pick the one with MOST coins
      const best = gistData.sort((a, b) => b.coins - a.coins)[0];

      console.log(`Found ${albaGists.length} Gists, using one with most coins: ${best.id} (${best.coins} coins)`);

      // Use the data we already fetched
      const data = best.data;

      // Save to localStorage
      localStorage.setItem('alba_spelling_data', JSON.stringify(data));
      localStorage.setItem('gist_id', best.id);

      // Support both old and new (multi-subject) data structures
      const totalCoins = data.spelling?.coins !== undefined
        ? (data.spelling?.coins || 0) + (data.maths?.coins || 0) + (data.science?.coins || 0)
        : (data.coins || 0);
      const totalEarned = data.spelling?.totalCoinsEarned !== undefined
        ? (data.spelling?.totalCoinsEarned || 0) + (data.maths?.totalCoinsEarned || 0) + (data.science?.totalCoinsEarned || 0)
        : (data.totalCoinsEarned || 0);
      const totalTests = data.spelling?.testHistory !== undefined
        ? (data.spelling?.testHistory?.length || 0) + (data.maths?.testHistory?.length || 0) + (data.science?.testHistory?.length || 0)
        : (data.testHistory?.length || 0);

      alert(`✅ Found Alba's data!\n\nCoins: ${totalCoins}\nTotal Earned: ${totalEarned}\nTests: ${totalTests}\n\nRefreshing now...`);
      window.location.reload();
    } catch (error) {
      alert('Error finding data: ' + error.message);
    }
  };

  const loadFromCloud = async () => {
    const token = localStorage.getItem('github_token');
    const gistId = localStorage.getItem('gist_id');

    if (!token || !gistId) {
      alert('No cloud backup configured yet. Use "Find Alba\'s Data" button.');
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/gists/${gistId}`, {
        headers: { 'Authorization': `token ${token}` }
      });

      if (response.ok) {
        const gist = await response.json();
        const content = gist.files['alba-spelling-data.json'].content;
        const data = JSON.parse(content);
        localStorage.setItem('alba_spelling_data', JSON.stringify(data));
        alert('✅ Loaded latest data from cloud! Refresh the page.');
        window.location.reload();
      } else {
        alert('Failed to load from cloud. Check your token.');
      }
    } catch (error) {
      alert('Error loading from cloud: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <button onClick={onBack} className="text-white/80 mb-6">← Back to Reports</button>
        <h1 className="text-2xl font-bold text-white text-center mb-2">⚙️ Admin Settings</h1>
        <p className="text-white/70 text-center text-sm mb-6">System configuration & management</p>

        {/* Viewer Mode Toggle */}
        <div className="bg-white rounded-2xl p-6 mb-4">
          <h2 className="font-bold text-gray-800 mb-2">👁️ Device Mode</h2>
          <p className="text-gray-600 text-sm mb-4">
            {viewerMode ? 'This device is in VIEWER MODE (read-only, won\'t sync to cloud)' : 'This device will sync data to cloud'}
          </p>
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
            <div>
              <div className="font-semibold text-gray-800">{viewerMode ? '👁️ Viewer Mode' : '📱 Alba\'s Device'}</div>
              <div className="text-xs text-gray-500 mt-1">
                {viewerMode ? 'Read-only - safe for parents' : 'Can sync to cloud'}
              </div>
            </div>
            <button
              onClick={() => {
                const newMode = !viewerMode;
                localStorage.setItem('viewer_mode', newMode.toString());
                setViewerMode(newMode);
              }}
              className={`px-6 py-2 rounded-lg font-bold text-white transition-all ${
                viewerMode ? 'bg-blue-500' : 'bg-green-500'
              }`}
            >
              {viewerMode ? 'Set as Alba\'s Device' : 'Set as Viewer'}
            </button>
          </div>
          {viewerMode && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-700 text-sm font-semibold">✓ Safe to use - won't overwrite Alba's data</p>
            </div>
          )}
        </div>

        {/* PIN Management */}
        <div className="bg-white rounded-2xl p-6 mb-4">
          <h2 className="font-bold text-gray-800 mb-4">🔒 PIN Management</h2>

          {/* Parent PIN */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm">Parent PIN (Level 1)</h3>
            <p className="text-gray-500 text-xs mb-3">For viewing reports (current: {localStorage.getItem('parent_pin') || '3521'})</p>
            <input
              type="number"
              value={newParentPin}
              onChange={(e) => setNewParentPin(e.target.value)}
              placeholder="New 4-digit PIN"
              maxLength={4}
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none mb-2 text-center text-lg font-mono"
            />
            <button onClick={handleParentPinSave} className={`w-full py-2 rounded-lg font-bold text-white text-sm ${parentPinSaved ? 'bg-green-500' : 'bg-purple-500'} active:scale-98`}>
              {parentPinSaved ? '✓ Parent PIN Updated!' : 'Update Parent PIN'}
            </button>
          </div>

          {/* Admin PIN */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2 text-sm">Admin PIN (Level 2)</h3>
            <p className="text-gray-500 text-xs mb-3">For admin settings (current: {localStorage.getItem('admin_pin') || '5756'})</p>
            <input
              type="number"
              value={newAdminPin}
              onChange={(e) => setNewAdminPin(e.target.value)}
              placeholder="New 4-digit PIN"
              maxLength={4}
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:outline-none mb-2 text-center text-lg font-mono"
            />
            <button onClick={handleAdminPinSave} className={`w-full py-2 rounded-lg font-bold text-white text-sm ${adminPinSaved ? 'bg-green-500' : 'bg-orange-500'} active:scale-98`}>
              {adminPinSaved ? '✓ Admin PIN Updated!' : 'Update Admin PIN'}
            </button>
          </div>
        </div>

        {/* GitHub Cloud Backup */}
        <div className="bg-white rounded-2xl p-6 mb-4">
          <h2 className="font-bold text-gray-800 mb-2">☁️ GitHub Cloud Backup</h2>
          <p className="text-gray-600 text-sm mb-4">
            Auto-saves test data to private GitHub Gist
            <br/><a href="https://github.com/settings/tokens/new?scopes=gist&description=Alba%20Spelling%20Backup" target="_blank" className="text-blue-600 underline">Get token here</a>
          </p>
          <input
            type="password"
            value={githubToken}
            onChange={(e) => setGithubToken(e.target.value)}
            placeholder="ghp_..."
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none mb-3 font-mono text-sm"
          />
          <button onClick={handleGithubSave} className={`w-full py-3 rounded-lg font-bold text-white ${githubSaved ? 'bg-green-500' : 'bg-purple-600'} active:scale-98 mb-2`}>
            {githubSaved ? '✓ Token Saved!' : 'Save Token'}
          </button>

          {githubToken && (
            <>
              <button onClick={findAndDownload} className="w-full py-3 rounded-lg font-bold text-white bg-green-600 active:scale-98 mb-2">
                📥 Download Alba's Data
              </button>
            </>
          )}

          {localStorage.getItem('gist_id') && (
            <>
              <button onClick={loadFromCloud} className="w-full py-3 rounded-lg font-bold text-purple-600 bg-purple-50 active:scale-98 mb-3">
                📥 Load Latest from Cloud
              </button>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-green-700 text-sm font-semibold mb-2">✓ Syncing to GitHub</p>
                <a
                  href={`https://gist.github.com/${localStorage.getItem('gist_id')}`}
                  target="_blank"
                  className="text-blue-600 text-xs underline"
                >
                  View backup on GitHub →
                </a>
              </div>
            </>
          )}
        </div>

        {/* OpenAI TTS API Key */}
        <div className="bg-white rounded-2xl p-6 mb-4">
          <h2 className="font-bold text-gray-800 mb-2">🔊 OpenAI TTS API Key</h2>
          <p className="text-gray-600 text-sm mb-4">For high-quality voice (platform.openai.com)</p>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none mb-3 font-mono text-sm"
          />
          <button onClick={handleSave} className={`w-full py-3 rounded-lg font-bold text-white ${saved ? 'bg-green-500' : 'bg-blue-500'} active:scale-98`}>
            {saved ? '✓ Saved!' : 'Save TTS Key'}
          </button>
          {ttsService.hasApiKey() && (
            <div className="mt-3 p-3 bg-green-50 rounded-lg">
              <p className="text-green-700 text-sm font-semibold">✓ OpenAI TTS Active</p>
            </div>
          )}
        </div>

        {/* AI Marking API Key */}
        <div className="bg-white rounded-2xl p-6 mb-4">
          <h2 className="font-bold text-gray-800 mb-2">🧠 AI Marking API Key</h2>
          <p className="text-gray-600 text-sm mb-4">For Challenge Mode typed answers (platform.openai.com)</p>
          <input
            type="password"
            value={aiMarkingKey}
            onChange={(e) => setAiMarkingKey(e.target.value)}
            placeholder="sk-..."
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none mb-3 font-mono text-sm"
          />
          <button onClick={handleAiMarkingSave} className={`w-full py-3 rounded-lg font-bold text-white ${aiMarkingSaved ? 'bg-green-500' : 'bg-purple-500'} active:scale-98`}>
            {aiMarkingSaved ? '✓ Saved!' : 'Save AI Marking Key'}
          </button>
          {localStorage.getItem('openai_ai_marking_key') && (
            <div className="mt-3 p-3 bg-purple-50 rounded-lg">
              <p className="text-purple-700 text-sm font-semibold">✓ AI Marking Active</p>
            </div>
          )}
        </div>

        {/* Audio Cache */}
        <div className="bg-white rounded-2xl p-6 mb-4">
          <h2 className="font-bold text-gray-800 mb-2">🗑️ Audio Cache</h2>
          <p className="text-gray-600 text-sm mb-3">Clear cached audio files</p>
          <button
            onClick={() => {
              ttsService.clearCache();
              alert('Cache cleared!');
            }}
            className="w-full py-3 rounded-lg font-bold text-red-600 bg-red-50 active:scale-98"
          >
            Clear Audio Cache
          </button>
        </div>

        {/* Sync Diagnostics */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="font-bold text-gray-800 mb-2">🔍 Sync Diagnostics</h2>
          <p className="text-gray-600 text-sm mb-4">Check local vs cloud data</p>

          <button
            onClick={async () => {
              const localData = JSON.parse(localStorage.getItem('alba_spelling_data') || '{}');
              const localSpelling = localData.spelling?.totalCoinsEarned || 0;
              const localMaths = localData.maths?.totalCoinsEarned || 0;
              const localScience = localData.science?.totalCoinsEarned || 0;

              let message = `📱 LOCAL DATA:\n`;
              message += `Spelling: ${localData.spelling?.coins || 0} coins (${localSpelling} lifetime)\n`;
              message += `Maths: ${localData.maths?.coins || 0} coins (${localMaths} lifetime)\n`;
              message += `Science: ${localData.science?.coins || 0} coins (${localScience} lifetime)\n`;
              message += `Total: ${(localData.spelling?.coins || 0) + (localData.maths?.coins || 0) + (localData.science?.coins || 0)} coins\n\n`;

              const token = localStorage.getItem('github_token');
              if (!token) {
                alert(message + '❌ No GitHub token - cloud sync disabled');
                return;
              }

              try {
                const res = await fetch('https://api.github.com/gists', { headers: { 'Authorization': `token ${token}` } });
                if (!res.ok) {
                  alert(message + '❌ Failed to fetch cloud data');
                  return;
                }

                const gists = await res.json();
                const albaGists = gists.filter(g => g.files['alba-spelling-data.json']);

                if (albaGists.length === 0) {
                  alert(message + '☁️ No cloud backups found');
                  return;
                }

                message += `☁️ CLOUD DATA (${albaGists.length} backups found):\n\n`;

                for (const g of albaGists) {
                  const r = await fetch(`https://api.github.com/gists/${g.id}`, { headers: { 'Authorization': `token ${token}` } });
                  if (!r.ok) continue;
                  const full = await r.json();
                  const cloudData = JSON.parse(full.files['alba-spelling-data.json'].content);

                  const cloudSpelling = cloudData.spelling?.coins || 0;
                  const cloudMaths = cloudData.maths?.coins || 0;
                  const cloudScience = cloudData.science?.coins || 0;
                  const cloudSpellingTotal = cloudData.spelling?.totalCoinsEarned || 0;
                  const cloudMathsTotal = cloudData.maths?.totalCoinsEarned || 0;
                  const cloudScienceTotal = cloudData.science?.totalCoinsEarned || 0;

                  const currentGistId = localStorage.getItem('gist_id');
                  const isCurrent = g.id === currentGistId ? ' ⭐ ACTIVE' : '';

                  message += `Gist ${g.id.substring(0, 8)}...${isCurrent}\n`;
                  message += `  Spelling: ${cloudSpelling} (${cloudSpellingTotal} total)\n`;
                  message += `  Maths: ${cloudMaths} (${cloudMathsTotal} total)\n`;
                  message += `  Science: ${cloudScience} (${cloudScienceTotal} total)\n`;
                  message += `  Created: ${new Date(g.created_at).toLocaleString()}\n`;
                  message += `  Updated: ${new Date(g.updated_at).toLocaleString()}\n\n`;
                }

                alert(message);
              } catch (e) {
                alert(message + `\n❌ Error: ${e.message}`);
              }
            }}
            className="w-full py-3 rounded-lg font-bold text-white bg-blue-500 active:scale-98 mb-3"
          >
            Check Local vs Cloud Data
          </button>

          <button
            onClick={async () => {
              if (!confirm('This will force pull the latest cloud data and overwrite local data. Continue?')) return;

              const token = localStorage.getItem('github_token');
              if (!token) {
                alert('No GitHub token configured');
                return;
              }

              try {
                const res = await fetch('https://api.github.com/gists', { headers: { 'Authorization': `token ${token}` } });
                if (!res.ok) throw new Error('Failed to fetch gists');

                const gists = await res.json();
                const albaGists = gists.filter(g => g.files['alba-spelling-data.json']);
                if (albaGists.length === 0) {
                  alert('No cloud backups found');
                  return;
                }

                // Get all gists with their coin data
                const gistDataPromises = albaGists.map(async (g) => {
                  const r = await fetch(`https://api.github.com/gists/${g.id}`, { headers: { 'Authorization': `token ${token}` } });
                  if (!r.ok) return null;
                  const full = await r.json();
                  const data = JSON.parse(full.files['alba-spelling-data.json'].content);
                  const totalCoins = (data.spelling?.totalCoinsEarned || 0) + (data.maths?.totalCoinsEarned || 0) + (data.science?.totalCoinsEarned || 0);
                  return { id: g.id, coins: totalCoins, data, updated: g.updated_at };
                });
                const gistData = (await Promise.all(gistDataPromises)).filter(Boolean);

                // Pick the one with most coins
                const best = gistData.sort((a, b) => b.coins - a.coins)[0];

                // Save to localStorage
                localStorage.setItem('alba_spelling_data', JSON.stringify(best.data));
                localStorage.setItem('gist_id', best.id);

                alert(`✅ Synced from cloud!\n\nSpelling: ${best.data.spelling?.coins || 0} coins\nMaths: ${best.data.maths?.coins || 0} coins\nScience: ${best.data.science?.coins || 0} coins\n\n🔄 Reload the app to see changes`);
                window.location.reload();
              } catch (e) {
                alert(`❌ Sync failed: ${e.message}`);
              }
            }}
            className="w-full py-3 rounded-lg font-bold text-white bg-green-500 active:scale-98"
          >
            Force Pull from Cloud
          </button>
        </div>

        {/* Emergency Restore from Backup */}
        <div className="bg-white rounded-2xl p-6 mt-4 border-2 border-orange-300">
          <h2 className="font-bold text-gray-800 mb-2">🆘 Emergency Restore</h2>
          <p className="text-gray-600 text-sm mb-4">Restore from downloaded backup file (alba-backup-*.json)</p>

          <input
            type="file"
            accept=".json"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              try {
                const text = await file.text();
                const backupData = JSON.parse(text);

                // Validate backup structure
                if (!backupData.spelling && !backupData.maths && !backupData.science) {
                  alert('❌ Invalid backup file - missing subject data');
                  e.target.value = '';
                  return;
                }

                // Show confirmation with data preview
                const spelling = backupData.spelling?.coins || 0;
                const maths = backupData.maths?.coins || 0;
                const science = backupData.science?.coins || 0;
                const total = spelling + maths + science;

                const confirmed = confirm(
                  `🔄 RESTORE FROM BACKUP?\n\n` +
                  `Spelling: ${spelling} coins\n` +
                  `Maths: ${maths} coins\n` +
                  `Science: ${science} coins\n` +
                  `Total: ${total} coins\n\n` +
                  `This will overwrite your current data!\n\n` +
                  `Continue?`
                );

                if (!confirmed) {
                  e.target.value = '';
                  return;
                }

                // Restore the data
                localStorage.setItem('alba_spelling_data', JSON.stringify(backupData));

                // Also download a backup of what we just overwrote (safety net)
                const oldData = JSON.parse(localStorage.getItem('alba_spelling_data') || '{}');
                downloadBackup(oldData, 'pre-restore-backup');

                alert(
                  `✅ RESTORE COMPLETE!\n\n` +
                  `Spelling: ${spelling} coins\n` +
                  `Maths: ${maths} coins\n` +
                  `Science: ${science} coins\n\n` +
                  `🔄 Reload the app to see changes`
                );

                e.target.value = '';
                window.location.reload();
              } catch (error) {
                alert(`❌ Restore failed: ${error.message}`);
                e.target.value = '';
              }
            }}
            className="w-full px-4 py-3 rounded-lg border-2 border-orange-300 focus:border-orange-500 focus:outline-none mb-3 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-50 file:text-orange-700 file:font-semibold hover:file:bg-orange-100"
          />

          <p className="text-xs text-gray-500 mt-2">
            ⚠️ This will overwrite all current data. A backup of your current data will be auto-downloaded first.
          </p>
        </div>

        {/* Backup Status Indicator */}
        <div className="bg-white rounded-2xl p-6 mt-4">
          <h2 className="font-bold text-gray-800 mb-2">💾 Backup Status</h2>
          <p className="text-gray-600 text-sm mb-3">Last backup information</p>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <p className="text-green-700 font-semibold mb-2">✅ Auto-Download Active</p>
            <p className="text-green-600 text-sm">Backups download automatically after each test</p>
            <p className="text-green-600 text-sm mt-2">Files saved as: <span className="font-mono text-xs">alba-backup-YYYY-MM-DD.json</span></p>
          </div>

          {(() => {
            const gistId = localStorage.getItem('gist_id');
            if (gistId) {
              return (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mt-3">
                  <p className="text-blue-700 font-semibold mb-2">☁️ Cloud Sync Active</p>
                  <p className="text-blue-600 text-sm">Gist ID: <span className="font-mono text-xs">{gistId}</span></p>
                  <a
                    href={`https://gist.github.com/Spike1990AI/${gistId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-sm mt-2 block"
                  >
                    View on GitHub →
                  </a>
                </div>
              );
            } else {
              return (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mt-3">
                  <p className="text-yellow-700 font-semibold mb-2">⚠️ No Cloud Sync</p>
                  <p className="text-yellow-600 text-sm">Configure GitHub token above to enable cloud backup</p>
                </div>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
}

// PIN Entry component
function PinEntry({ onSuccess, onBack, pinType = 'parent', title = 'Parent Access', subtitle = 'Enter PIN' }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  // Get the correct PIN based on pinType
  const storedPin = pinType === 'admin'
    ? (localStorage.getItem('admin_pin') || '5756') // Default admin PIN: 5756
    : (localStorage.getItem('parent_pin') || '3521'); // Default parent PIN: 3521

  const handleNumberClick = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        // Check PIN
        setTimeout(() => {
          if (newPin === storedPin) {
            onSuccess();
          } else {
            setError(true);
            setPin('');
            setTimeout(() => setError(false), 1000);
          }
        }, 100);
      }
    }
  };

  const handleClear = () => {
    setPin('');
    setError(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-900 p-4 flex items-center justify-center">
      <div className="max-w-sm w-full">
        <button onClick={onBack} className="text-white/80 mb-6">← Back</button>
        <div className="bg-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">🔒 {title}</h2>
          <p className="text-gray-600 mb-6 text-sm">{subtitle}</p>

          {/* PIN Display */}
          <div className="flex justify-center gap-3 mb-6">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={`w-14 h-14 rounded-lg flex items-center justify-center text-2xl font-bold border-2 ${
                error ? 'bg-red-50 border-red-500 text-red-500' :
                pin.length > i
                  ? (pinType === 'admin' ? 'bg-orange-600 border-orange-600 text-white' : 'bg-purple-600 border-purple-600 text-white')
                  : 'bg-gray-100 border-gray-300 text-gray-400'
              }`}>
                {pin.length > i ? '●' : '○'}
              </div>
            ))}
          </div>

          {error && <p className="text-red-600 font-semibold mb-4">Incorrect PIN</p>}

          {/* Number Pad */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
                className="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-lg h-16 text-2xl font-bold text-gray-800"
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleClear}
              className="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-lg h-16 text-lg font-bold text-gray-600"
            >
              Clear
            </button>
            <button
              onClick={() => handleNumberClick('0')}
              className="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-lg h-16 text-2xl font-bold text-gray-800"
            >
              0
            </button>
            <div></div>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Forgot your PIN?
            <br/>Check Admin Settings to change it
          </p>
        </div>
      </div>
    </div>
  );
}

// Parent Dashboard component
function ParentDashboard({ gameData, onBack }) {
  const [dashboardSubject, setDashboardSubject] = useState('spelling');
  const [syncStatus, setSyncStatus] = useState('checking');
  const [freshData, setFreshData] = useState(gameData);
  const [lastSynced, setLastSynced] = useState(null);

  // Auto-pull latest data from cloud when dashboard opens
  useEffect(() => {
    const pullLatestData = async () => {
      const token = localStorage.getItem('github_token');
      if (!token) {
        setSyncStatus('no-token');
        setFreshData(gameData);
        return;
      }

      try {
        setSyncStatus('syncing');
        const res = await fetch('https://api.github.com/gists', { headers: { 'Authorization': `token ${token}` } });
        if (!res.ok) {
          setSyncStatus('error');
          setFreshData(gameData);
          return;
        }

        const gists = await res.json();
        const albaGists = gists.filter(g => g.files['alba-spelling-data.json']);
        if (albaGists.length === 0) {
          setSyncStatus('no-cloud');
          setFreshData(gameData);
          return;
        }

        // Get all gists with their coin data
        const gistDataPromises = albaGists.map(async (g) => {
          const r = await fetch(`https://api.github.com/gists/${g.id}`, { headers: { 'Authorization': `token ${token}` } });
          if (!r.ok) return null;
          const full = await r.json();
          const data = JSON.parse(full.files['alba-spelling-data.json'].content);
          const totalCoins = (data.spelling?.totalCoinsEarned || 0) + (data.maths?.totalCoinsEarned || 0) + (data.science?.totalCoinsEarned || 0);
          return { id: g.id, coins: totalCoins, data, updated: new Date(g.updated_at) };
        });
        const gistData = (await Promise.all(gistDataPromises)).filter(Boolean);

        // Pick the one with most coins (Alba's latest)
        const best = gistData.sort((a, b) => b.coins - a.coins)[0];

        setFreshData(best.data);
        setLastSynced(best.updated);
        setSyncStatus('synced');

        // Save to localStorage so other views see fresh data
        localStorage.setItem('alba_spelling_data', JSON.stringify(best.data));
        localStorage.setItem('gist_id', best.id);
      } catch (e) {
        console.error('Auto-sync error:', e);
        setSyncStatus('error');
        setFreshData(gameData);
      }
    };

    pullLatestData();
  }, []);

  // Calculate total coins across all subjects (use freshData instead of gameData)
  const coins = (freshData.spelling?.coins || 0) + (freshData.maths?.coins || 0) + (freshData.science?.coins || 0);
  const totalCoinsEarned = (freshData.spelling?.totalCoinsEarned || 0) + (freshData.maths?.totalCoinsEarned || 0) + (freshData.science?.totalCoinsEarned || 0);

  // Get data for current dashboard subject (use freshData)
  const subjectData = freshData[dashboardSubject] || {};
  const testHistory = subjectData.testHistory || [];
  const wordStats = subjectData.wordStats || subjectData.questionStats || {};
  const { streak, bestStreak, earnedBadges } = freshData;

  // Calculate problem items (< 50% success rate, min 2 attempts)
  // Works for spelling (words), maths (questions), and science (questions)
  const sourceList = dashboardSubject === 'maths' ? mathsQuestions : dashboardSubject === 'science' ? scienceQuestions : allWords;
  const itemLabel = (dashboardSubject === 'maths' || dashboardSubject === 'science') ? 'question' : 'word';

  const problemWords = Object.entries(wordStats)
    .map(([itemId, stats]) => {
      let item = sourceList.find(w => w.id === parseInt(itemId));
      // If item not found (old data), create placeholder
      if (!item) {
        item = {
          id: itemId,
          word: (dashboardSubject === 'maths' || dashboardSubject === 'science') ? `Question #${itemId}` : `Word #${itemId}`,
          question: (dashboardSubject === 'maths' || dashboardSubject === 'science') ? `Question #${itemId}` : undefined,
          category: 'unknown',
          topic: 'unknown',
          difficulty: 'medium'
        };
      }
      const successRate = stats.attempts > 0 ? Math.round((stats.correct / stats.attempts) * 100) : 0;
      return { word: item, stats, successRate };
    })
    .filter(w => w.stats.attempts >= 2 && w.successRate < 50)
    .sort((a, b) => a.successRate - b.successRate);

  // Items that need practice (< 75% success rate)
  const needsPractice = Object.entries(wordStats)
    .map(([itemId, stats]) => {
      let item = sourceList.find(w => w.id === parseInt(itemId));
      if (!item) {
        item = {
          id: itemId,
          word: (dashboardSubject === 'maths' || dashboardSubject === 'science') ? `Question #${itemId}` : `Word #${itemId}`,
          question: (dashboardSubject === 'maths' || dashboardSubject === 'science') ? `Question #${itemId}` : undefined,
          category: 'unknown',
          topic: 'unknown',
          difficulty: 'medium'
        };
      }
      const successRate = stats.attempts > 0 ? Math.round((stats.correct / stats.attempts) * 100) : 0;
      return { word: item, stats, successRate };
    })
    .filter(w => w.stats.attempts >= 2 && w.successRate >= 50 && w.successRate < 75)
    .sort((a, b) => a.successRate - b.successRate);

  // Weekly stats
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const recentTests = testHistory.filter(t => new Date(t.date) >= weekAgo);
  const weeklyTests = recentTests.length;
  const weeklyCorrect = recentTests.reduce((sum, t) => sum + t.score, 0);
  const weeklyTotal = recentTests.reduce((sum, t) => sum + t.total, 0);
  const weeklyAccuracy = weeklyTotal > 0 ? Math.round((weeklyCorrect / weeklyTotal) * 100) : 0;

  // Category performance
  const catData = {};
  testHistory.forEach(test => {
    test.words?.forEach(w => {
      if (!catData[w.category]) catData[w.category] = { correct: 0, total: 0 };
      catData[w.category].total++;
      if (w.correct) catData[w.category].correct++;
    });
  });
  const categoryStats = Object.entries(catData).map(([cat, data]) => ({
    category: cat,
    name: dashboardSubject === 'maths'
      ? (mathsCategories.find(c => c.id === cat)?.name || cat)
      : dashboardSubject === 'science'
      ? (scienceCategories.find(c => c.id === cat)?.name || cat)
      : (categoryNames[cat] || cat),
    pct: Math.round((data.correct / data.total) * 100),
    correct: data.correct,
    total: data.total
  })).sort((a, b) => a.pct - b.pct);

  // TIMING ANALYSIS (Hidden timers - confidence indicators)
  const testsWithTiming = testHistory.filter(t => t.duration && t.wordTimings);
  const avgTestDuration = testsWithTiming.length > 0
    ? Math.round(testsWithTiming.reduce((sum, t) => sum + t.duration, 0) / testsWithTiming.length)
    : 0;

  // Calculate per-word timing stats
  const allWordTimings = testsWithTiming.flatMap(t => t.wordTimings || []);
  const avgWordTime = allWordTimings.length > 0
    ? Math.round(allWordTimings.reduce((sum, wt) => sum + wt.timeSpent, 0) / allWordTimings.length)
    : 0;

  // Find slowest words (struggle indicators)
  const wordTimingStats = {};
  allWordTimings.forEach(wt => {
    if (!wordTimingStats[wt.wordId]) {
      wordTimingStats[wt.wordId] = { word: wt.word, times: [], correct: 0, total: 0 };
    }
    wordTimingStats[wt.wordId].times.push(wt.timeSpent);
    wordTimingStats[wt.wordId].total++;
    if (wt.correct) wordTimingStats[wt.wordId].correct++;
  });

  const slowestWords = Object.values(wordTimingStats)
    .map(ws => ({
      word: ws.word,
      avgTime: Math.round(ws.times.reduce((a, b) => a + b, 0) / ws.times.length),
      accuracy: Math.round((ws.correct / ws.total) * 100),
      attempts: ws.total
    }))
    .sort((a, b) => b.avgTime - a.avgTime)
    .slice(0, 10);

  const fastestWords = Object.values(wordTimingStats)
    .filter(ws => ws.correct === ws.total && ws.total >= 2) // Only 100% correct with 2+ attempts
    .map(ws => ({
      word: ws.word,
      avgTime: Math.round(ws.times.reduce((a, b) => a + b, 0) / ws.times.length),
      accuracy: 100,
      attempts: ws.total
    }))
    .sort((a, b) => a.avgTime - b.avgTime)
    .slice(0, 10);

  // Check if there's any data mismatch (old word IDs)
  const hasMismatchedData = Object.keys(wordStats).some(wordId => {
    return !allWords.find(w => w.id === parseInt(wordId));
  });

  const clearAllData = () => {
    if (confirm('This will delete ALL progress data (tests, coins, badges). Are you sure?')) {
      localStorage.removeItem('alba_spelling_data');
      alert('All data cleared. Refresh the page.');
      window.location.reload();
    }
  };

  // Export data as CSV
  const exportData = () => {
    const itemType = (dashboardSubject === 'maths' || dashboardSubject === 'science') ? 'Question' : 'Word';
    let csv = 'Test Date,Score,Total,Accuracy\n';
    testHistory.forEach(t => {
      csv += `${t.date},${t.score},${t.total},${Math.round((t.score/t.total)*100)}%\n`;
    });
    csv += `\n\n${itemType},${(dashboardSubject === 'maths' || dashboardSubject === 'science') ? 'Topic' : 'Category'},Attempts,Correct,Success Rate\n`;
    Object.entries(wordStats).forEach(([itemId, stats]) => {
      const item = sourceList.find(w => w.id === parseInt(itemId));
      if (item) {
        const rate = Math.round((stats.correct / stats.attempts) * 100);
        const displayText = (dashboardSubject === 'maths' || dashboardSubject === 'science') ? item.question : item.word;
        const categoryText = (dashboardSubject === 'maths' || dashboardSubject === 'science') ? item.topic : item.category;
        csv += `${displayText},${categoryText},${stats.attempts},${stats.correct},${rate}%\n`;
      }
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alba-${dashboardSubject}-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-700 p-4">
      <div className="max-w-2xl mx-auto">
        <button onClick={onBack} className="text-white/80 mb-4">← Back</button>
        <h1 className="text-3xl font-bold text-white text-center mb-2">📊 Parent Dashboard</h1>

        {/* Sync Status Indicator */}
        <div className="text-center mb-4">
          {syncStatus === 'syncing' && (
            <div className="inline-flex items-center gap-2 bg-blue-500/30 backdrop-blur px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-semibold">Syncing latest data...</span>
            </div>
          )}
          {syncStatus === 'synced' && lastSynced && (
            <div className="inline-flex items-center gap-2 bg-green-500/30 backdrop-blur px-4 py-2 rounded-full">
              <span className="text-green-300 text-sm">✓</span>
              <span className="text-white text-sm font-semibold">
                Synced {(() => {
                  const mins = Math.floor((Date.now() - lastSynced.getTime()) / 60000);
                  if (mins < 1) return 'just now';
                  if (mins === 1) return '1 min ago';
                  if (mins < 60) return `${mins} mins ago`;
                  const hours = Math.floor(mins / 60);
                  return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
                })()}
              </span>
            </div>
          )}
          {syncStatus === 'error' && (
            <div className="inline-flex items-center gap-2 bg-red-500/30 backdrop-blur px-4 py-2 rounded-full">
              <span className="text-red-300 text-sm">⚠️</span>
              <span className="text-white text-sm font-semibold">Sync failed - showing cached data</span>
            </div>
          )}
          {syncStatus === 'no-token' && (
            <div className="inline-flex items-center gap-2 bg-yellow-500/30 backdrop-blur px-4 py-2 rounded-full">
              <span className="text-yellow-300 text-sm">⚠️</span>
              <span className="text-white text-sm font-semibold">Cloud sync disabled - showing local data</span>
            </div>
          )}
        </div>

        {/* Subject Tabs */}
        <div className="flex gap-2 mb-6 justify-center">
          <button
            onClick={() => setDashboardSubject('spelling')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              dashboardSubject === 'spelling'
                ? 'bg-white text-purple-600'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            📚 Spelling
          </button>
          <button
            onClick={() => setDashboardSubject('maths')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              dashboardSubject === 'maths'
                ? 'bg-white text-purple-600'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            🔢 Maths
          </button>
          <button
            onClick={() => setDashboardSubject('science')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              dashboardSubject === 'science'
                ? 'bg-white text-purple-600'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            disabled={true}
          >
            🔬 Science
          </button>
        </div>

        {/* Data Mismatch Warning */}
        {hasMismatchedData && (
          <div className="bg-yellow-100 border-2 border-yellow-500 rounded-2xl p-6 mb-4">
            <h2 className="text-xl font-bold text-yellow-800 mb-2">⚠️ Old Data Detected</h2>
            <p className="text-yellow-700 mb-4">
              Some word IDs from previous tests don't match the new word list.
              Stats will show as "Word #XX". You can continue using the app,
              or clear all data to start fresh.
            </p>
            <button
              onClick={clearAllData}
              className="w-full py-3 rounded-lg font-bold text-white bg-red-600 active:scale-98"
            >
              🗑️ Clear All Data & Start Fresh
            </button>
          </div>
        )}

        {/* Performance vs Benchmarks */}
        {testHistory.length > 0 && (() => {
          const totalWords = Object.keys(wordStats).length;
          const masteredWords = Object.values(wordStats).filter(s => (s.consecutiveCorrect || 0) >= 5).length;
          const overallAccuracy = testHistory.length > 0
            ? Math.round((testHistory.reduce((sum, t) => sum + t.score, 0) / testHistory.reduce((sum, t) => sum + t.total, 0)) * 100)
            : 0;

          // Year 5 (10-year-old) benchmarks
          const benchmarks = {
            accuracy: 70, // 70%+ expected
            weeklyTests: 2, // 2+ tests per week
            masteredWords: 80, // 80+ words mastered
            categoryMin: 70 // 70%+ in each category
          };

          const accuracyStatus = overallAccuracy >= benchmarks.accuracy ? 'on-track' : overallAccuracy >= benchmarks.accuracy - 10 ? 'needs-work' : 'behind';
          const testFreqStatus = weeklyTests >= benchmarks.weeklyTests ? 'on-track' : weeklyTests >= 1 ? 'needs-work' : 'behind';
          const masteryStatus = masteredWords >= benchmarks.masteredWords ? 'on-track' : masteredWords >= benchmarks.masteredWords * 0.7 ? 'needs-work' : 'behind';

          const weakCategories = categoryStats.filter(c => c.pct < benchmarks.categoryMin);
          const overallStatus = (accuracyStatus === 'on-track' && testFreqStatus === 'on-track' && masteryStatus === 'on-track') ? 'on-track'
            : (accuracyStatus === 'behind' || masteryStatus === 'behind') ? 'behind' : 'needs-work';

          const statusConfig = {
            'on-track': { icon: '✅', color: 'green', label: 'On Track', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-500' },
            'needs-work': { icon: '⚠️', color: 'yellow', label: 'Needs Work', bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-500' },
            'behind': { icon: '🚨', color: 'red', label: 'Behind', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-500' }
          };

          const status = statusConfig[overallStatus];

          return (
            <div className={`rounded-2xl p-6 mb-4 border-2 ${status.bg} ${status.border}`}>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{status.icon} Progress vs. Average 10-Year-Old</h2>
              <p className={`font-bold mb-4 ${status.text}`}>Overall Status: {status.label}</p>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Accuracy: {overallAccuracy}%</span>
                  <span className={`font-bold ${statusConfig[accuracyStatus].text}`}>
                    {accuracyStatus === 'on-track' ? '✅ Great!' : accuracyStatus === 'needs-work' ? '⚠️ Keep practicing' : '🚨 Needs focus'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Practice frequency: {weeklyTests} tests/week</span>
                  <span className={`font-bold ${statusConfig[testFreqStatus].text}`}>
                    {testFreqStatus === 'on-track' ? '✅ Excellent!' : testFreqStatus === 'needs-work' ? '⚠️ Try 2-3/week' : '🚨 More practice needed'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">{(dashboardSubject === 'maths' || dashboardSubject === 'science') ? 'Questions' : 'Words'} mastered: {masteredWords}/{totalWords}</span>
                  <span className={`font-bold ${statusConfig[masteryStatus].text}`}>
                    {masteryStatus === 'on-track' ? '✅ Brilliant!' : masteryStatus === 'needs-work' ? '⚠️ Good progress' : '🚨 Keep going'}
                  </span>
                </div>
              </div>

              {weakCategories.length > 0 && (
                <div className="bg-white rounded-lg p-4 mt-4">
                  <p className="font-bold text-gray-800 mb-2">📚 Focus Areas:</p>
                  <ul className="space-y-1">
                    {weakCategories.slice(0, 3).map((cat, i) => (
                      <li key={i} className="text-sm text-gray-700">• {cat.name} ({cat.pct}% - needs to reach 70%+)</li>
                    ))}
                  </ul>
                </div>
              )}

              {overallStatus === 'on-track' && (
                <p className="text-green-700 font-semibold mt-4">🌟 Alba is performing at or above expected levels for her age!</p>
              )}
              {overallStatus === 'needs-work' && (
                <p className="text-yellow-700 font-semibold mt-4">💪 With a bit more practice, Alba will be right on track!</p>
              )}
              {overallStatus === 'behind' && (
                <p className="text-red-700 font-semibold mt-4">📖 More regular practice will help Alba catch up. Try 2-3 tests per week focusing on weak categories.</p>
              )}
            </div>
          );
        })()}

        {/* Weekly Summary */}
        <div className="bg-white rounded-2xl p-6 mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📅 This Week</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-purple-600">{weeklyTests}</p>
              <p className="text-gray-600 text-sm">Tests Taken</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">{weeklyAccuracy}%</p>
              <p className="text-gray-600 text-sm">Accuracy</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">{recentTests.reduce((sum, t) => {
                const pct = (t.score / t.total) * 100;
                return sum + t.words.filter(w => w.correct).length * 2 + (pct === 100 ? 50 : pct >= 80 ? 25 : pct >= 60 ? 10 : 5);
              }, 0)}</p>
              <p className="text-gray-600 text-sm">Coins Earned</p>
            </div>
          </div>
        </div>

        {/* Problem Words */}
        {problemWords.length > 0 && (
          <div className="bg-white rounded-2xl p-6 mb-4">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              🚨 Problem {(dashboardSubject === 'maths' || dashboardSubject === 'science') ? 'Questions' : 'Words'} ({"<"}50%)
            </h2>
            <div className="space-y-2">
              {problemWords.slice(0, 10).map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-bold text-gray-800">
                      {(dashboardSubject === 'maths' || dashboardSubject === 'science') ? item.word.question : item.word.word}
                    </p>
                    <p className="text-xs text-gray-500">{item.stats.attempts} attempts • {item.stats.correct} correct</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">{item.successRate}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Needs Practice */}
        {needsPractice.length > 0 && (
          <div className="bg-white rounded-2xl p-6 mb-4">
            <h2 className="text-xl font-bold text-yellow-600 mb-4">⚠️ Needs Practice (50-75%)</h2>
            <div className="space-y-2">
              {needsPractice.slice(0, 10).map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-bold text-gray-800">
                      {(dashboardSubject === 'maths' || dashboardSubject === 'science') ? item.word.question : item.word.word}
                    </p>
                    <p className="text-xs text-gray-500">{item.stats.attempts} attempts • {item.stats.correct} correct</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-yellow-600">{item.successRate}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Performance */}
        {categoryStats.length > 0 && (
          <div className="bg-white rounded-2xl p-6 mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📚 Category Performance</h2>
            <div className="space-y-3">
              {categoryStats.map((cat, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-700">{cat.name}</span>
                    <span className={`font-bold ${cat.pct < 50 ? 'text-red-600' : cat.pct < 75 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {cat.pct}% ({cat.correct}/{cat.total})
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${cat.pct < 50 ? 'bg-red-500' : cat.pct < 75 ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Coins & Streaks */}
        <div className="bg-white rounded-2xl p-6 mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">💰 Coins & Streaks ({dashboardSubject === 'maths' ? 'Maths' : dashboardSubject === 'spelling' ? 'Spelling' : 'Science'})</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-3xl font-bold text-yellow-600">{subjectData.coins || 0}</p>
              <p className="text-gray-600 text-sm">Current Coins</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">{subjectData.totalCoinsEarned || 0}</p>
              <p className="text-gray-600 text-sm">Total Earned</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-3xl font-bold text-orange-600">{streak}🔥</p>
              <p className="text-gray-600 text-sm">Current Streak</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">{bestStreak}</p>
              <p className="text-gray-600 text-sm">Best Streak</p>
            </div>
          </div>
        </div>

        {/* Weekly Target */}
        <div className="bg-white rounded-2xl p-6 mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 Weekly Target</h2>
          <div className="bg-gray-200 rounded-full h-6 mb-2">
            <div
              className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full h-6 transition-all flex items-center justify-end pr-2"
              style={{ width: `${Math.min(100, Math.round((recentTests.reduce((sum, t) => sum + t.words.filter(w => w.correct).length * 2, 0) / 250) * 100))}%` }}
            >
              <span className="text-white text-xs font-bold">
                {Math.min(100, Math.round((recentTests.reduce((sum, t) => sum + t.words.filter(w => w.correct).length * 2, 0) / 250) * 100))}%
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-sm text-center">
            {recentTests.reduce((sum, t) => sum + t.words.filter(w => w.correct).length * 2, 0)} / 250 coins this week
          </p>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-2xl p-6 mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🏆 Badges ({earnedBadges.length}/{badges.length})</h2>
          <div className="grid grid-cols-4 gap-3">
            {badges.map(b => {
              const earned = earnedBadges.includes(b.id);
              return (
                <div key={b.id} className={`text-center p-3 bg-gray-50 rounded-lg ${!earned && 'opacity-30 grayscale'}`}>
                  <span className="text-3xl">{b.icon}</span>
                  <p className="text-xs font-bold mt-1 text-gray-700">{b.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Overall Stats */}
        <div className="bg-white rounded-2xl p-6 mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📈 All Time Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">{testHistory.length}</p>
              <p className="text-gray-600 text-sm">Total Tests</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">{Object.keys(wordStats).length}</p>
              <p className="text-gray-600 text-sm">Words Attempted</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">
                {Math.round((testHistory.reduce((sum, t) => sum + t.score, 0) / testHistory.reduce((sum, t) => sum + t.total, 0)) * 100) || 0}%
              </p>
              <p className="text-gray-600 text-sm">Overall Accuracy</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">
                {testHistory.length > 0 ? Math.round(testHistory.reduce((sum, t) => sum + t.score, 0) / testHistory.length) : 0}
              </p>
              <p className="text-gray-600 text-sm">Avg Per Test</p>
            </div>
          </div>
        </div>

        {/* Timing Insights (Hidden Timers - Confidence Indicators) */}
        {testsWithTiming.length > 0 && (
          <div className="bg-white rounded-2xl p-6 mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">⏱️ Timing Insights (Confidence)</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">{avgTestDuration}s</p>
                <p className="text-gray-600 text-sm">Avg Test Duration</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">{avgWordTime}s</p>
                <p className="text-gray-600 text-sm">
                  Avg {dashboardSubject === 'spelling' ? 'Word' : 'Question'} Time
                </p>
              </div>
            </div>

            {/* Slowest Words (Struggle Indicators) */}
            {slowestWords.length > 0 && (
              <div className="mb-4">
                <h3 className="font-bold text-gray-700 mb-2">
                  🐌 Slowest {dashboardSubject === 'spelling' ? 'Words' : 'Questions'} (Struggling)
                </h3>
                <div className="bg-red-50 rounded-lg p-3 space-y-2">
                  {slowestWords.slice(0, 5).map((w, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-gray-800">{w.word}</span>
                      <div className="flex gap-3 text-gray-600">
                        <span>{w.avgTime}s</span>
                        <span className={w.accuracy < 50 ? 'text-red-600' : 'text-yellow-600'}>
                          {w.accuracy}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">💡 Slower times = less confidence. Focus practice here!</p>
              </div>
            )}

            {/* Fastest Words (Confident) */}
            {fastestWords.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-700 mb-2">
                  ⚡ Fastest {dashboardSubject === 'spelling' ? 'Words' : 'Questions'} (Confident)
                </h3>
                <div className="bg-green-50 rounded-lg p-3 space-y-2">
                  {fastestWords.slice(0, 5).map((w, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-gray-800">{w.word}</span>
                      <div className="flex gap-3 text-gray-600">
                        <span>{w.avgTime}s</span>
                        <span className="text-green-600">100%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">✅ Fast + correct = mastered!</p>
              </div>
            )}
          </div>
        )}

        {/* Export Button */}
        <button
          onClick={exportData}
          className="w-full py-4 rounded-lg font-bold text-white bg-green-600 active:scale-98 mb-4"
        >
          📥 Export Data (CSV)
        </button>
      </div>
    </div>
  );
}
