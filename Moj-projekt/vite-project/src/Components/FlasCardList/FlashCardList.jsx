import React from "react";
import FlashCard from "../FlashCard/FlashCard";
import "../FlasCardList/FlashCardList.css";
const FlashCardList = ({ sampleCards }) => {
  return (
    <div className="card-grid">
      {sampleCards.map((SampleCard) => {
        return (
          <FlashCard SampleCard={SampleCard} key={SampleCard.id}></FlashCard>
        );
      })}
    </div>
  );
};

export default FlashCardList;
