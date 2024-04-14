import { useState } from "react";
import "./App.css";
import FlashCardList from "./FlashCardList";

function App() {
     const [flashCards, setFlashCards] = useState(SAMPLE_FLASHCARDS);
     console.log(flashCards);
     return <FlashCardList flashCards={flashCards}>hi</FlashCardList>;
}

const SAMPLE_FLASHCARDS = [
     {
          id: 1,
          question: "AAAAAAAAAAAbla bla?",
          answer: 4,
          options: [1, 2, 3, 4],
     },
     {
          id: 2,
          question: "bla blAEFEWGRSHQa?",
          answer: 1,
          options: [1, 2, 6, 6],
     },
];
export default App;
