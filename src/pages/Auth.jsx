import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../RoutePaths";

export default function Auth() {
  const navigate = useNavigate();
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
      // navigate(RoutePaths.HOME);
      navigate(RoutePaths.MAP);

    }
    setLoading(false);
  };


  return (
    <div className="col flex flex-center">
      <div className="col-6 form-widget">
      <p className="title">capital letters</p>
        {/* <p className="description"  style={{color: 'black'}}>Sign up</p> */}
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
            <p
              className="description"
              style={{ color: "black", cursor: "pointer" }}
              onClick={navigate(RoutePaths.SIGNIN)}
            >
              <a href="#" onClick={navigate(RoutePaths.SIGNIN)}>
              already have an account? sign in
                </a>
              
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
