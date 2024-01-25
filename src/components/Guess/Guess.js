import React from "react";
import { useState } from "react";
import GuestList from "../GuestList/GuestList";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";

function Guess(answer) {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [amountOfGuesses, setAmountOfGuesses] = useState(0);
  let winner = false;
  const [gameStatus, setGameStatus] = useState(null); // null, 'won', or 'lost'


  return (
    <div>
      {gameStatus === 'won' && (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in
            <strong> {amountOfGuesses} guesses</strong>.
          </p>
        </div>
      )}

      {gameStatus === 'lost' && (
        <div className="sad banner">
          <p>Sorry, the correct answer is <strong>{answer.answer.toUpperCase()}</strong>.</p>
        </div>
      )}
      {gameStatus !== 'won' && gameStatus !== 'lost' && (
        <div>
          <form className="guess-input-wrapper" onSubmit={(event) => {
            event.preventDefault();
            if (guess.length !== 5) {
              window.alert("Please enter exactly 5 characters.")
              return;
            }


            // if (amountOfGuesses >= NUM_OF_GUESSES_ALLOWED) {
            //   window.alert(`You are allowed ${NUM_OF_GUESSES_ALLOWED} guesses total`);
            //   return;
            // }
            console.log({ guess });

            if (guess === answer.answer) {
              setGameStatus("won");
            } else if (amountOfGuesses + 1 === NUM_OF_GUESSES_ALLOWED) {
              setGameStatus('lost');
            }
            const guessResult = checkGuess(guess, answer.answer);
            setGuess("");
            setGuesses(prevGuesses => [...prevGuesses, guessResult]);
            setAmountOfGuesses(amountOfGuesses + 1);
          }}>
            <label htmlFor="guess-input">
              <div>
                <div>Enter your guess:</div>
                <input
                  required
                  id="guess-input"
                  type="text"
                  value={guess}
                  title="5 letter word"
                  pattern="[a-zA-Z]{5}"
                  minLength={5}
                  maxLength={5}
                  onChange={(event) => {
                    setGuess((event.target.value).toUpperCase());
                  }} />
              </div>
            </label>
          </form>
          <GuestList guesses={guesses} />
        </div>
      )}
    </div>
  );
}

export default Guess;
