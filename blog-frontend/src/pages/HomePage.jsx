// src/pages/HomePage.jsx
import React from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

import Hero from '../components/Hero';
import Footer from '../components/Footer';
import LatestPrompts from '../components/LatestPrompts';
// import ContactForm from "../components/ContactForm"; 

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

export default function HomePage() {
  const cards = [
    {
      title: '🔥 Fueling the Future',
      content: (
        <Box>
          <Typography paragraph>
            At Lbcprompt, we believe every spark of an idea has the power to reshape the future.
            Our platform exists to ignite that spark and guide it into a blazing trail of creativity.
          </Typography>
          <Box component="ul" sx={{ listStyle: 'disc inside', pl: 2, mb: 2, color: '#001f54' }}>
            {[
              'Empower Creativity: Give everyone the tools to dream, design, and deliver AI-driven experiences.',
              'Build Community: Foster a welcoming space where feedback fuels growth and collaboration thrives.',
              'Innovate Responsibly: Advocate for thoughtful AI use—transparent, ethical, and human-centered.',
              'Amplify Voices: Champion diverse perspectives, because the best prompts come from all walks of life.',
              'Celebrate Curiosity: Encourage asking questions and exploring wild ideas without fear.',
              'Embrace Experimentation: Treat every prompt as a lab where failure is just another data point.',
            ].map((item, idx) => (
              <Typography component="li" key={idx} sx={{ mb: 1 }}>
                {item}
              </Typography>
            ))}
          </Box>
          <Typography paragraph>
            Think you’re ready to disrupt the status quo? First, swear allegiance to our golden rules—tap below!
          </Typography>
        </Box>
      ),
      btnText: 'Read Community Guidelines',
      btnHref: '/guidelines',
      btnColor: '#FFC107',
      btnHover: '#FFA000',
    },
    {
      title: 'I want to share a prompt but…',
      content: (
        <Box>
          <Typography paragraph sx={{ color: '#001f54' }}>
            Ever sat on a brilliant (or bonkers) idea and thought “Nah, that’s too out there”?  
            Welcome to the club—been there, hesitated that.
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, color: '#001f54' }}>
            {[
              '🐥 What if it’s silly? (Spoiler: Silly is the new genius.)',
              '😬 What if no one likes it? (Likes are overrated; creativity isn’t a popularity contest.)',
              '🤖 What if AI gets offended? (AI has thick circuits—promise.)',
              '🔒 What if it’s too private? (We keep your secrets safer than grandma’s cookie recipe.)',
              '🌀 What if it goes viral and I can’t handle the fame? (We’ll coach you through the paparazzi.)',
            ].map((text, i) => (
              <Typography
                key={i}
                component="li"
                sx={{
                  background: 'rgba(255,255,255,0.3)',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  mb: 1,
                }}
              >
                {text}
              </Typography>
            ))}
          </Box>
          <Typography paragraph sx={{ color: '#001f54' }}>
            Bottom line: The only bad prompt is the one you don’t share. Ready to unleash?
          </Typography>
          <Typography paragraph sx={{ color: '#001f54' }}>
            Just share it :)
            </Typography>
        </Box>
      ),
    }
  ];

  return (
    <AnimatedBackground>
      <Hero />
      <Container sx={{ py: 6 }}>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{ color: '#fff', textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
        >
          🚀 What's a Prompt?
        </Typography>
        <Typography align="center" sx={{ mb: 6, color: '#e0f7ff' }}>
          A prompt is the spark. The beginning of every AI idea.
        </Typography>

        {/* Kartlar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            mb: 6,
            justifyContent: 'center',
          }}
        >
          {cards.map((box, i) => (
            <Paper
              key={i}
              elevation={4}
              sx={{
                flex: 1,
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                background: 'rgba(255,255,255,0.85)',
                maxWidth: 500,
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 2, color: '#001f54' }}
              >
                {box.title}
              </Typography>
              {box.content}
              {box.btnText && (
                <Button
                  component="a"
                  href={box.btnHref}
                  variant="contained"
                  size="small"
                  sx={{
                    mt: 2,
                    bgcolor: box.btnColor,
                    color: '#001f54',
                    '&:hover': { bgcolor: box.btnHover },
                    textTransform: 'none',
                  }}
                >
                  {box.btnText}
                </Button>
              )}
            </Paper>
          ))}
        </Box>

        {/* ---- GRADIENT BAR (DEKORATİF AYRAÇ) ---- */}
        <Box
          sx={{
            width: '100%',
            height: 32,
            mb: -3,
            mt: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: { xs: '90%', md: '60%' },
              height: 10,
              borderRadius: 10,
              background: 'linear-gradient(90deg, #FFC1E3 0%, #ADD8E6 50%, #FFDB58 100%)',
              boxShadow: '0 2px 12px 0 rgba(0,0,0,0.09)',
              opacity: 0.85,
              position: 'relative',
              zIndex: 2,
            }}
          />
        </Box>
        {/* ---- END BAR ---- */}

      </Container>
      <LatestPrompts />
      <Footer />
      {/* <ContactForm /> */}
    </AnimatedBackground>
  );
}
