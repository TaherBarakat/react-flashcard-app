import { click } from "@testing-library/user-event/dist/click";
import React, { useEffect, useRef, useState } from "react";
export default function FlashCard({ flashCard }) {
     const [flip, setFlip] = useState(false);
     const [height, setHeight] = useState("initial");
     const frontEl = useRef();
     const backEl = useRef();
     function getMaxHight() {
          const frontHeight = frontEl.current.getBoundingClientRect().height;
          const backHeight = backEl.current.getBoundingClientRect().height;
          setHeight(Math.max(frontHeight, backHeight, 100));
     }
     useEffect(getMaxHight, []);
     useEffect(() => {
          window.addEventListener("resize", getMaxHight);
          return () => window.removeEventListener("resize", getMaxHight);
     }, []);
     return (
          <div
               onClick={() => setFlip(!flip)}
               className={`card ${flip ? "flip" : " "}`}
               style={{ height: height }}
          >
               <div ref={frontEl} className="front">
                    {flashCard.question}
                    <div className="flashcard-options">
                         {flashCard.options.map((option, index) => (
                              <div className="flashcard-option " key={option}>
                                   {option}
                              </div>
                         ))}
                    </div>
               </div>
               <div ref={backEl} className="back">
                    {flashCard.answer}
               </div>
          </div>
     );
}
