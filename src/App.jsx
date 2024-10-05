import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import your components
import BottomNav from "./components/bottomNav";
import Home from "./pages/home";
import Profile from "./pages/profiles";
import Weboff from "./components/weboff";


function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "light",
      secondary: {
        main: '#e2e5e9',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <div style={{ height: "100vh" }} className="mobile-only">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            {/* Add more routes as needed */}
          </Routes>
          <BottomNav />
        </div>
        <div className="desktop-only">
         <Routes>
            <Route path="/" element={<Weboff />} />
            <Route path="/profile" element={<Weboff />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
