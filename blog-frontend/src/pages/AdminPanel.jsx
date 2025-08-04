// src/pages/AdminPanel.jsx
import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function AdminPanel() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          component={RouterLink}
          to="/admin/users"
        >
          Manage Users
        </Button>
        <Button
          variant="contained"
          component={RouterLink}
          to="/admin/prompts/pending"
        >
          Pending Prompts
        </Button>
        <Button
          variant="contained"
          component={RouterLink}
          to="/admin/prompts/approved"
        >
          Approved Prompts
        </Button>
      </Stack>
    </Box>
  );
}
