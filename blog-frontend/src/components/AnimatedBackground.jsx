// src/components/AnimatedBackground.jsx

import React from 'react';
import { styled, keyframes } from '@mui/system';
import { Box } from '@mui/material';


const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;


const AnimatedBackground = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  background: 'linear-gradient(270deg, #FFC1E3, #ADD8E6, #FFDB58)',
  backgroundSize: '600% 600%',
  animation: `${gradientAnimation} 20s ease infinite`
});


export default AnimatedBackground;
