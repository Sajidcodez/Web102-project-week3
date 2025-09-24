import React, { useState, useEffect } from 'react';
import FlashCard from './FlashCard';
import cardData from './data/cardData';
import './CardContainer.css';

const CardContainer = () => {
  const [cards, setCards] = useState(cardData);
      const [currentCardIndex, setCurrentCardIndex] = useState(0);
       const [isFlipped, setIsFlipped] = useState(false);
  const [isSequential, setIsSequential] = useState(true);
  
  const [userGuess, setUserGuess] = useState('');
   const [feedbackMsg, setFeedbackMsg] = useState('');
  const [feedbackClass, setFeedbackClass] = useState('');
  
  const [currentStreak, setCurrentStreak] = useState(0);
     const [longestStreak, setLongestStreak] = useState(0);
  
  const [masteredCards, setMasteredCards] = useState([]);

  const currentCard = cards[currentCardIndex];
  
     useEffect(() => {
    if (currentStreak > longestStreak) {
      setLongestStreak(currentStreak);
          }}, [currentStreak]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
          };

        const handleNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      resetCardState();
    } };
  
  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
         resetCardState();
    }};
  
  const handleRandomCard = () => {
    resetCardState();
    
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * cards.length);
    } while (newIndex === currentCardIndex && cards.length > 1);
    
    setCurrentCardIndex(newIndex);
  };
  
  const handleShuffleCards = () => {
    setIsSequential(false);
    const shuffled = [...cards];
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    setCards(shuffled);
    setCurrentCardIndex(0);
    resetCardState();
  };
  
  const handleSequentialOrder = () => {
    if (!isSequential) {
      setIsSequential(true);
           setCards([...cardData]);
         setCurrentCardIndex(0);
      resetCardState();
    }};
  
  const checkAnswer = () => {
    if (!userGuess.trim()) return;
    
    const normalizedGuess = userGuess.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    const normalizedAnswer = currentCard.answer.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    
    const isCorrect = normalizedAnswer.includes(normalizedGuess) || 
                      normalizedGuess.includes(normalizedAnswer);
    
    if (isCorrect) {
      setFeedbackMsg("Correct!");
            setFeedbackClass("correct");
      setCurrentStreak(currentStreak + 1);
    } else {
      setFeedbackMsg("Try again!");
            setFeedbackClass("incorrect");
      setCurrentStreak(0);
    }
    
    setIsFlipped(true);
  };
  
  const handleMasterCard = () => {
    setMasteredCards([...masteredCards, currentCard]);
    
    const updatedCards = cards.filter((_, index) => index !== currentCardIndex);
    
    if (updatedCards.length === 0) {
      setCards(cardData);
      setMasteredCards([]);
            setFeedbackMsg("All cards mastered! Starting over.");
      return;
    }
    
    setCards(updatedCards);
    
    if (currentCardIndex >= updatedCards.length) {
      setCurrentCardIndex(updatedCards.length - 1);
    }
    
    resetCardState();
  };
  
  const resetCardState = () => {
    setIsFlipped(false);
         setUserGuess('');
    setFeedbackMsg('');
    setFeedbackClass('');
  };

  return (
    <div className="cardContainer">
      <div className="cardInfo">
        <div className="cardMoreInfo">
    <h2>NBA History Trivia</h2>
       <p className="cardWord">
            Learn about all the NBA teams and players to ever participate in NBA history!
          </p>
          <p className="countCard">Total cards: {cards.length} (Mastered: {masteredCards.length})</p>
          
          <div className="streakContainer">
            <span className="streakCounter">Current streak: {currentStreak}</span>
            <span className="streakCounter">Best streak: {longestStreak}</span>
          </div> </div>
        
        <div className="cardLevel">
          <span className={`difficulty ${currentCard.difficulty.toLowerCase()}`}>
            {currentCard.difficulty}
          </span> </div>  </div>
      
      {!isFlipped && (
        <div className="guessContainer">
          <input
            type="text"
            placeholder="Type your answer here..."
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            className="guessInput"
          />
          <button onClick={checkAnswer} className="submitBtn">
            Submit
          </button></div>
      )}
      
      {feedbackMsg && (
        <div className={`feedback ${feedbackClass}`}>
          {feedbackMsg}
        </div> )}
      
      <FlashCard 
        question={currentCard.question}
        answer={currentCard.answer}
        image={currentCard.image}
        difficulty={currentCard.difficulty}
        isFlipped={isFlipped}
        onFlip={handleFlip}
      />
      
           <div className="controlCard">
        <button 
          className={`navBtn prevBtn ${currentCardIndex === 0 ? 'disabled' : ''}`} 
          onClick={handlePrevCard}
          disabled={currentCardIndex === 0}
        >
          Previous
        </button>
        
        <button 
          className="masterBtn"
          onClick={handleMasterCard}
        >
          Mark as Mastered
              </button>
        
        <button 
          className={`navBtn nextBtn ${currentCardIndex === cards.length - 1 ? 'disabled' : ''}`} 
          onClick={handleNextCard}
          disabled={currentCardIndex === cards.length - 1}
        >
          Next
        </button>  </div>
      
      <div className="shuffleControls">
        <button 
          className={`shuffleBtn ${isSequential ? '' : 'active'}`}
          onClick={handleShuffleCards}
        >
          Shuffle Cards
        </button> <button 
          className={`shuffleBtn ${isSequential ? 'active' : ''}`}
          onClick={handleSequentialOrder}  >
          Sequential Order
        </button>  </div></div>);};

export default CardContainer;