import React from "react";
import { Link } from "react-router-dom";

const ResultPage = ({ userScore,dCount }) => {
  const overallWinner = userScore === (6-userScore-dCount) ? "Draw" : userScore > (6-userScore-dCount) ? "You" : "Opponent";
  const opponentScore = 6- userScore - dCount;

  return (
    <div className="result-page">
      <h1>Game Over</h1>
      <p>Your Score: {userScore}</p>
      <p>Opponent's Score: {opponentScore}</p>
      <p>Overall Winner: {overallWinner}</p>
      <Link to="/">Play Again</Link>
    </div>
  );
};

export default ResultPage;


