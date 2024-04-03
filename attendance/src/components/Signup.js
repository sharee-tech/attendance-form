import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../config/supabaseClient";

export default function Signup() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const register = (email, password) =>
    supabase.auth.signUp({ email, password });

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !passwordRef.current?.value ||
      !emailRef.current?.value ||
      !confirmPasswordRef.current?.value
    ) {
      setErrorMsg("Please fill all the fields");
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMsg("Passwords don't match");
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      const { data, error } = await register(
        emailRef.current.value,
        passwordRef.current.value
      );
      if (!error && data) {
        setMsg(
          "Registration Successful. Check your email to confirm your account"
        );
      }
    } catch (error) {
      setErrorMsg("Error in Creating Account");
    }
    setLoading(false);
  }

  return (
    <>
      <div className="card">
        <h2>Register for an account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="input-email">Email</label>
            <input id="input-email" type="email" ref={emailRef} required />
          </div>
          <div className="form-group">
            <label htmlFor="input-password">Password</label>
            <input
              id="input-password"
              type="password"
              ref={passwordRef}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              ref={confirmPasswordRef}
              required
            />
          </div>
          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          )}
          {msg && (
            <div className="alert alert-success" role="alert">
              {msg}
            </div>
          )}

          <div className="text-center mt-2">
            <button disabled={false} type="submit" className="w-50">
              Register
            </button>
          </div>

          {/* <button type="submit">Sign up</button> */}
        </form>
        <br></br>
      </div>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </>
  );
}
