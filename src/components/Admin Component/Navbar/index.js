import React, { useEffect } from "react";
import "./Navbar.css";
import img1 from "../../images/shortLogo.PNG";
import img2 from "../../images/img4.jpg";
import Notification from "../../../Notification/index";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { IconButton } from "@mui/material";
import { GET } from "../../../services/httpClient";

export default function NavbarAdmin() {
  const [notification, setNotification] = React.useState(false);
  const [rows, setRows] = React.useState("");
  const [count, setCount] = React.useState(0);

  const getNotification = async () => {
    let data = await GET("/admin/notification", { params: { isRead: false } });
    if (data) {
      setRows(data.rows);
      setCount(data.count);
    }
  };

  useEffect(() => {
    getNotification();
  }, []);
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
                badgeContent={count}
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
          <Notification rows={rows} />
        </div>
      )}
    </div>
  );
}
