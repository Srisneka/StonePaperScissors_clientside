import { socket } from "./socket";
import React, { useState, useEffect } from "react";
import UsernameInput from "./components/UsernameInput";
import Header from "./components/Header";
import Game from "./components/Game";
import { Routes, Route, useLocation } from "react-router-dom";
import Play from "./components/Play";
import ResultPage from "./components/ResultPage";
import './Styles/globals.css';

function App() {
  const [myChoice, setMyChoice] = useState("");
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState("");
  const [isUsernameSubmitted, setIsUsernameSubmitted] = useState(false);
  const [roundCounter, setRoundCounter] = useState(1);
  const [roomCode,setRoomCode] = useState();
  const [userRole,setUserRole] = useState();
  const [opponent,setOpponent] = useState();
  const [counter, setCounter] = useState(5);
  const [drawCount, setDrawCount] = useState(0);

  const location = useLocation();

  const startGame = (name,roomCode,userRole) => {
    setUsername(name);
    setIsUsernameSubmitted(true);
    setRoomCode(roomCode);
    setUserRole(userRole);
  };

  const resetValues = ()=>{
    setCounter(5);
    setOpponent(); 
  }

  const incrementDrawCount = ()=>{
    setDrawCount((drawCount)=>()=>drawCount+1);
  }

  socket.on(userRole == "p1Choice"?"p2Choice":"p1Choice",(data)=>{
    setOpponent(data.spsValue);
    setCounter(0);
  })
  useEffect(() => {
    if (location.pathname === "/play" || location.pathname === "/game") {
      setIsUsernameSubmitted(true);
    } else {
      setIsUsernameSubmitted(false);
    }

  }, [location]);

  return (
    <>
      <div className="container">
        {isUsernameSubmitted && <Header score={score} roomCode={roomCode}/>}
        <Routes>
          <Route path="/" element={<UsernameInput onStartGame={startGame} socket={socket} />} />
          <Route path="/play" element={<Play setMyChoice={setMyChoice} userRole={userRole} socket={socket} roomCode={roomCode}/>} />
          <Route path="/game" element={<Game myChoice={myChoice} score={score} setScore={setScore} username={username} setRoundCounter= {setRoundCounter} roundCounter = {roundCounter} userRole={userRole} socket={socket} pOpponent={opponent} pCounter={counter} resetValues={resetValues} incrementDrawCount = {incrementDrawCount}/>} />
          <Route path="/result" element={<ResultPage userScore={score} dCount = {drawCount} />} />
        </Routes>
      </div>
      
    </>
  );
}

export default App;
