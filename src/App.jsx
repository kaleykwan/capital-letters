import { useState } from "react";
import "./App.css";
import Game from "./components/Game";
import React, { createContext, useEffect } from "react";
import Auth from "./pages/Auth";
import { supabase } from "./supabaseClient";

export const AppContext = createContext();
export const UserContext = createContext();

function App() {
  const [session, setSession] = useState(null);

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
        {!session ? <Auth /> : <Game />}
      </UserContext.Provider>
    </div>
  );
}

export default App;
