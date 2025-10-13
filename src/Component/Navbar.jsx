import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ padding: "0 2rem" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          FraudDetect
        </Typography>
        <Box>
          <Button color="primary">Home</Button>
          <Button color="primary">Features</Button>
          <Button color="primary">Contact</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
