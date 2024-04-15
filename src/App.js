import { useEffect, useState, useRef } from "react";
import "./App.css";
import FlashCardList from "./FlashCardList";
import axios from "axios";
function App() {
     const [flashCards, setFlashCards] = useState([]);
     const [categories, setCategories] = useState([]);

     const categoryEl = useRef();
     const amountEl = useRef();

     useEffect(() => {
          axios.get("https://opentdb.com/api_category.php").then((res) => {
               setCategories(res.data.trivia_categories);
          });
     }, []);
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

     function handleSubmit(e) {
          e.preventDefault();
     }
     return (
          <>
               <form className="header" onSubmit={handleSubmit}>
                    <div className="form-group">
                         <label htmlFor="category">Category</label>
                         <select
                              id="category"
                              ref={categoryEl}
                              onChange={(e) => console.log(e.target.value)}
                         >
                              {categories.map((category) => (
                                   <option
                                        id={category.id}
                                        value={category.name}
                                   >
                                        {category.name}
                                   </option>
                              ))}
                         </select>
                    </div>
                    <div className="form-group">
                         <label htmlFor="amount">Amount</label>
                         <input
                              id="amount"
                              type="number"
                              min={1}
                              step={1}
                              defaultValue={10}
                              ref={amountEl}
                         ></input>
                    </div>
                    <div className="form-group">
                         <button className="btn">Generate</button>
                    </div>
               </form>
               <div className="container">
                    <FlashCardList flashCards={flashCards}>hi</FlashCardList>
               </div>
          </>
     );
}

export default App;
