import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: signUpEmail,
      password: signUpPassword,
    });

    const { signInData, signInError } = await supabase.auth.signInWithPassword({
      email: signUpEmail,
      password: signUpPassword,
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Signed up!");
    }
    setLoading(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: signInEmail,
      password: signInPassword,
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Signed in!");
    }
    setLoading(false);
  };

  return (
    <div className="col flex flex-center">
      <div className="col-6 form-widget">
        <p className="description">Sign up</p>
        <form className="form-widget" onSubmit={handleSignUp}>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Email"
              value={signUpEmail}
              required={true}
              onChange={(e) => setSignUpEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="inputField"
              type="password"
              placeholder="Password"
              value={signUpPassword}
              required={true}
              onChange={(e) => setSignUpPassword(e.target.value)}
            />
          </div>
          <div>
            <button className={"button block"} disabled={loading}>
              {loading ? <span>Loading</span> : <span>Sign Up</span>}
            </button>
          </div>
        </form>
      </div>
      <div className="col-6 form-widget">
        <p className="description">Sign In</p>
        <form className="form-widget" onSubmit={handleLogin}>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Email"
              value={signInEmail}
              required={true}
              onChange={(e) => setSignInEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="inputField"
              type="password"
              placeholder="Password"
              value={signInPassword}
              required={true}
              onChange={(e) => setSignInPassword(e.target.value)}
            />
          </div>
          <div>
            <button className={"button block"} disabled={loading}>
              {loading ? <span>Loading</span> : <span>Sign In</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
