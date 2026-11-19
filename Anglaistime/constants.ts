import { Lesson, Song } from './types';

export const LESSONS: Lesson[] = [
  {
    id: 'greetings',
    title: 'Salutations',
    icon: '👋',
    color: 'bg-kid-blue',
    vocab: [
      { word: 'Hello', translation: 'Bonjour', emoji: '👋' },
      { word: 'Hi', translation: 'Salut', emoji: '👋' },
      { word: 'Goodbye', translation: 'Au revoir', emoji: '👋' },
      { word: 'Thank you', translation: 'Merci', emoji: '🙏' },
      { word: 'How are you?', translation: 'Comment ça va ?', emoji: '❓' },
      { word: 'I am happy', translation: 'Je suis content', emoji: '😊' },
    ]
  },
  {
    id: 'colors',
    title: 'Les Couleurs',
    icon: '🎨',
    color: 'bg-kid-pink',
    vocab: [
      { word: 'Red', translation: 'Rouge', emoji: '🔴' },
      { word: 'Blue', translation: 'Bleu', emoji: '🔵' },
      { word: 'Yellow', translation: 'Jaune', emoji: '🟡' },
      { word: 'Green', translation: 'Vert', emoji: '🟢' },
      { word: 'Black', translation: 'Noir', emoji: '⚫' },
      { word: 'White', translation: 'Blanc', emoji: '⚪' },
    ]
  },
  {
    id: 'numbers',
    title: 'Les Chiffres',
    icon: '1️⃣',
    color: 'bg-kid-purple',
    vocab: [
      { word: 'One', translation: 'Un', emoji: '1️⃣' },
      { word: 'Two', translation: 'Deux', emoji: '2️⃣' },
      { word: 'Three', translation: 'Trois', emoji: '3️⃣' },
      { word: 'Four', translation: 'Quatre', emoji: '4️⃣' },
      { word: 'Five', translation: 'Cinq', emoji: '5️⃣' },
      { word: 'Six', translation: 'Six', emoji: '6️⃣' },
      { word: 'Seven', translation: 'Sept', emoji: '7️⃣' },
      { word: 'Eight', translation: 'Huit', emoji: '8️⃣' },
      { word: 'Nine', translation: 'Neuf', emoji: '9️⃣' },
      { word: 'Ten', translation: 'Dix', emoji: '🔟' },
    ]
  },
  {
    id: 'animals',
    title: 'Les Animaux',
    icon: '🦁',
    color: 'bg-kid-green',
    vocab: [
      { word: 'Dog', translation: 'Chien', emoji: '🐶' },
      { word: 'Cat', translation: 'Chat', emoji: '🐱' },
      { word: 'Bird', translation: 'Oiseau', emoji: '🐦' },
      { word: 'Fish', translation: 'Poisson', emoji: '🐟' },
      { word: 'Cow', translation: 'Vache', emoji: '🐮' },
      { word: 'Pig', translation: 'Cochon', emoji: '🐷' },
    ]
  },
  {
    id: 'food_objects',
    title: 'Miam !',
    icon: '🍎',
    color: 'bg-orange-400',
    vocab: [
      { word: 'Apple', translation: 'Pomme', emoji: '🍎' },
      { word: 'Banana', translation: 'Banane', emoji: '🍌' },
      { word: 'Milk', translation: 'Lait', emoji: '🥛' },
      { word: 'Water', translation: 'Eau', emoji: '💧' },
      { word: 'Ball', translation: 'Balle', emoji: '⚽' },
      { word: 'Car', translation: 'Voiture', emoji: '🚗' },
    ]
  },
  {
    id: 'body',
    title: 'Mon Corps',
    icon: '👃',
    color: 'bg-red-400',
    vocab: [
      { word: 'Head', translation: 'Tête', emoji: '🧒' },
      { word: 'Eyes', translation: 'Yeux', emoji: '👀' },
      { word: 'Nose', translation: 'Nez', emoji: '👃' },
      { word: 'Mouth', translation: 'Bouche', emoji: '👄' },
      { word: 'Hands', translation: 'Mains', emoji: '👐' },
      { word: 'Feet', translation: 'Pieds', emoji: '🦶' },
    ]
  },
];

export const SONGS: Song[] = [
  { id: '1', title: 'Old MacDonald', duration: '2:30', color: 'bg-kid-yellow' },
  { id: '2', title: 'Twinkle Twinkle', duration: '1:45', color: 'bg-kid-blue' },
  { id: '3', title: 'ABC Song', duration: '2:00', color: 'bg-kid-pink' },
];

export const AI_SYSTEM_INSTRUCTION = `
# ROLE: Bumble
You are "Bumble", a friendly, yellow, magical learning mascot for a 3-year-old French child.
Your voice is warm, soft, enthusiastic, and extremely patient.
**You are effectively BILINGUAL**, bridging the gap between French and English.

# OBJECTIVE
Teach basic English vocabulary to a French child. The child does not speak English yet.
You must use French for instructions and comfort, and English for the learning targets.

# LANGUAGE RULES (FR1, FR2, FR3)
1. **Instruction Language (French)**: Use simple French for setup, navigation, and explaining games.
   - Example: "Bonjour ! On va jouer avec les couleurs." (Hello! Let's play with colors.)
2. **Target Language (English)**: The specific words we are learning must be spoken clearly in English.
   - Example: "Regarde la pomme ! In English, we say: Apple."
3. **Feedback Language (Mixed)**:
   - If the child succeeds: Celebration in English ("Wow! Amazing!").
   - If the child struggles: Encouragement in French ("Bravo pour l'effort ! Essaie encore : Red.").

# TECHNICAL BEHAVIOR (ASR & NLP - BILINGUAL TOLERANCE)

## 1. SPEECH SPEED & CLARITY
- Speak SLOWER than normal.
- Articulate English words very clearly.

## 2. CONCEPT VALIDATION (ASR/NLP LOGIC)
- **Scenario**: I ask "What color is this?" and the child says "Rouge" (French for Red).
- **Reaction**: This is a CONCEPTUAL SUCCESS, but a LANGUAGE ERROR.
- **Do NOT**: Say "No" or "Wrong".
- **DO**: Validate the concept in French, then prompt for English.
- **Response**: "Oui, c'est Rouge ! Bravo ! En anglais, on dit : Red. Can you say Red?"

## 3. SPECIAL TRIGGERS (FR4)
- If the child says "Musique" or "Chanson": Sing a short nursery rhyme in English.
- If the child says "Jeu" or "Jouer": Start a simple guessing game.
- If the child says "Je ne sais pas": Say "C'est pas grave ! Répète après moi..."

# INTERACTION STRATEGY
1. **Initiation**: "Bonjour ! Je suis Bumble. On apprend l'anglais ?"
2. **Teaching**: Show the link. "Chien... is Dog."
3. **Loop**: "Can you say Dog?" -> Wait -> Feedback.
4. **End**: "Au revoir ! See you soon!"
`;
