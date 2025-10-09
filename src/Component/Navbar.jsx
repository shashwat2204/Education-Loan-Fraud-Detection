import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
const [open, setOpen] = useState(false);

const toggleDrawer = (state) => () => {
setOpen(state);
};

const navItems = ["Home", "About", "Services", "Contact"];

return ( <AppBar position="static" className="bg-white text-gray-800 shadow-md"> <Toolbar className="flex justify-between items-center max-w-7xl mx-auto w-full px-4 py-2">
{/* Logo */} <h1 className="text-2xl font-bold text-blue-600">MyBrand</h1>

```
    {/* Desktop Links */}
    <div className="hidden md:flex space-x-6">
      {navItems.map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          className="hover:text-blue-600 transition-colors duration-200"
        >
          {item}
        </a>
      ))}
    </div>

    {/* Mobile Menu Button */}
    <IconButton
      edge="end"
      className="md:hidden text-gray-800"
      onClick={toggleDrawer(true)}
    >
      <MenuIcon />
    </IconButton>

    {/* Mobile Drawer */}
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <div className="w-64 p-4 flex flex-col space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-600">Menu</h2>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <List>
          {navItems.map((text) => (
            <ListItem
              button
              key={text}
              onClick={toggleDrawer(false)}
              className="hover:bg-gray-100 rounded-md"
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  </Toolbar>
</AppBar>

);
};

export default Navbar;
