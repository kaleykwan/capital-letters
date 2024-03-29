import React from "react";
import "../App.css";

const kingdoms = [
  ['accounting', 'invest', 'capital'],
  ['stock', 'equity', 'dividend', 'bond', 'mutual', 'securities', 'portfolio', 'yield', 'venture'],
  ['atm', 'cash', 'loan', 'bank', 'credit', 'deposit', 'savings', 'mortgage', 'interest', 'withdraw', 'overdraft'],
  ['exchange', 'commodity', 'bull', 'derivative', 'options', 'forex', 'index', 'ipo', 'crypto'],
  ['tax', 'audit', 'balance', 'journal', 'fiscal', 'gaap', 'ledger', 'depreciate'],
  ['risk', 'loss', 'claim', 'premium', 'policy', 'coverage', 'liability', 'insolvent'],
  ['irs', 'haven', 'levy', 'income', 'deduction', 'exemption', 'shelter', 'compliance']
];

function ProgressBar({ kingdom, stage }) {
  console.log("current stage: " + stage);
  const levels = Array.from({ length: kingdoms[kingdom-1].length }, (_, index) => index + 1);

  return (
    <div className="progress-bar">
      {levels.map((level) => (
        <div
          style={{
            color: "white",
            backgroundColor: level <= stage ? "#ff38d1" : "lightpink",
            fontWeight: "bolder"
          }}
          key={level}
          className={`progress-circle ${
            level <= stage ? "completed" : ""
          }`}
        >
          {/* {level <= currentLevel ? <span>{level}</span> : level} */}
          {level}
        </div>
      ))}
    </div>
  );
}

export default ProgressBar;

// import React, { useState } from 'react';

// const INTERVAL_WIDTH = 50; // Adjust as needed for desired spacing

// const Interval = ({ filled, label }) => {
//   return (
//     <div
//       className={`interval ${filled ? 'filled' : ''}`}
//       style={{ width: INTERVAL_WIDTH + 'px' }}
//     >
//       {label}
//     </div>
//   );
// };

// const Circle = ({ filled }) => {
//   return (
//     <div className={`circle ${filled ? 'filled' : ''}`} />
//   );
// };

// const ProgressBar = ({ progress, totalSteps = 6, labels }) => {
//   const [filledCircles, setFilledCircles] = useState(Math.floor(progress / 100 * totalSteps));

//   const handleProgressUpdate = (newProgress) => {
//     setFilledCircles(Math.floor(newProgress / 100 * totalSteps));
//   };

//   return (
//     <div className="progress-container" style={{ width: INTERVAL_WIDTH * totalSteps + 'px' }}>
//       {[...Array(totalSteps)].map((_, index) => (
//         <Interval key={index} filled={index < filledCircles} label={labels && labels[index]} />
//       ))}
//       <div className="circle-container">
//         {[...Array(totalSteps)].map((_, index) => (
//           <Circle key={index} filled={index < filledCircles} />
//         ))}
//       </div>
//       {/* Replace with your logic for updating progress (e.g., button click) */}
//       <button onClick={() => handleProgressUpdate(progress + 10)}>Increase Progress</button>
//     </div>
//   );
// };

// export default ProgressBar;
