// src/pages/AboutPage.jsx
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

import Footer from '../components/Footer';
import aboutImage from '../assets/about.png';


const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;


const AnimatedBackground = styled('div')({
  minHeight: '100vh',
  background: 'linear-gradient(-45deg, #00c6ff 0%, #0072ff 33%, #0047ab 66%, #001f54 100%)',
  backgroundSize: '400% 400%',
  animation: `${gradientShift} 20s ease infinite`,
});

export default function AboutPage() {
  return (
    <AnimatedBackground>
     

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 4, background: 'rgba(255,255,255,0.85)' }}>
          {/* Flex düzeni: Solda görsel, sağda yazı */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 4,
            }}
          >
            {/* Sol: Görsel */}
            <Box
              component="img"
              src={aboutImage}
              alt="About us"
              sx={{
                width: { xs: '100%', md: '45%' },
                height: 'auto',
                borderRadius: 3,
              }}
            />

            {/* Sağ: Yazı */}
            <Box sx={{ width: { xs: '100%', md: '55%' } }}>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.8, color: '#001f54' }}
              >
                We’re not here to be just another prompt site.<br />
                We’re here to spark revolutions in creativity, one line at a time.<br /><br />
                Our vision? A space where ideas are free, feedback is fearless, and “What if?” is the beginning of everything.<br />
                We want to turn casual users into creators, creators into thinkers, and thinkers into world-changers.<br />
                (Or at least into someone who finally finishes a blog post.)<br /><br />
                We’re powered by code, caffeine, and community.<br />
                We believe in transparency, dark mode, and never settling for “meh.”<br />
                If that makes us dreamers — good. Someone has to be.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>

      <Footer />
    </AnimatedBackground>
  );
}
