import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Footer() {
  return (
    <footer>
      <Typography variant="body2" color="white">
        {"Copyright © "}
        <Link
          color="inherit"
          href="https:cccckc.org"
          style={{
            textDecoration: "none",
            marginRight: ".25rem",
            color: "white",
          }}
        >
          Country Club Christian Church |
        </Link>
        {new Date().getFullYear()}
      </Typography>
    </footer>
  );
}
