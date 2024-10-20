import React, { useState } from "react";
import "../FlashCard/FlashCard.css";

const FlashCard = ({ SampleCard }) => {
  const [Flip, SetFlip] = useState(false);

  return (
    <div
      className={`card ${Flip == true ? "flip" : ""} `}
      onClick={() => {
        SetFlip(!Flip);
      }}
    >
      {Flip == true ? (
        <div className="back">
          <h4>{SampleCard.correct_answer}</h4>
        </div>
      ) : (
        <div className="front">
          <h4>{SampleCard.question}</h4>
          <p>{SampleCard.incorrect_answers[0]}</p>{" "}
          <p>{SampleCard.incorrect_answers[0]}</p>{" "}
          <p>{SampleCard.incorrect_answers[0]}</p>
          <p>{SampleCard.correct_answer}</p>
        </div>
      )}
    </div>
  );
};

export default FlashCard;
