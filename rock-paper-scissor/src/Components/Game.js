import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const images = [
//   <i className="fa-regular fa-hand-fist icon icon-size"></i>,
//   <i className="fa-regular fa-hand icon paper-icon icon-size"></i>,
//   <i className="fa-solid fa-hand-scissors icon scissor-icon icon-size"></i>,
// ];

// console.log("--------images--------", images);

// function shuffle(array) {
//   let currentIndex = array.length,
//     temporaryValue,
//     randomIndex;

//   console.log("---currentIndex-----", currentIndex);
//   while (0 !== currentIndex) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }
//   return array;
// }

const Game = () => {
  const navigate = useNavigate();
  const [userOption, setUserOption] = useState("");
  const [radomIcon, setRandomIcon] = useState("");
  const [botOption, setBotOption] = useState("");
  const [isLock, setIsLock] = useState(false);
  const [status, setStatus] = useState("");
  const [startGame, setStartGame] = useState(false);
  // const [realBotOption, setrealBotOption] = useState("");

  const rock = <i className="fa-regular fa-hand-fist icon icon-size"></i>;
  const paper = (
    <i className="fa-regular fa-hand icon paper-icon icon-size"></i>
  );
  const scissor = (
    <i className="fa-solid fa-hand-scissors icon scissor-icon icon-size"></i>
  );

  const icons = {
    rock: rock,
    paper: paper,
    scissor: scissor,
  };

  const handleStart = () => {
    if (isLock) {
      setStartGame(true);
      // const random = Math.floor(Math.random() * 3);
      // const keys = Object.keys(icons);
      // const randomKey = keys[random];

      // console.log("=========userOption==========", userOption);

      // console.log(">>>>>>.randomKey>>>>>>>", randomKey);
      // console.log(">>>>>>>>>>>", icons[1]);
      // setRandomIcon(icons[randomKey]);
      // setBotOption(randomKey);
    } else {
      toast.warning("Please Lock your option");
    }
  };

  console.log("----radomIcon--------", radomIcon);
  console.log("=========botOption=======", botOption);

  const handleRestart = () => {
    setIsLock(false);
    setStatus("");
    setUserOption("");
    setBotOption("");
    setRandomIcon("");
    setStartGame(false);
  };

  const handleLock = () => {
    if (userOption !== "") setIsLock(true);
    else toast.warning("Please Choose your option");
  };

  // useEffect(() => {
  //   const interval = 50; // shuffle every 2 seconds
  //   const duration = 1000; // shuffle for 10 seconds

  //   let intervalId = setInterval(() => {
  //     const shuffledImages = shuffle(images);
  //     setCurrentImage(shuffledImages[0]);
  //   }, interval);

  //   setTimeout(() => {
  //     clearInterval(intervalId);
  //   }, duration);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  // const images = [
  //   <i className="fa-regular fa-hand-fist icon icon-size"></i>,
  //   <i className="fa-regular fa-hand icon paper-icon icon-size"></i>,
  //   <i className="fa-solid fa-hand-scissors icon scissor-icon icon-size"></i>,
  // ];

  useEffect(() => {
    let randomKey;
    if (startGame) {
      let interval = setInterval(() => {
        const random = Math.floor(Math.random() * 3);

        const keys = Object.keys(icons);
        randomKey = keys[random];
        setRandomIcon(icons[randomKey]);
      }, 40);

      setTimeout(() => {
        clearInterval(interval);
        console.log(">>>>>>.randomKey>>>>>>>", randomKey);
        setBotOption(randomKey);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [startGame]);

  useEffect(() => {
    if (
      (userOption === "rock" && botOption === "scissor") ||
      (userOption === "paper" && botOption === "rock") ||
      (userOption === "scissor" && botOption === "paper") ||
      (userOption === "scissor" && botOption === "rock")
    ) {
      setStatus("User Win");
    } else if (
      (botOption === "rock" && userOption === "scissor") ||
      (botOption === "paper" && userOption === "rock") ||
      (botOption === "scissor" && userOption === "paper") ||
      (botOption === "scissor" && userOption === "rock")
    ) {
      setStatus("Computer Win");
    } else if (
      userOption === botOption &&
      userOption !== "" &&
      botOption !== ""
    ) {
      setStatus("Draw");
    } else {
      setStatus("");
    }
  }, [botOption, userOption]);

  console.log("-------status----------", status);

  return (
    <div className="game-container">
      {/* Navbar section  */}
      <div className="game-navbar">
        <div className="main-logo">
          <span className="logo">Rock-Paper</span>
          <span className="logo">Scissors</span>
        </div>
        <div className="score-section">
          <button onClick={() => navigate("/")} className="exit-btn">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Exit</span>
          </button>
          <i className="fa-solid fa-gem gem-icon"></i>
          <div className="score-box">
            <span className="score">999</span>
            <i className="fa-solid fa-circle-plus plus-icon"></i>
          </div>
        </div>
      </div>

      {/* Main section  */}
      <div className="main-section">
        {/* left section   */}
        <div className="user-icon">
          <span>User</span>
          <div className="box">
            <i
              className="fa-regular fa-hand-fist icon"
              onClick={() => (!isLock ? setUserOption("rock") : "")}
            ></i>
            <span>Rock</span>
          </div>
          <div className="box">
            <i
              className="fa-regular fa-hand icon paper-icon"
              onClick={() => (!isLock ? setUserOption("paper") : "")}
            ></i>
            <span>Paper</span>
          </div>
          <div className="box">
            <i
              className="fa-solid fa-hand-scissors icon scissor-icon"
              onClick={() => (!isLock ? setUserOption("scissor") : "")}
            ></i>
            <span>Scissor</span>
          </div>

          <button className="lock-btn" onClick={handleLock}>
            {isLock ? (
              <>
                <i className="fa-solid fa-lock lock-icon "></i>
                <span>Locked</span>
              </>
            ) : (
              <>
                {" "}
                <i className="fa-solid fa-lock-open lock-icon"></i>
                <span>Lock</span>
              </>
            )}
          </button>
        </div>

        {/* right section   */}
        <div className="right-section">
          <h1 className="status">{status}</h1>
          <div className="box-container">
            <div>
              <span className="user-name">User</span>
              <div className="box1">
                {userOption === "rock" ? (
                  <i className="fa-regular fa-hand-fist icon icon-size"></i>
                ) : userOption === "paper" ? (
                  <i className="fa-regular fa-hand icon paper-icon icon-size"></i>
                ) : userOption === "scissor" ? (
                  <i className="fa-solid fa-hand-scissors icon scissor-icon icon-size"></i>
                ) : (
                  ""
                )}
              </div>
            </div>
            <img src="./assets/vs.png" className="vs-img" />
            <div>
              <span className="user-name">Computer</span>
              <div className="box1">{radomIcon}</div>
            </div>
          </div>
          {status === "" ? (
            <button
              type="button"
              className="game-start-btn"
              onClick={handleStart}
            >
              Start
            </button>
          ) : (
            <button
              type="button"
              className="game-start-btn"
              onClick={handleRestart}
            >
              Restart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
