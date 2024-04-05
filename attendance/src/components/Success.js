import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

import CloseIcon from "@mui/icons-material/Close";

export default function SuccessAlert({ open, setOpen, mode, dates }) {
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
          {mode === "delete"
            ? "Member removed."
            : mode === "dates"
            ? // ? "Dates submitted successfully!"
              `${
                dates.length > 0 ? dates.join(", ") : "No dates selected."
              } submitted successfully!`
            : "Member added successfully!"}
        </Alert>
      </Collapse>
    </Box>
  );
}
