import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../RoutePaths";
import { Link } from 'react-router-dom'


export default function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

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
      // navigate(RoutePaths.HOME);
      navigate(RoutePaths.MAP);

    }
    setLoading(false);
  };

  return (
    <div className="col flex flex-center">
      <div className="col-6 form-widget">
      <p className="title">capital letters</p>
        {/* <p className="description" style={{ color: "black" }}>Sign In</p> */}
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
            <p className="description" style={{color: 'black'}}>
            <Link to={() => navigate(RoutePaths.AUTH)}>don't have an account? sign up</Link>
                </p>
          </div>
        </form>
      </div>
    </div>
  );
}
