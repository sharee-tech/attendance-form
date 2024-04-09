import { useRef, useState } from "react";
import { useAuth } from "../context/AuthProvider";

import { Link } from "react-router-dom";

const PasswordReset = () => {
  const { passwordReset } = useAuth();
  const emailRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data, error } = await passwordReset(emailRef.current.value);
      console.log(error);
      console.log(data);
      setMsg("Password reset has been sent to your email");
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                ref={emailRef}
                required
              />
            </div>
            {msg && (
              <div className="alert alert-success" role="alert">
                {msg}
                <button
                  type="button"
                  className="close"
                  onClick={() => setMsg("")}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            <div className="text-center mt-2">
              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary w-50"
                style={{ padding: ".8rem .5rem" }}
              >
                Send Reset Link
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

export default PasswordReset;
