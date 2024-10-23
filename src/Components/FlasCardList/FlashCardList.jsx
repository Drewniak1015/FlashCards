import React from "react";
import FlashCard from "../FlashCard/FlashCard";
import "../FlasCardList/FlashCardList.css";
const FlashCardList = ({ sampleCards, CardData }) => {
  return (
    <div className="card-grid">
      {CardData.map((Card) => {
        return <FlashCard key={Card.id} Card={Card}></FlashCard>;
      })}
    </div>
  );
};

export default FlashCardList;
