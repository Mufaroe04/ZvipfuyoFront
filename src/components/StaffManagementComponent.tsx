import React, { useState } from 'react';
import { 
  Box, Typography, Button, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, Avatar, IconButton,
  Dialog, DialogTitle, DialogContent, TextField, MenuItem, Grid,
  DialogActions, FormControl, InputLabel, Select, OutlinedInput, Checkbox, ListItemText
} from '@mui/material';
import { Add, PersonAdd, MoreVert, Security, Email, Phone } from '@mui/icons-material';
import { User, Herd } from '../types/types';

interface StaffManagementProps {
  staff: User[];
  herds: Herd[];
  onCreateStaff: (data: any) => void;
  loading: boolean;
}

const StaffManagementComponent: React.FC<StaffManagementProps> = ({ staff, herds, onCreateStaff, loading }) => {
  const [open, setOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    role: 'hand',
    phone_number: '',
    assigned_herds: [] as number[]
  });

  const handleSubmit = () => {
    onCreateStaff(newStaff);
    setOpen(false);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#1a1a1a">Staff Directory</Typography>
          <Typography color="textSecondary">Manage roles and herd assignments for your farm team</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<PersonAdd />}
          onClick={() => setOpen(true)}
          sx={{ bgcolor: '#18774c', '&:hover': { bgcolor: '#145d3c' }, borderRadius: 2, px: 3 }}
        >
          Add Staff Member
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eef2f0', borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8faf9' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Member</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Contact</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Assignments</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staff.map((member) => (
              <TableRow key={member.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#e8f5e9', color: '#18774c', fontWeight: 700 }}>
                      {member.first_name[0]}{member.last_name[0]}
                    </Avatar>
                    <Box>
                      <Typography fontWeight={600}>{member.first_name} {member.last_name}</Typography>
                      <Typography variant="caption" color="textSecondary">@{member.username}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={member.profile.role.toUpperCase()} 
                    size="small" 
                    sx={{ 
                      fontWeight: 700, 
                      bgcolor: member.profile.role === 'manager' ? '#fff3e0' : '#e3f2fd',
                      color: member.profile.role === 'manager' ? '#e65100' : '#1565c0'
                    }} 
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Email sx={{ fontSize: 14, color: '#999' }} />
                      <Typography variant="body2">{member.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Phone sx={{ fontSize: 14, color: '#999' }} />
                      <Typography variant="body2">{member.profile.phone_number || 'N/A'}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {member.profile.assigned_herds?.length || 0} Herd(s)
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small"><MoreVert /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Staff Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Add New Team Member</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField fullWidth label="First Name" onChange={e => setNewStaff({...newStaff, first_name: e.target.value})} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Last Name" onChange={e => setNewStaff({...newStaff, last_name: e.target.value})} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Username" onChange={e => setNewStaff({...newStaff, username: e.target.value})} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" type="email" onChange={e => setNewStaff({...newStaff, email: e.target.value})} />
            </Grid>
            <Grid item xs={12}>
              <TextField select fullWidth label="Role" value={newStaff.role} onChange={e => setNewStaff({...newStaff, role: e.target.value})}>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="vet">Veterinarian</MenuItem>
                <MenuItem value="hand">Farm Hand</MenuItem>
              </TextField>
            </Grid>
            
            {/* Herd Multi-Select */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Assign Herds</InputLabel>
                <Select
                  multiple
                  value={newStaff.assigned_herds}
                  onChange={e => setNewStaff({...newStaff, assigned_herds: e.target.value as number[]})}
                  input={<OutlinedInput label="Assign Herds" />}
                  renderValue={(selected) => selected.length + ' Herds Selected'}
                >
                  {herds.map((herd) => (
                    <MenuItem key={herd.id} value={herd.id}>
                      <Checkbox checked={newStaff.assigned_herds.indexOf(herd.id) > -1} />
                      <ListItemText primary={herd.name} secondary={herd.breed} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} color="inherit">Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#18774c' }}>Create Account</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StaffManagementComponent;