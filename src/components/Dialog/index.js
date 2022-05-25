import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./dialog.css";
import Snackbar from "../Snackbar/index";
import { UPDATE } from "../../services/httpClient";
import PersonIcon from "@mui/icons-material/Person";

export default function FormDialog(props) {
  const { dialogData, setOpenDialog, getRecord } = props;
  const [open, setOpen] = React.useState(true);
  const [firstName, setFirstName] = React.useState(dialogData.firstName);
  const [lastName, setLastName] = React.useState(dialogData.lastName);
  const [email] = React.useState(dialogData.email);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [type, setType] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setOpenDialog(false);
    getRecord();
  };

  const handleSave = async () => {
    let res = await UPDATE("/admin/user", {
      firstName,
      lastName,
      id: dialogData.id,
    });
    if (res?.code === 201) {
      setType("success");
      setOpenSnackbar(true);
      setSnackbarMessage(res?.message);
      setTimeout(() => {
        handleClose();
      }, 1000);
    } else {
      setType("error");
      setOpenSnackbar(true);
      setSnackbarMessage(res?.message);
    }
  };

  return (
    <div className="dialog">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <PersonIcon
            fontSize="large"
            style={{ width: "100%", height: "100px" }}
            sx={{ color: "#fb9e00" }}
          />
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            fullWidth
            type="text"
            variant="standard"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            label="Last Name"
            fullWidth
            type="text"
            variant="standard"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            fullWidth
            disabled
            type="text"
            variant="standard"
            value={email}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "#fb9e00" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button style={{ color: "#fb9e00" }} onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {openSnackbar && (
        <Snackbar
          open={open}
          setOpen={setOpen}
          type={type}
          message={snackbarMessage}
        />
      )}
    </div>
  );
}
