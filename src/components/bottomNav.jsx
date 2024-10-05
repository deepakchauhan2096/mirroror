import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import { Paper } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function LabelBottomNavigation() {
  const location = useLocation(); // Get the current location to highlight the active tab
  const [value, setValue] = React.useState(location.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: location.pathname == "/add" || location.pathname == "/blinks" ? "none" : "",
      }}
      elevation={5}
    >
      <BottomNavigation
        sx={{ width: "100%" }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          // label="Home"
          value="/"
          icon={<HomeOutlinedIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          // label="Favorites"
          value="/favorites"
          icon={<FavoriteBorderOutlinedIcon />}
          component={Link}
          to="/favorites"
        />
        <BottomNavigationAction
          // label="Add"
          value="/add"
          icon={<AddBoxOutlinedIcon />}
          component={Link}
          to="/add"
        />
        <BottomNavigationAction
          // label="Nearby"
          value="/blinks"
          icon={<MovieCreationOutlinedIcon />}
          component={Link}
          to="/blinks"
        />
        <BottomNavigationAction
          // label="Profile"
          value="/profile"
          icon={<AccountCircleOutlinedIcon />}
          component={Link}
          to="/profile"
        />
      </BottomNavigation>
    </Paper>
  );
}
