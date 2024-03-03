import { useState } from "react";
import "./App.css";
import Game from "./components/Game";
import React, { createContext, useEffect } from "react";
import Auth from "./pages/Auth";
import { supabase } from "./supabaseClient";
import { UserContext } from "./Contexts";
import ProgressBar from "./components/ProgressBar";
import Kingdom from "./pages/Kingdom";

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
        {!session ? <Auth /> : <Kingdom stage={stage} setStage={setStage} />}
      </UserContext.Provider>
    </div>
  );
}

export default App;
