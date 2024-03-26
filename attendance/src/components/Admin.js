import { NavLink } from "react-router-dom";
import Header from "./Header";
import Absences from "./Absences";

export default function Admin() {
  return (
    <>
      <Header />
      <Absences />
    </>
  );
}
