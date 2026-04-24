import React, { useState } from 'react';
import { 
  Box, Typography, Button, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, Avatar, IconButton,
  Dialog, DialogTitle, DialogContent, TextField, MenuItem, Grid,
  DialogActions, FormControl, InputLabel, Select, OutlinedInput, Checkbox, ListItemText
} from '@mui/material';
import { Add, PersonAdd, MoreVert, Security, Email, Phone } from '@mui/icons-material';
import { User, Herd } from '../types/types';
import { Edit, Delete } from '@mui/icons-material';
interface StaffManagementProps {
  staff: User[];
  herds: Herd[];
  onCreateStaff: (data: any) => void;
  onUpdateStaff: (id: number, data: any) => void; // New Prop
  loading: boolean;
}

const StaffManagementComponent: React.FC<StaffManagementProps> = ({ staff, herds, onCreateStaff, onUpdateStaff, loading }) => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    username: '', email: '', first_name: '', last_name: '',
    role: 'hand', phone_number: '', assigned_herds: [] as number[]
  });

  const handleOpenAdd = () => {
    setEditMode(false);
    setFormData({ username: '', email: '', first_name: '', last_name: '', role: 'hand', phone_number: '', assigned_herds: [] });
    setOpen(true);
  };

  const handleOpenEdit = (member: User) => {
    setEditMode(true);
    setSelectedId(member.id);
    setFormData({
      username: member.username,
      email: member.email,
      first_name: member.first_name,
      last_name: member.last_name,
      role: member.profile.role,
      phone_number: member.profile.phone_number || '',
      assigned_herds: member.profile.assigned_herds || []
    });
    setOpen(true);
  };

  const handleSubmit = () => {
    if (editMode && selectedId) {
      onUpdateStaff(selectedId, formData);
    } else {
      onCreateStaff(formData);
    }
    setOpen(false);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight={800}>Staff Directory</Typography>
        <Button variant="contained" startIcon={<PersonAdd />} onClick={handleOpenAdd} sx={{ bgcolor: '#18774c' }}>
          Add Staff Member
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eef2f0', borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8faf9' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Member</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Assignments</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staff.map((member) => (
              <TableRow key={member.id} hover>
                <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: '#e8f5e9', color: '#18774c' }}>{member.first_name[0]}</Avatar>
                        <Typography fontWeight={600}>{member.username} </Typography>
                        <Typography fontWeight={600}>{member.first_name} {member.last_name}</Typography>
                    </Box>
                </TableCell>
                <TableCell><Chip label={member.profile.role} size="small" /></TableCell>
                <TableCell>{member.profile.assigned_herds?.length || 0} Herd(s)</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenEdit(member)} size="small" color="primary">
                    <Edit fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Shared Dialog for Add/Edit */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>{editMode ? 'Edit Staff Member' : 'Add New Team Member'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField fullWidth label="First Name" value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Last Name" value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} />
            </Grid>
            {!editMode && ( // Only show username field on creation
              <Grid item xs={12}>
                <TextField fullWidth label="Username" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField fullWidth label="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </Grid>
            <Grid item xs={12}>
                <TextField select fullWidth label="Role" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                    <MenuItem value="manager">Manager</MenuItem>
                    <MenuItem value="vet">Veterinarian</MenuItem>
                    <MenuItem value="hand">Farm Hand</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Assign Herds</InputLabel>
                <Select
                  multiple
                  value={formData.assigned_herds}
                  onChange={e => setFormData({...formData, assigned_herds: e.target.value as number[]})}
                  input={<OutlinedInput label="Assign Herds" />}
                >
                  {herds.map((herd) => (
                    <MenuItem key={herd.id} value={herd.id}>
                      <Checkbox checked={formData.assigned_herds.indexOf(herd.id) > -1} />
                      <ListItemText primary={herd.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#18774c' }}>
            {editMode ? 'Save Changes' : 'Create Account'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StaffManagementComponent;