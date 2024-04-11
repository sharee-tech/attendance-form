import React, { useRef, useState } from "react";

import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const UpdatePassword = () => {
  const { auth, updatePassword } = useAuth();
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth) {
      setErrorMsg("Must be logged in to update password.");
      return;
    }
    if (!passwordRef.current?.value || !confirmPasswordRef.current?.value) {
      setErrorMsg("Please fill all the fields.");
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMsg("Passwords doesn't match. Try again");
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      const { data, error } = await updatePassword(passwordRef.current.value);
      if (!error) {
        navigate("/login");
      }
    } catch (error) {
      setErrorMsg("Error in Updating Password. Please try again");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="text-center">Update Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                ref={passwordRef}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirm-password"
                ref={confirmPasswordRef}
                required
              />
            </div>
            {errorMsg && (
              <div className="alert alert-danger" role="alert">
                {errorMsg}
                <button
                  type="button"
                  className="cstm-button close"
                  onClick={() => setErrorMsg("")}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            <div className="text-center mt-2">
              <button
                disabled={loading}
                type="submit"
                className="cstm-button btn btn-primary"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-100 text-center mt-2">
        Back to Login? <Link to="/login">Login</Link>
      </div>
    </>
  );
};

export default UpdatePassword;
