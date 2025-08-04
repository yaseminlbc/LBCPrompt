// src/pages/AdminUserList.jsx
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Select, MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import api from '../api/api';

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [editingRole, setEditingRole] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    api.get('/Admin/users').then(res => setUsers(res.data));
  }, [refresh]);

  const handleDelete = async (id) => {
    if (window.confirm('Kullanıcıyı silmek istediğine emin misin?')) {
      await api.delete(`/Admin/users/${id}`);
      setRefresh(r => !r);
    }
  };

  const handleRoleChange = (id, role) => {
    setEditingRole((prev) => ({ ...prev, [id]: role }));
  };

  const handleRoleSave = async (id) => {
    
    // await api.put(`/Admin/users/${id}`, { role: editingRole[id] });
    setEditingRole((prev) => ({ ...prev, [id]: undefined }));
    setRefresh(r => !r);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>Kullanıcılar</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Kullanıcı Adı</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>İşlem</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.id}</TableCell>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Select
                    value={editingRole[u.id] ?? u.role}
                    onChange={e => handleRoleChange(u.id, e.target.value)}
                    size="small"
                  >
                    <MenuItem value="User">User</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                  </Select>
                  {/* Kaydet butonu sadece rol değiştiyse çıkar */}
                  {editingRole[u.id] !== undefined && editingRole[u.id] !== u.role && (
                    <IconButton onClick={() => handleRoleSave(u.id)} color="primary">
                      <SaveIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(u.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
