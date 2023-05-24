export const getRandomCard = (flashcardsArray, excludedNumber) => {
  let index;
  do{
    index = Math.floor(Math.random() * (flashcardsArray.length))
   
  }while(index === excludedNumber)
 
  return flashcardsArray[index]
}
export const getWrongAnswers = (flashcardsArray, excludedCardIndex) =>{
  const randomCard1 = getRandomCard(flashcardsArray, excludedCardIndex)
  const randomCard2 = getRandomCard(flashcardsArray, excludedCardIndex)
  const randomCard3 = getRandomCard(flashcardsArray, excludedCardIndex)

  if(randomCard1.front === randomCard2.front || randomCard2.front === randomCard3.front || randomCard1.front === randomCard3.front){
    return getWrongAnswers(flashcardsArray, excludedCardIndex)
  }
  return [randomCard1, randomCard2, randomCard3]
}
export const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
  }
  return shuffledArray;
}