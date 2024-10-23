import React, { useEffect, useRef, useState } from "react";
import "../FlashCard/FlashCard.css";

const FlashCard = ({ Card }) => {
  const [Flip, SetFlip] = useState(false);
  const [height, setHeight] = useState("initial");
  const frontEl = useRef();

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    setHeight(frontHeight);
  }

  useEffect(() => {
    setMaxHeight();
  }, [Card.question, Card.answer, Card.randomAnswers]);

  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, []);

  return (
    <div
      className={`card ${Flip ? "flip" : ""}`}
      onClick={() => SetFlip(!Flip)}
      style={{ height: height }}
    >
      {Flip ? (
        <div className="back">
          <h4>{Card.answer}</h4>
        </div>
      ) : (
        <div className="front" ref={frontEl}>
          <h4>{Card.question}</h4>
          <p>{Card.randomAnswers[0]}</p>
          <p>{Card.randomAnswers[1]}</p>
          <p>{Card.randomAnswers[2]}</p>
          <p>{Card.randomAnswers[3]}</p>
        </div>
      )}
    </div>
  );
};

export default FlashCard;
