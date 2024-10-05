import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={5}
    >
      <BottomNavigation
        sx={{ width: "100%" }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<HomeIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Favorites"
          value="/favorites"
          icon={<FavoriteIcon />}
          component={Link}
          to="/favorites"
        />
        <BottomNavigationAction
          label="Add"
          value="/add"
          icon={<AddCircleIcon />}
          component={Link}
          to="/add"
        />
        <BottomNavigationAction
          label="Nearby"
          value="/nearby"
          icon={<LocationOnIcon />}
          component={Link}
          to="/nearby"
        />
        <BottomNavigationAction
          label="Profile"
          value="/profile"
          icon={<AccountCircleIcon />}
          component={Link}
          to="/profile"
        />
      </BottomNavigation>
    </Paper>
  );
}
