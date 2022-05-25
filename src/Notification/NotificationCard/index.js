import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import * as React from "react";
import "./notificationCard.css";
import tz from "moment-timezone";
import { UPDATE } from "../../services/httpClient";
export default function NotificationCard(props) {
  const { data, state } = props;
  const updateNotificationStatus = async () => {
    let record = await UPDATE("/admin/notification", { id: data.id });
    if (record) await state();
  };

  return (
    <Card
      style={{
        width: "100%",
        marginBottom: "5px",
        cursor: "pointer",
        boxShadow: data.isRead ? "2px 2px green" : "2px 2px red",
      }}
      elevation={2}
      onClick={() => {
        updateNotificationStatus();
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={`${data.message} ${
          data?.user?.firstName ? data?.user?.firstName : ""
        } ${data?.user?.lastName ? data?.user?.lastName : ""} as ${
          data?.user?.roles[0]?.title ? data?.user?.roles[0]?.title : ""
        }`}
        subheader={tz(data.createdAt).format("MMM Do YY")}
      />
    </Card>
  );
}
