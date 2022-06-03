import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(true);

  const handleNo = () => {
    setOpen(false);
    window.location.replace("http://localhost:3002/");
  };
  const handleYes = () => {
    setOpen(false);
    cookies.remove("accessToken");
    window.location.replace("http://localhost:3000/");
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleNo}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to logout.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="warning" onClick={handleYes}>
            Yes
          </Button>
          <Button color="warning" onClick={handleNo}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
