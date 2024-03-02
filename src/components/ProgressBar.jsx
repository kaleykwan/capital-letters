import React, { useState } from 'react';

const INTERVAL_WIDTH = 50; // Adjust as needed for desired spacing

const Interval = ({ filled, label }) => {
  return (
    <div
      className={`interval ${filled ? 'filled' : ''}`}
      style={{ width: INTERVAL_WIDTH + 'px' }}
    >
      {label}
    </div>
  );
};

const Circle = ({ filled }) => {
  return (
    <div className={`circle ${filled ? 'filled' : ''}`} />
  );
};

const ProgressBar = ({ progress, totalSteps = 6, labels }) => {
  const [filledCircles, setFilledCircles] = useState(Math.floor(progress / 100 * totalSteps));

  const handleProgressUpdate = (newProgress) => {
    setFilledCircles(Math.floor(newProgress / 100 * totalSteps));
  };

  return (
    <div className="progress-container" style={{ width: INTERVAL_WIDTH * totalSteps + 'px' }}>
      {[...Array(totalSteps)].map((_, index) => (
        <Interval key={index} filled={index < filledCircles} label={labels && labels[index]} />
      ))}
      <div className="circle-container">
        {[...Array(totalSteps)].map((_, index) => (
          <Circle key={index} filled={index < filledCircles} />
        ))}
      </div>
      {/* Replace with your logic for updating progress (e.g., button click) */}
      <button onClick={() => handleProgressUpdate(progress + 10)}>Increase Progress</button>
    </div>
  );
};

export default ProgressBar;
