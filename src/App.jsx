import { useState } from "react";
import "./App.css";
import Game from "./components/Game";
import React, { createContext, useEffect } from "react";
import Auth from "./pages/Auth";
import { supabase } from "./supabaseClient";
import { UserContext } from "./Contexts";
import ProgressBar from "./components/ProgressBar";

function App() {
  const [session, setSession] = useState(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={session}>
        <nav>
          <h1>capital letters</h1>
        </nav>
        {/* <p>{stage}</p> */}
        {/* <h1>Progress</h1> */}
      <ProgressBar currentLevel={stage} />
        {!session ? <Auth /> : <Game stage={stage} setStage={setStage} />}
      </UserContext.Provider>
    </div>
  );
}

export default App;
