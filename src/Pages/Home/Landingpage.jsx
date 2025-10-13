import Navbar from "../../Component/Navbar";
import { Box, Typography, Button } from "@mui/material";
import {Link} from "react-router-dom"
import "./Landingpage.css"; // We'll add animations here

function Landingpage() {
  return (
    <div>
      <Navbar />
      <Box className="hero-section">
        <Typography variant="h2" className="hero-title">
          Detect Fraud Instantly
        </Typography>
        <Typography variant="h6" className="hero-subtitle">
          AI-powered platform to analyze and prevent fraudulent activities in real-time.
        </Typography>
        <Button variant="contained" color="primary" className="hero-button" component={Link} // ✅ Use Link as component
          to="/auth">
          Get Started
        </Button>
      </Box>
    </div>
  );
}

export default Landingpage;
