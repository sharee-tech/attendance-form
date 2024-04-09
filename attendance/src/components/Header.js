import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const path = useLocation();
  return (
    <header>
      {(() => {
        switch (path.pathname) {
          case "/admin":
            return (
              <>
                <NavLink to="/" className="link">
                  HOME
                </NavLink>
                <NavLink to="/roster" className="link">
                  ROSTER
                </NavLink>
              </>
            );
          case "/":
            return <span></span>;
          case "/members":
            return (
              <>
                <NavLink to="/" className="link">
                  HOME
                </NavLink>
                <NavLink to="/admin" className="link">
                  ABSENCES
                </NavLink>
              </>
            );
          case "/roster":
            return (
              <>
                <NavLink to="/" className="link">
                  HOME
                </NavLink>
                <NavLink to="/admin" className="link">
                  ABSENCES
                </NavLink>
              </>
            );
          case "/absences":
            return (
              <>
                <NavLink to="/admin" className="link">
                  ADMIN
                </NavLink>
                <p className="link">EDIT</p>
              </>
            );
          case "/login":
            return (
              <NavLink to="/" className="nav">
                HOME
              </NavLink>
            );
          default:
            return (
              <NavLink to="/" className="nav">
                HOME
              </NavLink>
            );
        }
      })()}
    </header>
  );
}
