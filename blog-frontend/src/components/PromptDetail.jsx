import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';

import {
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardContent,
  CardActions,
  Grid
} from '@mui/material';

const PromptDetail = () => {
  const { id: promptId } = useParams();
  const [prompt, setPrompt] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [reported, setReported] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!promptId) return;
    setLoading(true);
    // 1. Prompt verisini al
    api.get(`/Prompt/${promptId}`)
      .then(res => {
        setPrompt(res.data);
        return Promise.all([
          api.get(`/Comments/post/${promptId}`),
          api.get(`/Likes/post/${promptId}`),
          api.get(`/Likes/hasLiked/${promptId}`),
          api.get(`/Reports/hasReported/${promptId}`)
        ]);
      })
      .then(([cRes, lRes, lkRes, rpRes]) => {
        setComments(cRes.data);
        setLikeCount(lRes.data.count);
        setLiked(lkRes.data.liked);
        setReported(rpRes.data.reported);
      })
      .catch(err => {
        console.error(err);
        setError('Veri yüklenirken hata oldu.');
      })
      .finally(() => setLoading(false));
  }, [promptId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await api.post('/Comments', { postId: promptId, content: newComment });
      const { data } = await api.get(`/Comments/post/${promptId}`);
      setComments(data);
      setNewComment('');
    } catch (err) {
      console.error(err);
      setError('Yorum gönderilemedi.');
    }
  };

  const toggleLike = async () => {
    try {
      if (liked) await api.delete(`/Likes/${promptId}`);
      else await api.post('/Likes', { postId: promptId });
      const { data } = await api.get(`/Likes/post/${promptId}`);
      setLikeCount(data.count);
      setLiked(prev => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  const reportItem = async () => {
    if (reported) return alert('Zaten raporladın.');
    const reason = prompt('Rapor nedeni:');
    if (!reason) return;
    try {
      await api.post('/Reports', { postId: promptId, reason });
      setReported(true);
      alert('Rapor gönderildi.');
    } catch {
      alert('Rapor gönderilirken hata oluştu.');
    }
  };

  const toggleLikeComment = async (commentId) => {
    try {
      if (liked) await api.delete(`/Likes/comment/${commentId}`);
      else await api.post('/Likes/comment', { commentId });
      await Promise.all([
        api.get(`/Likes/comment/${commentId}`),
        api.get(`/Likes/hasLikedComment/${commentId}`)
      ]);
      setComments(prev => prev.map(c => c.id === commentId ? { ...c } : c));
      // update state maps if needed
    } catch (err) {
      console.error(err);
    }
  };

  const reportComment = async (commentId) => {
    if (reported) return alert('Zaten raporladın.');
    const reason = prompt('Rapor nedeni:');
    if (!reason) return;
    try {
      await api.post('/Reports/comment', { commentId, reason });
      alert('Yorum raporlandı.');
    } catch {
      alert('Rapor gönderilirken hata oluştu.');
    }
  };

  if (loading) return <Typography>Yükleniyor…</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>{prompt.title}</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        <b>Kategori:</b> {prompt.category?.name || 'Yok'} &nbsp;|&nbsp;
        <b>Yazar:</b> {prompt.author} &nbsp;|&nbsp;
        <b>Tarih:</b> {new Date(prompt.createdAt).toLocaleDateString()}
      </Typography>
      <Typography paragraph>{prompt.content}</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Button variant="contained" color={liked ? 'error' : 'primary'} onClick={toggleLike}>
          {liked ? 'Beğendin' : 'Beğen'} ({likeCount})
        </Button>
        <Button variant="outlined" onClick={reportItem} disabled={reported}>
          {reported ? 'Raporlandı' : 'Raporla'}
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>Yorumlar</Typography>
      <Box 
      component="form" 
      onSubmit={handleCommentSubmit}
       sx={{ mb: 3 }}>
        <TextField
          fullWidth
          multiline
          label="Yorum Yaz"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" type="submit">Gönder</Button>
      </Box>

      <List>
        {comments.map(c => (
          <React.Fragment key={c.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={`${c.user?.username || 'Anonim'}:`}
                secondary={c.content}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 2 }}>
                <Button size="small" onClick={() => toggleLikeComment(c.id)}>
                  {c.liked ? 'Beğendin' : 'Beğen'} ({c.likeCount || 0})
                </Button>
                <Button size="small" onClick={() => reportComment(c.id)} disabled={c.reported}>
                  {c.reported ? 'Raporlandı' : 'Raporla'}
                </Button>
              </Box>
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>

      <Typography variant="h6" sx={{ mt: 4 }}>Benzer Yazılar</Typography>
      <Grid container spacing={2}>
        {prompt.related?.length === 0 ? (
          <Typography color="text.secondary">Başka yazı yok.</Typography>
        ) : (
          prompt.related.map(rp => (
            <Grid item xs={12} sm={6} key={rp.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{rp.title}</Typography>
                </CardContent>
                <CardActions>
                  <Button component={Link} to={`/prompts/${rp.id}`} size="small">
                    Detay
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default PromptDetail;
