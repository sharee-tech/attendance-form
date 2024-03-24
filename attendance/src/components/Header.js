export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "20px",
      }}
    >
      {/* <span style={{ cursor: "pointer", color: "#303030", fontSize: "12px" }}>
        ADMIN LOGIN
      </span> */}
      <a
        href="#"
        style={{ textDecoration: "none", color: "#303030", fontSize: "12px" }}
      >
        ADMIN LOGIN
      </a>
    </header>
  );
}
