import React from "react";
import "../public/css/styles.css";
import DarkMode from "./components/DarkMode/DarkMode";
import Feed from "./components/Feed";

export default function App() {
  return (
    <div className="App">
      <div className="text-center logo-container">
        <img src="/images/aurora-sight.png" alt="Aurora-Sight-logo" />
      </div>
      <h1>Aurora Sight</h1>
      <div className="card text-center mb-3 custom-card">
        <div className="card-body">
          <Feed />
        </div>
      </div>
      <DarkMode />
      <div className="footer-container">
        <p className="footer-text">
          {" "}
          Made with 🧡 by{" "}
          <a href="https://github.com/thenameisajay">
            Ajay Pradeep Mahadeven
          </a>{" "}
        </p>
      </div>
    </div>
  );
}
