import React, { useState } from 'react';

const Circle = ({ filled }) => {
  return (
    <div
      className={`circle ${filled ? 'filled' : ''}`}
    />
  );
};

const ProgressBar = ({ progress, totalSteps = 6 }) => {
  const [filledCircles, setFilledCircles] = useState(Math.floor(progress / 100 * totalSteps));

  const handleProgressUpdate = (newProgress) => {
    setFilledCircles(Math.floor(newProgress / 100 * totalSteps));
  };

  return (
    <div className="progress-container">
      {[...Array(totalSteps)].map((_, index) => (
        <Circle key={index} filled={index < filledCircles} />
      ))}
      {/* Replace with your logic for updating progress (e.g., button click) */}
      <button onClick={() => handleProgressUpdate(progress + 10)}>Increase Progress</button>
    </div>
  );
};

export default ProgressBar;
