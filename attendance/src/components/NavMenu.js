// import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { NavLink } from "react-router-dom";

const NavMenu = () => {
  const { auth, signOut } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signOut();
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="nav-menu">
      <div className="container">
        <div className="nav-menu-left">
          <div className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </div>
        </div>
        <div className="nav-menu-right">
          {/* {!auth && (
            <div className="nav-item">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </div>
          )}
          {!auth && (
            <div className="nav-item">
              <NavLink to="/signup" className="nav-link">
                Register
              </NavLink>
            </div>
          )} */}
          {auth && (
            <div className="nav-item">
              <NavLink to="/admin" className="nav-link">
                Absences
              </NavLink>
            </div>
          )}
          {auth && (
            <div className="nav-item">
              <NavLink to="roster" className="nav-link">
                Roster
              </NavLink>
            </div>
          )}
          {/* {auth && (
            <div className="nav-item">
              <button onClick={handleLogout} className="logout-btn">
                LogOut
              </button>
            </div>
          )} */}
          {auth && (
            <div className="nav-item dropdown">
              <span className="dropbtn">⚙️</span>
              <div class="dropdown-content">
                <a href="/admin">Account</a>
                <a href="#" onClick={handleLogout}>
                  LogOut
                </a>
              </div>
            </div>
          )}
          {!auth && (
            <div className="nav-item dropdown">
              <span className="dropbtn">⚙️</span>
              <div class="dropdown-content">
                <a href="/signup">Register</a>
                <a href="/login">Login</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
