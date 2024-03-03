import Game from "../components/Game";
import React, { useState, useEffect } from "react";
import Auth from "./Auth";
import ProgressBar from "../components/ProgressBar";
import { useContext } from "react";
import { UserContext } from "../Contexts";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

async function getStage(name, session) {
  switch (name) {
    case "1":
      const { data: data0, error0 } = await supabase
        .from("profiles")
        .select("kingdom_1")
        .eq("user_id", session.user.id);
      return data0[0].kingdom_1;
    case "2":
      const { data: data1, error1 } = await supabase
        .from("profiles")
        .select("kingdom_2")
        .eq("user_id", session.user.id);
      if (error1) {
        console.log(error1);
      }
      return data1[0].kingdom_2;
    case "3":
      const { data: data2, error2 } = await supabase
        .from("profiles")
        .select("kingdom_3")
        .eq("user_id", session.user.id);
      return data2[0].kingdom_3;
    case "4":
      const { data: data3, error3 } = await supabase
        .from("profiles")
        .select("kingdom_4")
        .eq("user_id", session.user.id);
      return data3[0].kingdom_4;
    case "5":
      const { data: data4, error4 } = await supabase
        .from("profiles")
        .select("kingdom_5")
        .eq("user_id", session.user.id);
      return data4[0].kingdom_5;
    case "6":
      const { data: data5, error5 } = await supabase
        .from("profiles")
        .select("kingdom_6")
        .eq("user_id", session.user.id);
      return data5[0].kingdom_6;
    case "7":
      const { data: data6, error6 } = await supabase
        .from("profiles")
        .select("kingdom_7")
        .eq("user_id", session.user.id);
      return data6[0].kingdom_7;
  }
}

export default function Kingdom() {
  const { name } = useParams();
  const [stage, setStage] = useState(0);
  const session = useContext(UserContext);

  useEffect(() => {
    (async () => {
      setStage(await getStage(name, session));
      console.log("stage: " + stage);
    })();
  }, []);
  console.log("kingdom: " + name);
  return (
    <div className="kingdom">
      <nav>
        <h1>capital letters</h1>
      </nav>
      <ProgressBar kingdom={name} stage={stage} />
      <Game kingdom={name - 1} stage={stage} setStage={setStage} />
    </div>
  );
}
