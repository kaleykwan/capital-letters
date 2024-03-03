import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../RoutePaths";
import { Link } from 'react-router-dom'

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

    // const { signInData, signInError } = await supabase.auth.signInWithPassword({
    //   email: signUpEmail,
    //   password: signUpPassword,
    // });

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
              style={{ 
                width: '20%', // Make the input box full width
                padding: '10px', // Add some padding
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
              placeholder="Password"
              value={signUpPassword}
              required={true}
              onChange={(e) => setSignUpPassword(e.target.value)}
              style={{ 
                width: '20%', // Make the input box full width
                padding: '10px', // Add some padding
                border: '1px solid #ccc', // Add a border
                borderRadius: '15px', // Add border radius
                backgroundColor: '#fff', // Set background color to white
                marginBottom: '10px',
                color: 'black',
              }}
            />
          </div>
          <div>
            <button className={"button block"} disabled={loading}
            style={{
              backgroundColor: '#000000', /* Set the default background color */
              color: '#ffffff', /* Set the default text color */
              border: 'none', /* Remove border */
              padding: '10px 20px', /* Add padding */
              borderRadius: '20px', /* Add border radius */
              cursor: 'pointer', /* Change cursor to pointer */
            }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#ff38d1'} /* Change background color on hover */
              onMouseLeave={(e) => e.target.style.backgroundColor = '#000000'}
              >
              {loading ? <span>Loading</span> : <span>Create Account</span>}
            </button>
            <p
              className="description"
              onClick={() => navigate(RoutePaths.SIGNIN)}
            >
               <Link to={() => navigate(RoutePaths.SIGNIN)}
               style={{
                color: 'grey', 
                fontSize: '14px', 
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => e.target.style.color = 'pink'}
                onMouseLeave={(e) => e.target.style.color = 'grey'}
              >already have an account? sign in</Link>
    
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
