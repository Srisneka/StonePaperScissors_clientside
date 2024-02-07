import React from "react";
import { Link } from "react-router-dom";
import Triangle from "../images/bg-triangle.svg";
import '../Styles/play.css'

const Play = ({ setMyChoice,userRole,socket,roomCode }) => {
  const setChoice = (e) => {
    setMyChoice(e.target.dataset.id);
    socket.emit(userRole,{spsValue:e.target.dataset.id,roomUniqueId:roomCode});
  };

  return (
    <div className="play">
      <img src={Triangle} alt="" className="triangle" />
      <div className="items">
        <Link to="/game">
          <div
            data-id="paper"
            onClick={setChoice}
            className="icon icon--paper"
          ></div>
        </Link>
        <Link to="/game">
          <div
            data-id="scissors"
            onClick={setChoice}
            className="icon icon--scissors"
          ></div>
        </Link>
        <Link to="/game">
          <div
            data-id="stone"
            onClick={setChoice}
            className="icon icon--stone"
          ></div>
        </Link>
      </div>
    </div>
  );
};

export default Play;