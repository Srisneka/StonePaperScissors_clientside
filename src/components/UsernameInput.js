import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import '../Styles/usernameinput.css';

const UsernameInput = ({ onStartGame,socket }) => {
  const [username, setUsername] = useState("");
  const [userCode, setUserCode] = useState("");
  const navigate = useNavigate();

  const handleNameSubmit = () => {
    if (username.trim() === "" && userCode.trim() === "") {
      alert("Please enter a valid username and code.");
      return;
    }
    socket.emit('joinGame',{roomUniqueId:userCode});
    onStartGame(username,userCode,'p2Choice');
    navigate("/play");
  };

  const handleNewGame = () =>{
    if (username.trim() === "") {
      alert("Please enter a valid username.");
      return;
    }
    socket.emit('createGame',{});
  }

  socket.on('newGame',(data)=>{

    onStartGame(username,data.roomUniqueId,'p1Choice');
    navigate("/play");
  })
  return (
    <div className="username-input">
      <h1>Welcome to the Stone, Paper, Scissors Game!</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
        <input
        type="text"
        placeholder="Enter room code"
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
      />
      <div className="button-container">
      <button onClick={handleNewGame}>New Game</button>
      <button onClick={handleNameSubmit}>Join Game</button>
      </div>
    </div>
  );
};

export default UsernameInput;
