// src/components/PromptShareCard.jsx
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  styled,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import api from '../api/api'; 

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 700,
  margin: '0 auto',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12)',
  background: 'rgba(255, 255, 255, 0.95)',
  position: 'relative',
  overflow: 'visible'
}));

const AccentBar = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: 6,
  borderRadius: '0 0 12px 12px',
  background: 'linear-gradient(90deg, #FFC1E3, #ADD8E6, #FFDB58)'
});

export default function PromptShareCard({ onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  
  const tags = ['ai', 'prompt engineering'];
  const categoryId = 1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    setSubmitting(true);
    try {
      await api.post('/Prompts', {
        title,
        content: description,     
        categoryId,
        isApproved: true,
        tags
      });
      setTitle('');
      setDescription('');
      if (typeof onSuccess === 'function') onSuccess(); // ↔️
    } catch (err) {
      alert('Error sharing prompt: ' + (err.response?.data || err.message));
      console.error('Error sharing prompt:', err.response || err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StyledCard>
      <AccentBar />
      <CardContent sx={{ textAlign: 'center', pt: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
          Share a New Prompt
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
        >
          <TextField
            label="Title *"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            placeholder="Enter catchy title"
            variant="outlined"
            fullWidth
            InputProps={{
              sx: {
                borderRadius: 3,
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '2px dashed transparent',
                  borderImageSlice: 1,
                  borderImageSource: 'linear-gradient(45deg, #FFC1E3, #ADD8E6, #FFDB58)'
                }
              }
            }}
          />
          <TextField
            label="Description *"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            placeholder="Add more details"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            InputProps={{
              sx: {
                borderRadius: 3,
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '2px dashed transparent',
                  borderImageSlice: 1,
                  borderImageSource: 'linear-gradient(45deg, #FFC1E3, #ADD8E6, #FFDB58)'
                }
              }
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              disabled={submitting}
              sx={{
                textTransform: 'none',
                bgcolor: 'secondary.main',
                '&:hover': { bgcolor: 'secondary.dark' },
                borderRadius: 3,
                px: 3,
                py: 1.2
              }}
            >
              {submitting ? 'Sharing…' : 'Share'}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </StyledCard>
  );
}
