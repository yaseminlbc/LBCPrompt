// src/components/Hero.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import headImage from '../assets/head.png';  

export default function Hero() {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 300, md: 500 },
        backgroundImage: `url(${headImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        bgcolor: 'grey.800',     
      }}
    >
      {/* semi-transparent overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.4)',
        }}
      />

      {/* centered text */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#fff',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          LBCPrompt
        </Typography>
        <Typography variant="h6">
          A blog about Prompt & AI
        </Typography>
      </Box>
    </Box>
  );
}
