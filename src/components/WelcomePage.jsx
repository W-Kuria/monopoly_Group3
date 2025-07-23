import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/welcomePage.css'

const WelcomePage = ({ onStart }) => {
  return (
    <div className="welcome-bg d-flex flex-column justify-content-center align-items-center vh-100 text-center px-4">
      <div className="welcome-content">
        <h1 className="display-4 fw-bold mb-3">Welcome to React Monopoly</h1>
        <p className="lead mb-4">Buy properties, collect rent, and bankrupt your friends!</p>
        <button className="btn btn-light btn-lg px-4 py-2" onClick={onStart}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
