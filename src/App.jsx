import React, { useEffect, useRef, useState } from "react";
import FlashCard from "./Components/FlashCard/FlashCard";
import FlashCardList from "./Components/FlasCardList/FlashCardList";
import axios from "axios";
import "./App.css";
const App = () => {
  const [sampleCards, setsampleCards] = useState([]);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [CardData, setCardData] = useState([]);
  const [amount, setAmount] = useState("0");
  const [selectedCategory, setselectedCategory] = useState("9");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api_category.php"
        );
        setCategories(response.data.trivia_categories);
      } catch (error) {
        setError("Błąd podczas pobierania danych");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>{error}</p>;

  const FetchDataQuestions = () => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=${amount}&category=${selectedCategory}`
        );
        setsampleCards(response.data.results);
        setCardData(
          response.data.results.map((element, index) => {
            const randomAnswers = [
              element.correct_answer,
              ...element.incorrect_answers.map((a) => DecodeString(a)),
            ];
            const shuffledAnswers = randomAnswers.sort(
              () => Math.random() - 0.5
            );
            return {
              id: `${Date.now()}-${index}`,
              question: DecodeString(element.question),
              answer: element.correct_answer,
              randomAnswers: shuffledAnswers,
            };
          })
        );
      } catch (error) {
        setError("Błąd podczas pobierania danych");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  function DecodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  return (
    <div>
      <header>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            FetchDataQuestions();
          }}
        >
          <div className="form-group">
            {" "}
            <label htmlFor="CategoryHTML">Kategoria</label>
            <select
              id="CategoryHTML"
              onChange={(e) => {
                setselectedCategory(e.target.value);
              }}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>{" "}
          <div className="form-group">
            <label htmlFor="amoutHTML">Ilość</label>
            <input
              type="number"
              className="amount"
              id="amoutHTML"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div>
          <button>Generuj</button>
        </form>
      </header>{" "}
      <div className="container">
        <FlashCardList
          sampleCards={sampleCards}
          CardData={CardData}
        ></FlashCardList>
      </div>
    </div>
  );
};

export default App;
//rename folderow moglbym zrobic
