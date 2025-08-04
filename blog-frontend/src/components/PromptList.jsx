// src/components/PromptList.jsx
import React from 'react';
import {
  Grid, Card, CardMedia, CardContent, CardActions,
  Typography, Button, Stack, IconButton
} from '@mui/material';
import {
  RemoveRedEye, ChatBubbleOutline, FavoriteBorder
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function PromptList({ posts }) {
  if (!posts.length) {
    return (
      <Typography variant="h6" color="text.secondary" sx={{ m:4, textAlign:'center' }}>
        No prompts shared yet.
      </Typography>
    );
  }
  return (
    <Grid container spacing={4}>
      <AnimatePresence>
        {posts.map(post => (
          <Grid
            item
            key={post.id}
            xs={12}
            sm={6}
            md={4}
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {post.imageUrl && (
                <CardMedia
                  component="img"
                  height="180"
                  image={post.imageUrl}
                  alt={post.title}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {post.author || 'Admin'} · {new Date(post.createdAt).toLocaleDateString()} · {post.readTime || '1 min read'}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content.slice(0,100)}…
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px:2 }}>
                <Stack direction="row" spacing={1}>
                  <RemoveRedEye fontSize="small"/><Typography variant="caption">{post.views||0}</Typography>
                  <ChatBubbleOutline fontSize="small"/><Typography variant="caption">{post.comments?.length||0}</Typography>
                  <FavoriteBorder fontSize="small"/><Typography variant="caption">{post.likes||0}</Typography>
                </Stack>
                <Button size="small" component={RouterLink} to={`/prompts/${post.id}`}>
                  Read more
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </AnimatePresence>
    </Grid>
  );
}
