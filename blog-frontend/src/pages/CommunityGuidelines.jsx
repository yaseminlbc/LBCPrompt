// src/pages/Guidelines.jsx
import React from 'react';
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import BuildIcon from '@mui/icons-material/Build';
import BlockIcon from '@mui/icons-material/Block';
import ReportIcon from '@mui/icons-material/Report';

import Footer from '../components/Footer';

export default function Guidelines() {
  const rules = [
    {
      icon: <ThumbUpOffAltIcon fontSize="large" sx={{ color: '#ff7043' }} />,
      title: '1. Be Respectful',
      desc: 'No hate speech, bullying, or offensive content.',
    },
    {
      icon: <BuildIcon fontSize="large" sx={{ color: '#ff7043' }} />,
      title: '2. Stay Constructive',
      desc: 'Make comments to support or improve, not attack.',
    },
    {
      icon: <BlockIcon fontSize="large" sx={{ color: '#ff7043' }} />,
      title: '3. No Spam or Ads',
      desc: 'Keep content meaningful and value-driven.',
    },
    {
      icon: <ReportIcon fontSize="large" sx={{ color: '#ff7043' }} />,
      title: '4. Report Responsibly',
      desc: 'Use the report button only when necessary.',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #e3f2fd 0%, #ffffff 100%)',
      }}
    >
     
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#333' }}
        >
          Community Guidelines
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ mb: 4, color: '#555' }}
        >
          To keep Lbcprompt safe and positive, please follow these basic rules.
        </Typography>

        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            backgroundColor: 'rgba(255,255,255,0.85)',
            maxWidth: 800,
            mx: 'auto',
          }}
        >
          <List>
            {rules.map((rule, i) => (
              <ListItem key={i} sx={{ mb: 2 }}>
                <ListItemIcon>{rule.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      sx={{ color: '#333', fontWeight: 600 }}
                    >
                      {rule.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      {rule.desc}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
}
