import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";

export default function SuccessAlert({ open, setOpen }) {
  const path = useLocation();
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {path.pathname === "/"
            ? "Dates submitted successfully!"
            : "Member submitted successfully!"}
          {/* Dates submitted successfully! */}
        </Alert>
      </Collapse>
    </Box>
  );
}
