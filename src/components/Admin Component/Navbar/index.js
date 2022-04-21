import React from "react";
import "./Navbar.css";
import img1 from "../../images/off the beaten track.png";
import img2 from "../../images/img4.jpg";
import Notification from "../../../Notification/index";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { IconButton } from "@mui/material";

export default function NavbarAdmin() {
  const [notification, setNotification] = React.useState(false);

  return (
    <div className="navbar">
      <div className="navbarWrapper">
        <div className="navleft">
          <img src={img1} className="navbarAvater" alt="websitelogo"></img>
        </div>
        <div className="navright">
          <div className="navbarIconContainer">
            <IconButton
              color="inherit"
              onClick={() => setNotification(!notification)}
            >
              <Badge
                badgeContent={10}
                style={{ color: "black", backgroundColor: "fb9e00" }}
                max={100}
              >
                <NotificationsNoneIcon style={{ color: "fb9e00" }} />
              </Badge>
            </IconButton>
          </div>
          <img src={img2} className="navAvater" alt="userprofile"></img>
        </div>
      </div>
      {notification && (
        <div
          style={{
            zIndex: 10,
            position: "fixed",
            top: "70px",
            right: "10px",
          }}
        >
          <Notification />
        </div>
      )}
    </div>
  );
}
