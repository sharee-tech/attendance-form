import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https:cccckc.org"
        style={{ textDecoration: "none", marginRight: ".25 rem" }}
      >
        Country Club Christian Church |
      </Link>
      {new Date().getFullYear()}.
    </Typography>
  );
}
