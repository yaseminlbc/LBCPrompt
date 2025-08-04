// src/components/LatestPrompt.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import api from '../api/api';

export default function LatestPrompt() {
  const [prompt, setPrompt] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await api.get('/Prompts');     
        const sorted = [...res.data].reverse();    
        setPrompt(sorted.slice(0, 2));             
      } catch (err) {
        console.error('Error fetching prompt:', err);
      }
    };
    fetchPrompt();
  }, []);

  return (
    <Box sx={{ mt: 6, textAlign: 'center', color: 'white' }}>
      <Typography
  variant="h3"
  fontWeight="bold"
  gutterBottom
  sx={{
    background: 'linear-gradient(90deg, #FFC1E3, #ADD8E6, #FFDB58)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: { xs: 28, md: 40 },
    letterSpacing: 1,
    mb: 3,
    fontFamily: 'Montserrat, sans-serif',
    textShadow: '0 2px 12px rgba(0,0,0,0.07)'
  }}
>
  Latest Prompts
</Typography>


      {prompt.length === 0 ? (
        <Typography sx={{ mt: 2, mb: 4 }}>No prompts shared yet.</Typography>
      ) : (
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
          sx={{ px: 2, py: 3 }}
        >
          {prompt.map((item) => (
            <Card
              key={item.id}
              sx={{
                position: 'relative',
                bgcolor: '#fff',
                minWidth: 280,
                flex: 1,
                maxWidth: 400,
                mx: 'auto',
                borderRadius: 5,
                p: 2,
                boxShadow: '0 4px 24px 0 rgba(80, 54, 186, 0.08), 0 1.5px 7px 0 rgba(20, 50, 180, 0.08)',
                border: '2.5px solid',
                borderImage: 'linear-gradient(45deg, #FFC1E3 30%, #ADD8E6 60%, #FFDB58 100%) 1',
                transition: 'transform 0.17s, box-shadow 0.17s',
                '&:hover': {
                  transform: 'translateY(-7px) scale(1.03)',
                  boxShadow: '0 8px 40px 0 rgba(254, 183, 60, 0.14)'
                }
              }}
            >
              <CardContent sx={{ textAlign: 'left', minHeight: 130 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ fontFamily: 'Montserrat, sans-serif', color: '#1a237e' }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#333', fontFamily: 'Inter, sans-serif' }}
                >
                  {item.content?.slice(0, 110) || 'No description provided.'}
                  {item.content && item.content.length > 110 ? '...' : ''}
                </Typography>
              </CardContent>
              <Box sx={{ px: 2, pb: 2 }}>
                <Button
  size="small"
  variant="contained"
  sx={{
    mt: 1,
    background: 'linear-gradient(45deg, #FFB800, #FF6B00)',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: 3,
    letterSpacing: 0.5,
    textTransform: 'none',
    '&:hover': { background: 'linear-gradient(45deg, #ffa726, #fb8c00)' }
  }}
  onClick={() => navigate('/blog')}
>
  Read More✨
</Button>

              </Box>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
}
