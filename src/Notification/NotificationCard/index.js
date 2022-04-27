import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import * as React from "react";
import "./notificationCard.css";
import tz from "moment-timezone";

export default function NotificationCard(props) {
  const { data } = props;

  return (
    <Card
      style={{ width: "100%", marginBottom: "5px", cursor: "pointer" }}
      elevation={2}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={`${data.message} ${data.user.firstName} ${data.user.lastName} as ${data.user.roles[0].title}`}
        subheader={tz(data.createdAt).format("MMM Do YY")}
      />
    </Card>
  );
}
