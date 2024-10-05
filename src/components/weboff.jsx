import { Box, Typography, Container } from "@mui/material";
import Error from "../assets/404.jpg"

const Weboff = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h1" color="primary" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" color="text.secondary" paragraph>
          Oops! This App is Not Available For Website, Please Try Mobile
          Browser.
        </Typography>
        <img
          src={Error}
          alt="404 Not Found"
          style={{ width: "20%", maxWidth: "500px", marginBottom: "20px" }}
        />
      </Box>
    </Container>
  );
};

export default Weboff;
