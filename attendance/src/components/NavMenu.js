import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

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
          <Link to="/" className="nav-menu-brand">
            HOME
          </Link>
          {!auth && (
            <div className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </div>
          )}
          {!auth && (
            <div className="nav-item">
              <Link to="/signup" className="nav-link">
                Register
              </Link>
            </div>
          )}
          {auth && (
            <div className="nav-item">
              <Link to="/admin" className="nav-link">
                Absences
              </Link>
            </div>
          )}
          {auth && (
            <div className="nav-item">
              <Link to="roster" className="nav-link">
                Roster
              </Link>
            </div>
          )}
        </div>
        <div className="nav-menu-collapse">
          {auth && (
            <div className="nav-item">
              <button onClick={handleLogout} className="nav-link logout-btn">
                LogOut
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
