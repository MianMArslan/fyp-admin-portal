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
  const [amount, setAmount] = React.useState(dialogData.amount);
  const [description, setDescription] = React.useState(dialogData.description);
  const [discount, setDiscount] = React.useState(dialogData.discount);
  const [phone, setPhone] = React.useState(dialogData.phone);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [type, setType] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setOpenDialog(false);
    getRecord();
  };

  const handleSave = async () => {
    // let res = await UPDATE("/agency", {
    //   amount,
    //   discount,
    //   phone,
    //   description,
    //   id: dialogData.id,
    // });
    // if (res?.code === 200) {
    //   setType("success");
    //   setOpenSnackbar(true);
    //   setSnackbarMessage(res?.message);
    //   setTimeout(() => {
    //     handleClose();
    //   }, 1000);
    // } else {
    //   setType("error");
    //   setOpenSnackbar(true);
    //   setSnackbarMessage(res?.data.message);
    // }
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
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
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
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone"
            fullWidth
            type="text"
            variant="standard"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            type="text"
            variant="standard"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount"
            fullWidth
            variant="standard"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="discount"
            label="Discount"
            fullWidth
            variant="standard"
            value={discount}
            onChange={(e) => {
              setDiscount(e.target.value);
            }}
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
