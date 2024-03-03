import React from "react";
// import { useHistory } from "react-router-dom";
import "../App.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../RoutePaths";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { supabase } from "../supabaseClient";

function Map() {
//   const history = useHistory();
const navigate = useNavigate();
  const handleCircleClick = (level) => {
    navigate(RoutePaths.HOME + level);
  };
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    // saveStage();
    navigate(RoutePaths.AUTH);
  }

  return (
    <div className="map-container">
        
        <div className="logout-button" 
          onClick={(e) => {
            e.currentTarget.blur();
            signOut();
          }}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
           </div>
      <div className="circle" onClick={() => handleCircleClick(1)}>Starter</div>
      <div className="circle" onClick={() => handleCircleClick(2)}>Investing</div>
      <div className="circle" onClick={() => handleCircleClick(3)}>Banking</div>
      <div className="circle" onClick={() => handleCircleClick(4)}>Stock</div>
      <div className="circle" onClick={() => handleCircleClick(5)}>Accounting</div>
      <div className="circle" onClick={() => handleCircleClick(6)}>Insurance</div>
      <div className="circle" onClick={() => handleCircleClick(7)}>Taxation</div>
    </div>
  );
}

export default Map;