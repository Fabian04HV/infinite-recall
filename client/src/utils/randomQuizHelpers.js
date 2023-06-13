import { getCollectionAnswerHistory } from "./statisticHelpers";

export const getRandomCard = (flashcardsArray, excludedNumber) => {
  let index;
  do{
    index = Math.floor(Math.random() * (flashcardsArray.length))
   
  }while(index === excludedNumber)
 
  return flashcardsArray[index]
}
export const getWrongAnswers = (flashcardsArray, excludedCardIndex) => {
  const wrongAnswers = [];
  const excludedCard = flashcardsArray[excludedCardIndex];

  // Get unique back sides from the flashcards array
  const uniqueBackSides = [...new Set(flashcardsArray.map(card => card.back))];

  // Check if there are enough unique back sides for wrong answers
  if (uniqueBackSides.length <= 1) {
    return [];
  }

  while (wrongAnswers.length < Math.min(3, uniqueBackSides.length - 1)) {
    const randomCard = getRandomCard(flashcardsArray, excludedCardIndex);

    // Check if the random card has a different back side from the excluded card
    // and it is not already in the wrong answers array
    if (randomCard.back !== excludedCard.back && !wrongAnswers.includes(randomCard)) {
      wrongAnswers.push(randomCard);
    }
  }

  return wrongAnswers;
};
export const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
  }
  return shuffledArray;
}
export const getRound = (collection, collectionId, cards_per_round) => {

  const MAX_CARDS_PER_ROUND = cards_per_round
  const WRONG_CARDS_PER_ROUND = 5
  

  return getCollectionAnswerHistory(collectionId).then((answerHistory) => {
    if(!answerHistory) return collection.flashcards.slice(0, cards_per_round)

    const flashcardsWithSum = collection.flashcards.map((flashcard, index) => {
      const flashcardHistory = answerHistory.flashcardHistory.find(
        (history) => history.flashcard.toString() === flashcard._id
      );
      const lastThreeValues = flashcardHistory?.history.slice(-3);
      const sum = lastThreeValues?.filter((value) => value === true).length;
      return { index, sum };
    });

    flashcardsWithSum.sort((a, b) => (a.sum || 0) - (b.sum || 0));

    const selectedFlashcards = flashcardsWithSum.slice(0, WRONG_CARDS_PER_ROUND);
    const flashcards = selectedFlashcards.map((item) => collection.flashcards[item.index]);

    while(flashcards.length < MAX_CARDS_PER_ROUND){
      const randomIndex = Math.floor(Math.random() * collection.flashcards.length)
      const randomCard = collection.flashcards[randomIndex]
      flashcards.push(randomCard)
    }
    return flashcards;
  });
};