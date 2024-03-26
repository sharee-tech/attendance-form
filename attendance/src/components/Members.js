import Header from "./Header";
import { useState } from "react";

export default function Members() {
  const [members, setMembers] = useState([]);
  return (
    <>
      <Header />
      <h1>Members</h1>
    </>
  );
}
