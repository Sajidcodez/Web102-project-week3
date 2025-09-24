import React from "react";
import './FlashCard.css'; 

const FlashCard = ({ question, answer, image, difficulty, isFlipped, onFlip }) => {
    return (
        <div 
            className={`flashcard ${isFlipped ? 'flipped' : ''} ${difficulty.toLowerCase()}`} 
            onClick={onFlip}
        >
            <div className="flashcardFirst">
                <p className="question">{question}</p>
                {image && <img src={image} alt="Card visual" className="cardImage" />}
            </div>
            <div className="flashcardBack">
                <p className="answer">{answer}</p>
                {image && <img src={image} alt="Card visual" className="cardImage" />}
            </div></div>);};

export default FlashCard;