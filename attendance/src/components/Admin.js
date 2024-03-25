import { NavLink } from "react-router-dom";
import Header from "./Header";

export default function Admin() {
  return (
    <>
      <Header />
      <h1>Admin</h1>
      <ul>
        <li>
          <NavLink
            to="/members"
            style={{
              textDecoration: "none",
              color: "#303030",
              fontSize: "12px",
            }}
          >
            Manage Choir Members
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/absences"
            style={{
              textDecoration: "none",
              color: "#303030",
              fontSize: "12px",
            }}
          >
            View Absences
          </NavLink>
        </li>
      </ul>
    </>
  );
}
