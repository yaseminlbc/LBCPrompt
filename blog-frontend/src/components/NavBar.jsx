// src/components/NavBar.jsx
import React, { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function NavBar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  
  const [aboutAnchorEl, setAboutAnchorEl] = useState(null);
  const openAbout = (e) => setAboutAnchorEl(e.currentTarget);
  const closeAbout = () => setAboutAnchorEl(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // user objesi: { id, username, email, role }
  const username = user?.username;
  const userRole = user?.role;

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: 'flex', gap: 2 }}>
        <Button component={RouterLink} to="/">HOME</Button>
        <Button component={RouterLink} to="/blog">BLOG</Button>

        <Button onClick={openAbout}>ABOUT</Button>
        <Menu
          anchorEl={aboutAnchorEl}
          open={Boolean(aboutAnchorEl)}
          onClose={closeAbout}
        >
          <MenuItem component={RouterLink} to="/faq" onClick={closeAbout}>
            FAQ
          </MenuItem>
          <MenuItem component={RouterLink} to="/our-vision" onClick={closeAbout}>
            Our Vision
          </MenuItem>
        </Menu>

        <Box sx={{ flexGrow: 1 }} />

        {/* Admin rolündeyse görünen buton */}
        {isAuthenticated && userRole === 'Admin' && (
          <Button component={RouterLink} to="/admin">
            ADMIN PANEL
          </Button>
        )}

        {isAuthenticated ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box>Hi, {username}</Box>
            <Button onClick={handleLogout}>LOGOUT</Button>
          </Box>
        ) : (
          <>
            <Button component={RouterLink} to="/signin">SIGN IN</Button>
            <Button component={RouterLink} to="/signup" variant="contained">
              SIGN UP
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
