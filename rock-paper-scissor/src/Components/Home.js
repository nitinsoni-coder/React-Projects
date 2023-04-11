import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handlePlay = () => {
    navigate("/game");
  };

  return (
    <div className="home-container">
      <div className="Home-logo">
        <span className="logo logo-position">Rock-Paper</span>
        <span className="logo logo-position">Scissors</span>
      </div>

      <div className="home-action-btn">
        <button className="play-btn" onClick={handlePlay}>
          Play
        </button>
        <button className="play-btn">Settings</button>
        {/* <button className="play-btn">Quit</button> */}
      </div>
    </div>
  );
};

export default Home;
