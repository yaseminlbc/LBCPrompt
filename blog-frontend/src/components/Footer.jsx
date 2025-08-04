// src/components/Footer.jsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Divider
} from '@mui/material';
import { Facebook, Twitter, Instagram, GitHub, YouTube } from '@mui/icons-material';

export default function Footer() {
  
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    setForm({ name: '', email: '', message: '' }); // Temizle
  };

  return (
    <Box sx={{ bgcolor: '#000', color: '#fff', py: 6, mt: 10 }}>
      <Container maxWidth="md">
        {/* Üst: Form alanı */}
        <Typography variant="h5" textAlign="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Drop Me a Line, Let Me Know What You Think
        </Typography>

        {/* Formu ve butonu tek satırda göster, responsive yap */}
        <form onSubmit={handleSubmit}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ my: 4 }}
          >
            <TextField
              variant="filled"
              label="First Name *"
              name="name"
              value={form.name}
              onChange={handleChange}
              InputProps={{ disableUnderline: true }}
              sx={{ bgcolor: '#fff', borderRadius: 1, width: { xs: '100%', md: 200 } }}
              required
            />
            <TextField
              variant="filled"
              label="Email *"
              name="email"
              value={form.email}
              onChange={handleChange}
              InputProps={{ disableUnderline: true }}
              sx={{ bgcolor: '#fff', borderRadius: 1, width: { xs: '100%', md: 250 } }}
              required
            />
            <TextField
              variant="filled"
              label="Message... *"
              name="message"
              value={form.message}
              onChange={handleChange}
              InputProps={{ disableUnderline: true }}
              sx={{ bgcolor: '#fff', borderRadius: 1, width: { xs: '100%', md: 300 } }}
              required
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#FFC107',
                color: '#001f54',
                px: 4,
                height: '56px',
                '&:hover': { bgcolor: '#FFA000' },
                textTransform: 'none',
                fontWeight: 600,
                width: { xs: '100%', md: 'auto' }
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>

        <Divider sx={{ bgcolor: '#444', my: 5 }} />

        {/* Alt: Contact Me alanı */}
        <Box textAlign="center">
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Contact Me
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            info@lbcprompt.com
          </Typography>
          <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 3 }}>
            <IconButton sx={{ color: '#fff' }}><Facebook /></IconButton>
            <IconButton sx={{ color: '#fff' }}><Twitter /></IconButton>
            <IconButton sx={{ color: '#fff' }}><YouTube /></IconButton>
            <IconButton sx={{ color: '#fff' }}><Instagram /></IconButton>
            <IconButton sx={{ color: '#fff' }}><GitHub /></IconButton>
          </Stack>
          <Typography textAlign="center" variant="body2" color="gray">
            © 2025 by LBCPrompt
          </Typography>
          <Typography
            textAlign="center"
            variant="caption"
            color="rgba(255,255,255,0.5)"
            sx={{ display: 'block', mt: 1, maxWidth: 600, mx: 'auto', lineHeight: 1.4 }}
          >
            We respect your privacy. Lbcprompt does not collect personal data beyond what is required to create your account. Your data is not shared with third parties. You can delete your account anytime.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
