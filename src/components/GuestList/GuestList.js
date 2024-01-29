import React from "react";
import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";




function GuestList({ guesses }) {
  return (
    <div className="guess-results">
      {range(NUM_OF_GUESSES_ALLOWED).map((rowIndex) => {
        return (
          <p className="guess" key={rowIndex}>
            {range(5).map((cellIndex) => {
              const char = guesses[rowIndex] && guesses[rowIndex][cellIndex].letter;
              const status = guesses[rowIndex] && guesses[rowIndex][cellIndex].status;
              const cellClass = `cell ${status || ''}`;
              return (
                <span className={cellClass} key={cellIndex}>
                  {char}
                </span>
              )
            })}
          </p>
        )
      })}
    </div>
  );
}

export default GuestList;
