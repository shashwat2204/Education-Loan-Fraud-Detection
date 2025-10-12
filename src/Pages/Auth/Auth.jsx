import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  Typography,
  Box,
  Divider,
  Fade,
} from "@mui/material";
import { Google, Facebook, LinkedIn } from "@mui/icons-material";
import {Link} from "react-router-dom"

// -------------------------------------------------------------------
// THIS LINE CONNECTS THE CSS FILE
import "../../styles/pages/auth/Authpage.css"; 
// -------------------------------------------------------------------

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  // Helper styles for TextField to keep the unique glassmorphism look
  const textFieldInputProps = {
    style: {
      backgroundColor: "rgba(255,255,255,0.2)",
      color: "white",
    },
  };
  const textFieldLabelProps = { style: { color: "#ddd" } };

  return (
    <div className="auth-page-container">
      {/* Glassmorphic Card */}
      <div className="auth-card">
        {/* Left Section (Form) */}
        <div className="auth-section auth-form-section">
          <Fade in timeout={800}>
            <div className="auth-form-content">
              <Typography
                variant="h4"
                fontWeight={700}
                color="white"
                gutterBottom
              >
                {isSignUp ? "Create Account" : "Welcome Back!"}
              </Typography>

              <Typography variant="body2" color="white" className="auth-subtitle">
                {isSignUp
                  ? "Join our community and get started in seconds!"
                  : "Sign in to continue your journey with us."}
              </Typography>

              {/* Social Icons (MUI SX kept for brevity) */}
              <div className="auth-social-icons">
                <IconButton sx={{ bgcolor: "rgba(255,255,255,0.15)" }}>
                  <Facebook sx={{ color: "white" }} />
                </IconButton>
                <IconButton sx={{ bgcolor: "rgba(255,255,255,0.15)" }}>
                  <Google sx={{ color: "white" }} />
                </IconButton>
                <IconButton sx={{ bgcolor: "rgba(255,255,255,0.15)" }}>
                  <LinkedIn sx={{ color: "white" }} />
                </IconButton>
              </div>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.3)", mb: 3 }}>
                <Typography color="white" variant="body2">
                  or use your email
                </Typography>
              </Divider>

              {/* Form */}
              <Box component="form" className="auth-form">
                {isSignUp && (
                  <TextField
                    label="Full Name"
                    variant="filled"
                    size="small"
                    fullWidth
                    InputProps={textFieldInputProps}
                    InputLabelProps={textFieldLabelProps}
                  />
                )}
                <TextField
                  label="Email"
                  variant="filled"
                  size="small"
                  fullWidth
                  InputProps={textFieldInputProps}
                  InputLabelProps={textFieldLabelProps}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="filled"
                  size="small"
                  fullWidth
                  InputProps={textFieldInputProps}
                  InputLabelProps={textFieldLabelProps}
                />

                {!isSignUp && (
                  <Typography
                    variant="body2"
                    align="right"
                    className="auth-forgot-password"
                  >
                    Forgot Password?
                  </Typography>
                )}

                <Button
                  variant="contained" component = {Link} to = "/dashboardHome"
                  // MUI SX styles kept for component customization
                  sx={{
                    mt: 3,
                    py: 1.2,
                    borderRadius: "25px",
                    backgroundColor: "#fff",
                    color: "#6b21a8",
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1rem",
                    boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                  fullWidth
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
              </Box>
            </div>
          </Fade>
        </div>

        {/* Right Section (Showcase Panel) */}
        <div className="auth-section auth-showcase-panel">
          <Fade in timeout={1000}>
            <div className="auth-showcase-content">
              <Typography
                variant="h3"
                fontWeight={700}
                className="auth-showcase-title"
                gutterBottom
              >
                {isSignUp ? "Welcome Back!" : "Hello, Friend!"}
              </Typography>

              <Typography
                variant="body1"
                sx={{ maxWidth: 320, mb: 5, opacity: 0.9 }}
              >
                {isSignUp
                  ? "To keep connected with us, please sign in with your personal info."
                  : "Enter your personal details and start your journey with us."}
              </Typography>

              <Button
                variant="outlined"
                onClick={() => setIsSignUp(!isSignUp)}
                // MUI SX styles kept for component customization
                sx={{
                  borderColor: "#fff",
                  color: "#fff",
                  borderRadius: "25px",
                  px: 5,
                  py: 1,
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                  },
                }}
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </Button>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}