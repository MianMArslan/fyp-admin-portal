import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import NotificationCard from "./NotificationCard/index";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Notifications(props) {
  const { rows } = props;
  const [progress, setProgress] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  let [color, setColor] = React.useState("#fb9e00");

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setProgress(true);
    }, 3000);
  }, []);
  return (
    <Card
      sx={{ width: 420, height: 360 }}
      style={{
        borderRadius: "10px",
      }}
      elevation={5}
    >
      <CardHeader
        action={
          <>
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => {}} style={{ padding: "10px" }}>
                <MarkEmailReadIcon
                  style={{ fontSize: "18px", color: "grey" }}
                />
                <Typography variant="body2" style={{ marginLeft: "5px" }}>
                  Read
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => {}} style={{ padding: "10px" }}>
                <MarkEmailReadIcon
                  style={{ fontSize: "18px", color: "grey" }}
                />
                <Typography variant="body2" style={{ marginLeft: "5px" }}>
                  Un Read
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => {}} style={{ padding: "10px" }}>
                <MarkEmailUnreadIcon
                  style={{ fontSize: "18px", color: "grey" }}
                />
                <Typography variant="body2" style={{ marginLeft: "5px" }}>
                  Delate All Read
                </Typography>
              </MenuItem>
            </Menu>
          </>
        }
        title="Notifications"
      />
      <CardContent style={{ overflowY: "scroll", height: "250px" }}>
        {progress ? (
          <>
            {rows.map((row) => (
              <NotificationCard key={row.id} data={row} />
            ))}
          </>
        ) : (
          <Box
            style={{
              height: "100%",
              width: "100",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RingLoader color={color} css={override} loading={!progress} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
