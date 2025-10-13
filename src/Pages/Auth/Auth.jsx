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

  const textFieldInputProps = {
    style: { backgroundColor: "rgba(255,255,255,0.2)", color: "white" },
  };
  const textFieldLabelProps = { style: { color: "#ddd" } };

  return (
    <div className="auth-page-container">
      


{/* ⭐ Floating Stars */}
<div className="floating-stars-container">
  {Array.from({length: 50}).map((_, i) => (
    <div
      key={i}
      className="floating-star"
      style={{
        top: `${Math.random()*100}%`,
        left: `${Math.random()*100}%`,
        animationDelay: `${Math.random()*20}s`
      }}
    />
  ))}
</div>

{/* 🌊 Subtle Waves */}
<div className="floating-wave wave-0"></div>
<div className="floating-wave wave-1"></div>
<div className="floating-wave wave-2"></div>


      {/* Main Glass Card */}
      <div className="auth-card enhanced-shadow">
        {/* Left Form Section */}
        <div className="auth-section auth-form-section">
          <Fade in timeout={800}>
            <div className="auth-form-content">
              <Typography variant="h4" fontWeight={700} color="white" gutterBottom>
                {isSignUp ? "Create Account" : "Welcome Back!"}
              </Typography>

              <Typography variant="body2" color="white" className="auth-subtitle">
                {isSignUp
                  ? "Join our community and get started in seconds!"
                  : "Sign in to continue your journey with us."}
              </Typography>

              <div className="auth-social-icons">
                <IconButton className="social-btn"><Facebook sx={{ color: "white" }} /></IconButton>
                <IconButton className="social-btn"><Google sx={{ color: "white" }} /></IconButton>
                <IconButton className="social-btn"><LinkedIn sx={{ color: "white" }} /></IconButton>
              </div>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.3)", mb: 3 }}>
                <Typography color="white" variant="body2">or use your email</Typography>
              </Divider>

              <Box component="form" className="auth-form">
                {isSignUp && (
                  <TextField label="Full Name" variant="filled" size="small" fullWidth
                    InputProps={textFieldInputProps} InputLabelProps={textFieldLabelProps} />
                )}
                <TextField label="Email" variant="filled" size="small" fullWidth
                  InputProps={textFieldInputProps} InputLabelProps={textFieldLabelProps} />
                <TextField label="Password" type="password" variant="filled" size="small" fullWidth
                  InputProps={textFieldInputProps} InputLabelProps={textFieldLabelProps} />

                {!isSignUp && (
                  <Typography variant="body2" align="right" className="auth-forgot-password">
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

        {/* Right Showcase Section */}
        <div className="auth-section auth-showcase-panel">
          <Fade in timeout={1000}>
            <div className="auth-showcase-content">
              <Typography variant="h3" fontWeight={700} className="auth-showcase-title" gutterBottom>
                {isSignUp ? "Welcome Back!" : "Hello, Friend!"}
              </Typography>

              <Typography variant="body1" sx={{ maxWidth: 320, mb: 5, opacity: 0.9 }}>
                {isSignUp
                  ? "To keep connected with us, please sign in with your personal info."
                  : "Enter your personal details and start your journey with us."}
              </Typography>

              <Button
                variant="outlined"
                className="auth-outline-btn"
                onClick={() => setIsSignUp(!isSignUp)}
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
