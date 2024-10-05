import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PropTypes from "prop-types";

export default function Create({ openCreate, handleCreateClose }) {
  const list = () => (
    <Box
      sx={{ width: openCreate ? "auto" : 250 }}
      role="presentation"
      onClick={handleCreateClose}
      onKeyDown={handleCreateClose}
    >
      <Divider
        sx={{
          borderColor: "#333",
          borderWidth: "2px",
          width: "25%",
          margin: "8px auto",
          borderRadius: "10px",
        }}
      />

      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {/* <Button onClick={}>{"bottom"}</Button> */}
      <SwipeableDrawer
        anchor={"bottom"}
        open={openCreate}
        onClose={handleCreateClose}
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          },
        }}
      >
        {list("bottom")}
      </SwipeableDrawer>
    </div>
  );
}

Create.propTypes = {
  handleCreateClose: PropTypes.func.isRequired,
  openCreate: PropTypes.any.isRequired,
};
