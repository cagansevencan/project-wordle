import React from "react";
import { useState } from "react";
import GuestList from "../GuestList/GuestList";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";
import WonBanner from "../WonBanner/WonBanner";
import LostBanner from "../LostBanner/LostBanner";
import Keyboard from "../Keyboard/Keyboard";
import { sample } from "../../utils"
import { WORDS } from '../../data';



function Guess({ initialAnswer, handleRestart }) {
  const [tentativeGuess, setTentativeGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState('running'); // running, 'won', or 'lost'
  const [answer, setAnswer] = React.useState(initialAnswer);


  function handleSubmitGuess(tentativeGuess) {
    if (tentativeGuess.length !== 5) {
      window.alert("Please enter exactly 5 characters.💖 ")
      return;
    }

    const tentativeGuessResult = checkGuess(tentativeGuess, answer);
    setTentativeGuess("");
    const nextGuesses = [...guesses, tentativeGuessResult];
    setGuesses(nextGuesses);

    if (tentativeGuess === answer) {
      setGameStatus("won");
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus('lost');
    }
  }

  function handleRestart() {
    const newAnswer = sample(WORDS);
    setAnswer(newAnswer);
    setGuesses([]);
    setGameStatus('running');
  }



  return (
    <>
      <form className="guess-input-wrapper" onSubmit={(event) => {
        event.preventDefault();
        handleSubmitGuess(tentativeGuess);
      }}>
        <label htmlFor="guess-input">
          <div>
            <div>Enter your guess:</div>
            <input
              required
              disabled={gameStatus !== 'running'}
              id="guess-input"
              type="text"
              value={tentativeGuess}
              title="5 letter word"
              pattern="[a-zA-Z]{5}"
              minLength={5}
              maxLength={5}
              onChange={(event) => {
                setTentativeGuess((event.target.value).toUpperCase());
              }} />
          </div>
        </label>
      </form>
      <GuestList guesses={guesses} />
      <Keyboard validatedGuesses={guesses} />
      {gameStatus === 'won' && (
        <WonBanner amountOfGuesses={guesses.length}
          handleRestart={handleRestart} />
      )}
      {gameStatus === 'lost' && (
        <LostBanner answer={answer} handleRestart={handleRestart} />
      )}
    </>
  );
}

export default Guess;
