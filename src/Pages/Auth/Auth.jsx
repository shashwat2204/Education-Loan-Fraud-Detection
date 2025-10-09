import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex w-[900px] h-[550px] bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Panel (Sign In / Sign Up Form) */}
        <div className="w-1/2 flex flex-col justify-center items-center p-8">
          {isSignUp ? (
            <div className="w-full max-w-sm text-center">
              <h2 className="text-3xl font-semibold mb-3">Create Account</h2>
              <div className="flex justify-center gap-3 mb-3">
                <span className="cursor-pointer text-xl">🔵</span>
                <span className="cursor-pointer text-xl">🔴</span>
                <span className="cursor-pointer text-xl">⚫</span>
              </div>
              <p className="text-gray-500 mb-4">or use your email for registration</p>
              <form className="flex flex-col gap-3">
                <TextField label="Name" variant="outlined" size="small" fullWidth />
                <TextField label="Email" variant="outlined" size="small" fullWidth />
                <TextField label="Password" type="password" variant="outlined" size="small" fullWidth />
                <Button variant="contained" color="error" className="!mt-3" fullWidth>
                  Sign Up
                </Button>
              </form>
            </div>
          ) : (
            <div className="w-full max-w-sm text-center">
              <h2 className="text-3xl font-semibold mb-3">Sign In</h2>
              <div className="flex justify-center gap-3 mb-3">
                <span className="cursor-pointer text-xl">🔵</span>
                <span className="cursor-pointer text-xl">🔴</span>
                <span className="cursor-pointer text-xl">⚫</span>
              </div>
              <p className="text-gray-500 mb-4">or use your account</p>
              <form className="flex flex-col gap-3">
                <TextField label="Email" variant="outlined" size="small" fullWidth />
                <TextField label="Password" type="password" variant="outlined" size="small" fullWidth />
                <a href="#" className="text-sm text-blue-500 text-right">
                  Forgot password?
                </a>
                <Button variant="contained" color="error" className="!mt-3" fullWidth>
                  Sign In
                </Button>
              </form>
            </div>
          )}
        </div>

        {/* Right Overlay Panel */}
        <div
          className={`w-1/2 flex flex-col justify-center items-center text-center text-white transition-all duration-700 ${
            isSignUp ? "bg-gradient-to-r from-pink-500 to-red-500" : "bg-gradient-to-r from-indigo-500 to-blue-500"
          }`}
        >
          {isSignUp ? (
            <>
              <h2 className="text-3xl font-semibold mb-3">Welcome Back!</h2>
              <p className="max-w-xs mb-5">
                To keep connected with us, please sign in with your personal info
              </p>
              <Button
                variant="outlined"
                onClick={() => setIsSignUp(false)}
                sx={{ borderColor: "#fff", color: "#fff" }}
              >
                Sign In
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-semibold mb-3">Hello, Friend!</h2>
              <p className="max-w-xs mb-5">
                Enter your personal details and start your journey with us
              </p>
              <Button
                variant="outlined"
                onClick={() => setIsSignUp(true)}
                sx={{ borderColor: "#fff", color: "#fff" }}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
