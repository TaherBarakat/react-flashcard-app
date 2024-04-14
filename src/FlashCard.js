import { click } from "@testing-library/user-event/dist/click";
import React, { useState } from "react";
export default function FlashCard({ flashCard }) {
     const [flip, setFlip] = useState(false);
     return (
          <div
               onClick={() => setFlip(!flip)}
               className={`card ${flip ? "flip" : " "}`}
          >
               <div className="front">
                    {flashCard.question}
                    <div className="flashcard-options">
                         {flashCard.options.map((option, index) => (
                              <div className="flashcard-option " key={option}>
                                   {option}
                              </div>
                         ))}
                    </div>
               </div>
               <div className="back"> {flashCard.answer}</div>
          </div>
     );
}
