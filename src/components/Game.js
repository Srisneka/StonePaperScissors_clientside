import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../Styles/game.css';

const Game = ({ score, myChoice, setScore, setRoundCounter, roundCounter, userRole, socket, pOpponent, pCounter, resetValues, incrementDrawCount }) => {
  const [opponent, setOpponent] = useState(pOpponent);
  const [playerWin, setPlayerWin] = useState("");

  const [counter, setCounter] = useState(pCounter);




  socket.on('result', (data) => {
    if (data.winner == 'd') {
      setPlayerWin("draw");
      incrementDrawCount();
    }
    else if (data.winner == userRole) {
      setPlayerWin("win");
      setScore(score + 1);
    }
    else setPlayerWin("lose");
  })

  socket.on(userRole == "p1Choice" ? "p2Choice" : "p1Choice", (data) => {
    setOpponent(data.spsValue);
    setCounter(0);
  })

  const Result = () => {

  };



  useEffect(() => {
    const timer =
      counter > 0
        ? setInterval(() => {
          setCounter(counter - 1);
        }, 1000)
        : Result();

    return () => {
      clearInterval(timer);
    };
  }, [counter, opponent]);

  return (
    <div className="game">
      <div className="game__you">
        <span className="text">You Picked</span>
        <div
          className={`icon icon--${myChoice} ${playerWin == "win" ? `icon icon--${myChoice}--winner` : ""
            }`}
        ></div>
      </div>
      {playerWin == "win" && (
        <div className="game__play">
          <span className="text">You Win</span>
          {roundCounter < 6 ? <Link to="/play" className="play-again" onClick={() => { setOpponent(); setRoundCounter((roundCounter) => roundCounter + 1); resetValues(); }}>
            Play Again
          </Link> : <Link to="/result" className="play-again" >
            View Result
          </Link>}
        </div>
      )}
      {playerWin == "lose" && (
        <div className="game__play">
          <span className="text">You Lose</span>
          {roundCounter < 6 ? <Link to="/play" className="play-again" onClick={() => { setOpponent(); setRoundCounter((roundCounter) => roundCounter + 1); resetValues(); }}>
            Play Again
          </Link> : <Link to="/result" className="play-again" >
            View Result
          </Link>}
        </div>
      )}
      {playerWin == "draw" && (
        <div className="game__play">
          <span className="text">Draw</span>
          {roundCounter < 6 ? <Link to="/play" className="play-again" onClick={() => { setOpponent(); setRoundCounter((roundCounter) => roundCounter + 1); resetValues(); }}>
            Play Again
          </Link> : <Link to="/result" className="play-again" >
            View Result
          </Link>}
        </div>
      )}

      <div className="game__opponent">
        <span className="text">Opponent</span>
        {counter == 0 ? (
          <div
            className={`icon icon--${opponent} ${playerWin == "lose" ? `icon icon--${opponent}--winner` : ""
              }`}
          ></div>
        ) : (
          <div className="counter">{counter}</div>
        )}
      </div>
    </div>
  );
};

export default Game;                              
