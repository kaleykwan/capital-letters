import Game from "../components/Game";
import React from "react";
import Auth from "./Auth";
import ProgressBar from "../components/ProgressBar";
import { useContext } from "react";
import { UserContext } from "../Contexts";
import { useParams } from "react-router-dom";

export default function Kingdom({ stage, setStage }) {
  const { name } = useParams();
  console.log(name);
  return (
    <div className="kingdom">
      <nav>
        <h1>capital letters</h1>
      </nav>
      <ProgressBar kingdom={name} currentLevel={stage} />
      <Game kingdom={name-1} stage={stage} setStage={setStage} />
    </div>
  );
}
