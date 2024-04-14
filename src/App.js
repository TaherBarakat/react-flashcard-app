import { useEffect, useState } from "react";
import "./App.css";
import FlashCardList from "./FlashCardList";
import axios from "axios";
function App() {
     const [flashCards, setFlashCards] = useState([]);
     // console.log("comp");

     useEffect(() => {
          // fetch("https://opentdb.com/api.php?amount=10")
          //      .then((res) => res.json())
          //      .then((data) => {
          //           // console.log(data.results);
          //           let questions = data.results.map((q, index) => {
          //                return {
          //                     id: index,
          //                     question: q.question,
          //                     options: [
          //                          ...q.incorrect_answers,
          //                          q.correct_answers,
          //                     ],
          //                     answer: q.correct_answer,
          //                };
          //           });

          //           setFlashCards(questions);
          //      });

          axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
               let fetchedQuestions = res.data.results.map((q, index) => {
                    let options = [...q.incorrect_answers, q.correct_answer]
                         .sort(() => Math.random() - 0.5)
                         .map((a) => decodeString(a));
                    return {
                         id: `${index}-${Date.now()}`,
                         question: decodeString(q.question),
                         options: options,
                         answer: q.correct_answer,
                    };
               });
               setFlashCards(fetchedQuestions);
          });
     }, []);

     function decodeString(str) {
          const textArea = document.createElement("textarea");

          textArea.innerHTML = str;
          return textArea.value;
     }

     return <FlashCardList flashCards={flashCards}>hi</FlashCardList>;
}

export default App;
