import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const path = useLocation();
  console.log(path.pathname);
  return (
    <header>
      {(() => {
        switch (path.pathname) {
          case "/admin":
            return (
              <NavLink to="/" className="link">
                HOME
              </NavLink>
            );
          case "/":
            return (
              <NavLink to="/admin" className="link">
                ADMIN
              </NavLink>
            );
          case "/members":
            return (
              <NavLink to="/admin" className="link">
                ADMIN
              </NavLink>
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
      {/* {path.pathname !== "/" ? (
        <NavLink to="/" className="nav">
          HOME
        </NavLink>
      ) : (
        <NavLink to="/admin" className="nav">
          ADMIN
        </NavLink>
      )} */}
    </header>
  );
}