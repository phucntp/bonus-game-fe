import * as React from "react";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

export default function AutoCloseMessage({ visible, time, message, setVisible }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setVisible(false);
  };

  React.useEffect(() => {
    setOpen(!!visible);
  }, [visible]);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open || visible}
        autoHideDuration={time || 2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {message || "Thành công"}
        </Alert>
      </Snackbar>
    </div>
  );
}
