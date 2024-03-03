import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../RoutePaths";
import { Link } from "react-router-dom";

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

    if (data && data.user) {
      const { error: insertError } = await supabase.from("profiles").insert([
        {
          user_id: data.user.id,
        },
      ]);

      if (insertError) {
        console.error(
          "Error inserting user into 'profiles' table:",
          insertError
        );
      }
    }

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
              placeholder="email"
              value={signUpEmail}
              required={true}
              onChange={(e) => setSignUpEmail(e.target.value)}
              style={{
                width: "20%", // Make the input box full width
                padding: "10px", // Add some padding
                border: "1px solid #ccc", // Add a border
                borderRadius: "15px", // Add border radius
                backgroundColor: "#fff", // Set background color to white
                marginBottom: "10px",
                color: "black",
              }}
            />
          </div>
          <div>
            <input
              className="inputField"
              type="password"
              placeholder="password"
              value={signUpPassword}
              required={true}
              onChange={(e) => setSignUpPassword(e.target.value)}
              style={{
                width: "20%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "15px",
                backgroundColor: "#fff",
                marginBottom: "10px",
                color: "black",
              }}
            />
          </div>
          <div>
          <div className={"signin-button"}>
            <button className={"button block"} disabled={loading}
            onClick={handleSignUp}
            style={{
              color: '#ffffff', 
              border: 'none',
              padding: '10px 20px',
              borderRadius: '20px',
              cursor: 'pointer',
            }}
              >
              {loading ? <span>loading</span> : <span>create account</span>}
            </button>
            </div>
            <p
              className="description"
              onClick={() => navigate(RoutePaths.SIGNIN)}
            >
              <Link
                to={() => navigate(RoutePaths.SIGNIN)}
                style={{
                  color: "grey",
                  fontSize: "14px",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.target.style.color = "pink")}
                onMouseLeave={(e) => (e.target.style.color = "grey")}
              >
                already have an account? sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
