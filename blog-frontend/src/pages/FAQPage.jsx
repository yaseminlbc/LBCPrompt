// src/pages/FAQ.jsx
import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

import Footer from '../components/Footer';

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


const ChatContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  maxWidth: '800px',
  margin: '0 auto',
});
const QuestionBubble = styled(Box)(({ theme }) => ({
  alignSelf: 'flex-start',
  background: 'rgba(255,255,255,0.85)',
  color: '#001f54',
  padding: theme.spacing(2),
  borderRadius: '16px 16px 16px 0',
  position: 'relative',
  maxWidth: '80%',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '-8px',
    borderTop: '8px solid rgba(255,255,255,0.85)',
    borderRight: '8px solid transparent',
  },
}));
const AnswerBubble = styled(Box)(({ theme }) => ({
  alignSelf: 'flex-end',
  background: 'rgba(0,0,0,0.1)',
  color: '#fff',
  padding: theme.spacing(2),
  borderRadius: '16px 16px 0 16px',
  position: 'relative',
  maxWidth: '80%',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: '-8px',
    borderBottom: '8px solid rgba(0,0,0,0.1)',
    borderLeft: '8px solid transparent',
  },
}));

export default function FAQ() {
  const faqs = [
    {
      q: 'Can I submit my own prompts?',
      a: 'Absolutely! Click “Just Share It” and let your creativity run wild—no gatekeepers here.'
    },
    {
      q: 'Do I need an account to use the platform?',
      a: 'Browsing & liking are open to all. To post your own prompts, sign up—it’s free and takes 10 seconds.'
    },
    {
      q: 'Is Lbcprompt free to use?',
      a: 'You bet! Lbcprompt is 100% free—because great ideas shouldn’t cost a thing.'
    },
    {
      q: 'Will more features be added soon?',
      a: 'Always! We’re cooking up new filters, themes, and collab tools—stay tuned for the next wave.'
    },
  ];

  return (
    <AnimatedBackground>
    

      <Container sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#fff', mb: 6 }}
        >
          ❓ Frequently Asked Questions
        </Typography>

        <ChatContainer>
          {faqs.map((item, idx) => (
            <Box key={idx}>
              <QuestionBubble>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {item.q}
                </Typography>
              </QuestionBubble>
              <AnswerBubble>
                <Typography variant="body2">
                  {item.a}
                </Typography>
              </AnswerBubble>
            </Box>
          ))}
        </ChatContainer>
      </Container>

      <Footer />
    </AnimatedBackground>
  );
}
