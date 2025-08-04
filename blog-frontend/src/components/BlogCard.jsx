// src/components/BlogCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  IconButton
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReportIcon from "@mui/icons-material/Report";
import CommentIcon from "@mui/icons-material/Comment";

export default function BlogCard({
  prompt,
  onLike,
  onReport,
  onComment
}) {
  const {
    title = "No Title",
    description = "",
    commentCount = 0,
    likeCount = 0,
    isLikedByCurrentUser = false,
    
  } = prompt || {};

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 4,
        minHeight: 250,
        display: "flex",
        flexDirection: "column",
        p: 2,
        bgcolor: "#fff",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.07)",
        mb: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description?.slice(0, 180) || "No description available."}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={onLike} size="small" color={isLikedByCurrentUser ? "primary" : "default"}>
            {isLikedByCurrentUser ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
          </IconButton>
          <Typography variant="caption">{likeCount}</Typography>
          <IconButton onClick={onComment} size="small">
            <CommentIcon fontSize="small" />
          </IconButton>
          <Typography variant="caption">{commentCount}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={onReport} size="small">
            <ReportIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
