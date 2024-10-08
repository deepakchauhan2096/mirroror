import { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Grid,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ShareIcon from "@mui/icons-material/Share";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkIcon from "@mui/icons-material/Link";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PropTypes from "prop-types";

const users = [
  { name: "HindiWaadi", img: "" },
  { name: "deepesh vtas", img: "https://example.com/deepesh.jpg" },
  { name: "Santosh Pandit", img: "https://example.com/santosh.jpg" },
  { name: "NITESH SINGH", img: "https://example.com/nitesh.jpg" },
  { name: "Ankit Sharma", img: "https://example.com/ankit.jpg" },
  { name: "garima❤️", img: "https://example.com/garima.jpg" },
];

const SnakeBar = ({ onShare, snackbarOpen, setSnackbarOpen }) => {
  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setSnackbarOpen(open);
  };

  // Function to share the link via the Web Share API
  const handleShareViaLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Check this out!',
          url: window.location.href,
        })
        .then(() => console.log('Share successful'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert("Sharing is not supported in this browser.");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 2 }}>
      {/* Scrollable Avatars */}
      <Box sx={{ display: "flex", overflowX: "auto", gap: 2, paddingBottom: 2 }}>
        {users.map((user, index) => (
          <Box key={index} sx={{ textAlign: "center" }}>
            <Avatar src={user.img} alt={user.name} sx={{ width: 56, height: 56, margin: "auto" }} />
            <Typography variant="caption">{user.name}</Typography>
          </Box>
        ))}
      </Box>

      {/* Action Buttons */}
      <Grid container justifyContent="space-between" sx={{ paddingTop: 2 }}>
        <IconButton>
          <AddCircleOutlineIcon />
        </IconButton>
        <IconButton onClick={toggleDrawer(true)}>
          <ShareIcon />
        </IconButton>
        <IconButton>
          <FacebookIcon />
        </IconButton>
        <IconButton>
          <LinkIcon />
        </IconButton>
      </Grid>

      {/* Swipeable Drawer for Sharing Options */}
      <SwipeableDrawer anchor="bottom" open={snackbarOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        <Box sx={{ width: "auto" }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            <ListItem button onClick={onShare}>
              <ListItemIcon>
                <ShareIcon />
              </ListItemIcon>
              <ListItemText primary="Share" />
            </ListItem>
            <ListItem button onClick={() => navigator.clipboard.writeText(window.location.href)}>
              <ListItemIcon>
                <ContentCopyIcon />
              </ListItemIcon>
              <ListItemText primary="Copy Link" />
            </ListItem>
            <ListItem button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`)}>
              <ListItemIcon>
                <FacebookIcon />
              </ListItemIcon>
              <ListItemText primary="Share on Facebook" />
            </ListItem>
            <ListItem button onClick={handleShareViaLink}>
              <ListItemIcon>
                <LinkIcon />
              </ListItemIcon>
              <ListItemText primary="Share via Link" />
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

// Prop types definition
SnakeBar.propTypes = {
  onShare: PropTypes.func.isRequired, // Required function for sharing action
  snackbarOpen: PropTypes.bool.isRequired, // Required boolean to control drawer visibility
  setSnackbarOpen: PropTypes.func.isRequired, // Required function to set drawer visibility state
};

export default SnakeBar;
