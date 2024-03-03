import React from "react";
// import { useHistory } from "react-router-dom";
import "../App.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../RoutePaths";

function Map() {
//   const history = useHistory();
const navigate = useNavigate();
  const handleCircleClick = (level) => {
    // Navigate to the Game component with the selected level
    // history.push(`/game/${level}`);
    navigate(RoutePaths.HOME);
  };

  return (
    <div className="map-container">
      <div className="circle" onClick={() => handleCircleClick(1)}>1</div>
      <div className="circle" onClick={() => handleCircleClick(2)}>2</div>
      <div className="circle" onClick={() => handleCircleClick(3)}>3</div>
      <div className="circle" onClick={() => handleCircleClick(4)}>4</div>
      <div className="circle" onClick={() => handleCircleClick(5)}>5</div>
      <div className="circle" onClick={() => handleCircleClick(6)}>6</div>
    </div>
  );
}

export default Map;