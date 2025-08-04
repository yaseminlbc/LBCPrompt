// src/pages/AdminApprovedPrompts.jsx
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from '@mui/material';
import api from '../api/api';

export default function AdminApprovedPrompts() {
  const [prompts, setPrompts] = useState([]);
  const [refresh, setRefresh] = useState(false);

 useEffect(() => {
  api.get('/Admin/prompts').then(res => {
    setPrompts(res.data.filter(p => p.isApproved));
  });
}, [refresh]);

  const handleDelete = async (id) => {
    await api.delete(`/Admin/prompts/${id}`);
    setRefresh(r => !r);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>Onaylanmış Promptlar</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Başlık</TableCell>
              <TableCell>İçerik</TableCell>
              <TableCell>Yazar</TableCell>
              <TableCell>İşlem</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prompts.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.content}</TableCell>
                <TableCell>{p.authorUsername}</TableCell>
                <TableCell>
                  <Button color="error" onClick={() => handleDelete(p.id)}>Sil</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
