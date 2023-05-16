const express = require('express');
const router = express.Router();
const openai = require('openai-api');

const OPENAI_API_KEY = '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';
const openaiClient = new openai(OPENAI_API_KEY);  

router.post('/notes/convert-to-flashcards', async (req, res) => {
  const { notes, numberOfFlashcards } = req.body;

  // Make the ChatGPT request using 'notes' and 'numberOfFlashcards' to get an array of flashcard objects
  const prompt = `Create ${numberOfFlashcards} flashcards for the following content: ${notes}`;
  const response = await openaiClient.complete({
    engine: 'davinci',
    prompt,
    maxTokens: 150,
    n: 1,
    stop: null,
    temperature: 0.5
  });
  const flashcardsText = response.data.choices[0].text;
  // Process the flashcardsText to create an array of flashcard objects
  const flashcards = [];

  res.json({ flashcards });
});

module.exports = router;