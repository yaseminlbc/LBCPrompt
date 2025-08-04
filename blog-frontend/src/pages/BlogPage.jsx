// src/pages/BlogPage.jsx

import React, { useEffect, useState } from 'react';
import api from '../api/api'; 
import {
  Container,
  Grid,
  Typography,
  Snackbar,
  Alert,
  Box,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PromptShareCard from '../components/PromptShareCard';
import BlogCard from '../components/BlogCard';
import AnimatedBackground from '../components/AnimatedBackground';
import Footer from '../components/Footer';

export default function BlogPage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snack, setSnack] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  
  const fetchPrompts = async () => {
    try {
      
      const res = await api.get('/Prompts');
      setPrompts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Veri çekme hatası:', err);
      setSnack({
        open: true,
        message: 'Promptlar yüklenemedi.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  
  const handleLike = async id => {
    try {
      await api.post(`/like/prompt/${id}`);
      setPrompts(prev =>
        prev.map(p =>
          p.id === id
            ? { ...p, likeCount: (p.likeCount || 0) + 1, isLikedByCurrentUser: true }
            : p
        )
      );
    } catch {
      setSnack({
        open: true,
        message: 'Beğeni başarısız.',
        severity: 'error'
      });
    }
  };

  
  const handleReport = async id => {
    try {
      await api.post(`/report/prompt/${id}`);
      setSnack({
        open: true,
        message: 'Şikayetiniz alındı.',
        severity: 'success'
      });
    } catch {
      setSnack({
        open: true,
        message: 'Şikayet başarısız.',
        severity: 'error'
      });
    }
  };

  
  const handleComment = id => {
    navigate(`/prompt/${id}`);
  };

  return (
    <>
      {/* Arka plandaki pembe-hardal-mavi animasyonu */}
      <AnimatedBackground />

      {/* İçeriği arka planın üstüne yerleştir */}
      <Box sx={{ position: 'relative', py: 6 }}>
        <Container maxWidth="lg">
          {/* Prompt paylaşma kartı */}
          {isAuthenticated && (
            <Box sx={{ mb: 4 }}>
              <PromptShareCard onSuccess={fetchPrompts} />
            </Box>
          )}

          {/* Başlık */}
          <Typography
            variant="h3"
            align="center"
            fontWeight="bold"
            gutterBottom
            sx={{
              background: 'linear-gradient(to right, #FFC1E3, #FFDB58)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            ✨ Discover & Share ✨
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            paragraph
          >
            Check out the community's prompts and share your own ideas.
          </Typography>

          {/* Prompt kartları */}
          {loading ? (
            <Box sx={{ textAlign: 'center', my: 8 }}>
              <CircularProgress />
              <Typography sx={{ mt: 2 }}>Yükleniyor...</Typography>
            </Box>
          ) : prompts.length === 0 ? (
            <Typography align="center" sx={{ mt: 8 }}>
              Henüz paylaşılmış prompt yok.
            </Typography>
          ) : (
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {prompts.map(p => (
                <Grid item key={p.id} xs={12} sm={6} md={4}>
                  <BlogCard
                    prompt={{
                      title: p.title,
                      description: p.content, 
                      commentCount: p.commentCount,
                      likeCount: p.likeCount,
                      isLikedByCurrentUser: p.isLikedByCurrentUser,
                      imageUrl: p.imageUrl,
                      id: p.id
                    }}
                    onLike={() => handleLike(p.id)}
                    onReport={() => handleReport(p.id)}
                    onComment={() => handleComment(p.id)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      <Footer />

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
}
