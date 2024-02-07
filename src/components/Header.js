import React from "react";
import '../Styles/header.css';

const Header = ({ score,roomCode }) => {
  return (
    <div className="header">
      <div className="text">
        <span>Stone</span>
        <span>Paper</span>
        <span>Scissors</span>
      </div>
      <div className="score-box">
        <span>Score</span>
        <div className="score-box__score">{score}</div>
      </div>
      <div className="score-box">
        <span>Room Code</span>
        <div className="score-box__score">{roomCode}</div>
      </div>
    </div>
  );
};

export default Header;
