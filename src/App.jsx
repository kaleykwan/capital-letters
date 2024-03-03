import { useState } from "react";
import "./App.css";
import React, { createContext, useEffect } from "react";
import Auth from "./pages/Auth";
import Map from "./pages/Map";
import { supabase } from "./supabaseClient";
import { UserContext } from "./Contexts";
import Kingdom from "./pages/Kingdom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RoutePaths } from "./RoutePaths";

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
        <BrowserRouter>
          <div>
            <Routes>
            <Route path={RoutePaths.AUTH} element={<Auth />} />
            <Route path={RoutePaths.MAP} element={<Map />} />
            <Route path={RoutePaths.HOME} element={<Kingdom stage={stage} setStage={setStage}/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
