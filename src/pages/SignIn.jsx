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
              placeholder="email"
              value={signInEmail}
              required={true}
              onChange={(e) => setSignInEmail(e.target.value)}
              style={{ 
                width: '20%',
                padding: '10px',
                border: '1px solid #ccc', // Add a border
                borderRadius: '15px', // Add border radius
                backgroundColor: '#fff', // Set background color to white
                marginBottom: '10px',
                color: 'black',
              }}
            />
          </div>
          <div>
            <input
              className="inputField"
              type="password"
              placeholder="password"
              value={signInPassword}
              required={true}
              onChange={(e) => setSignInPassword(e.target.value)}
              style={{ 
                width: '20%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '15px',
                backgroundColor: '#fff',
                marginBottom: '10px',
                color: 'black',
              }}
            />
          </div>
          <div >
            <div className={"signin-button"}>
            <button className={"button block"} type="button" disabled={loading}
            onClick={handleLogin}
            style={{
                color: '#ffffff',
                border: 'none',
                padding: '10px 20px', 
                borderRadius: '20px', 
                cursor: 'pointer',
              }}
                >
              {loading ? <span>loading</span> : <span>sign in</span>}
            </button>
            </div>
            <p className="description" onClick={() => navigate(RoutePaths.AUTH)}>
            <Link to={() => navigate(RoutePaths.AUTH)} 
                style={{
                  color: 'grey', 
                  fontSize: '14px', 
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => e.target.style.color = 'pink'}
                onMouseLeave={(e) => e.target.style.color = 'grey'}
                >don't have an account? sign up</Link>
                </p>
          </div>
        </form>
      </div>
    </div>
  );
}
