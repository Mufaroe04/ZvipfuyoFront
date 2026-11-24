import React from 'react';
import { 
  Box, Typography, Button, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, Avatar, IconButton,
  Dialog, DialogTitle, DialogContent, TextField, MenuItem, Grid,
  DialogActions, FormControl, InputLabel, Select, OutlinedInput, Checkbox, ListItemText,
  CircularProgress,
  Stack
} from '@mui/material';
import { PersonAdd, Edit } from '@mui/icons-material';
import { User, Herd } from '../../../types/types';

interface StaffFormData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  phone_number: string;
  assigned_herds: number[];
}

interface StaffManagementProps {
  staff: User[];
  herds: Herd[];
  loading: boolean;
  isDialogOpen: boolean;
  isEditMode: boolean;
  formData: StaffFormData;
  onOpenAddMode: () => void;
  onOpenEditMode: (member: User) => void;
  onCloseDialog: () => void;
  onFormChange: (updatedData: StaffFormData) => void;
  onSubmitForm: () => void;
}

const StaffManagementList: React.FC<StaffManagementProps> = ({ 
  staff = [], // Fallback assignment to prevent undefined map crashes
  herds = [], 
  loading,
  isDialogOpen,
  isEditMode,
  formData,
  onOpenAddMode,
  onOpenEditMode,
  onCloseDialog,
  onFormChange,
  onSubmitForm
}) => {

  const handleFieldUpdate = (field: keyof StaffFormData, value: any) => {
    onFormChange({
      ...formData,
      [field]: value
    });
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 },  mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="body1" fontWeight={800}>Staff Directory</Typography>
        <Button 
          variant="contained" 
          startIcon={<PersonAdd />} 
          onClick={onOpenAddMode} 
          sx={{ bgcolor: '#18774c', '&:hover': { bgcolor: '#14633f' } }}
        >
          Add Staff Member
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eef2f0', borderRadius: 1 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8faf9' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Member</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Assignments</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* 1. Explicit Loading Interceptor */}
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                  <CircularProgress sx={{ color: '#18774c' }} />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Loading staff directory...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : staff && staff.length > 0 ? (
              staff.map((member) => {
                if (!member) return null;
                
                // 2. Ultra-defensive string checking to stop runtime indexing breakages
                const firstNameStr = String(member.first_name || '').trim();
                const usernameStr = String(member.username || '').trim();
                const fallbackLetter = firstNameStr ? firstNameStr[0] : (usernameStr ? usernameStr[0] : '?');
                
                const assignedHerdIds = member.profile?.assigned_herds || [];
                const matchedHerds = herds.filter(h => assignedHerdIds.includes(h.id));

                return (
                  <TableRow key={member.id || usernameStr} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: '#e8f5e9', color: '#18774c', fontWeight: 700 }}>
                          {fallbackLetter.toUpperCase()}
                        </Avatar>
                        <Typography fontWeight={600}>
                          {firstNameStr || usernameStr ? `${member.first_name || ''} ${member.last_name || ''}` : 'Unnamed User'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={member.profile?.role ? String(member.profile.role).toUpperCase() : 'HAND'} 
                        size="small" 
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      {matchedHerds.length > 0 ? (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {matchedHerds.map(herd => (
                            <Chip 
                              key={herd.id} 
                              label={herd.name} 
                              size="small" 
                              sx={{ bgcolor: '#f1f5f3', color: '#334e40', fontWeight: 500 }} 
                            />
                          ))}
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No assigned herds
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => onOpenEditMode(member)} size="small" color="primary">
                        <Edit fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              /* 3. Missing Data Empty State Fallback View */
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                  <Typography variant="subtitle1" fontWeight={600} color="text.secondary">
                    No staff records found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try adding a new team member to populate the directory.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog segment stays unified and unchanged */}
      <Dialog open={isDialogOpen} onClose={onCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>
          {isEditMode ? 'Edit Staff Member' : 'Add New Team Member'}
        </DialogTitle>
        {/* <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField 
                fullWidth 
                label="First Name" 
                value={formData?.first_name || ''} 
                onChange={e => handleFieldUpdate('first_name', e.target.value)} 
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                fullWidth 
                label="Last Name" 
                value={formData?.last_name || ''} 
                onChange={e => handleFieldUpdate('last_name', e.target.value)} 
              />
            </Grid>
            {!isEditMode && (
              <Grid item xs={12}>
                <TextField 
                  fullWidth 
                  label="Username" 
                  value={formData?.username || ''} 
                  onChange={e => handleFieldUpdate('username', e.target.value)} 
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Email" 
                value={formData?.email || ''} 
                onChange={e => handleFieldUpdate('email', e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                select 
                fullWidth 
                label="Role" 
                value={formData?.role || 'hand'} 
                onChange={e => handleFieldUpdate('role', e.target.value)}
              >
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
                  value={formData?.assigned_herds || []}
                  onChange={e => handleFieldUpdate('assigned_herds', e.target.value as number[])}
                  input={<OutlinedInput label="Assign Herds" />}
                  renderValue={(selected) => {
                    const selectedHerds = herds.filter(h => selected.includes(h.id));
                    return selectedHerds.map(h => h.name).join(', ');
                  }}
                >
                  {herds.map((herd) => (
                    <MenuItem key={herd.id} value={herd.id}>
                      <Checkbox checked={(formData?.assigned_herds || []).indexOf(herd.id) > -1} />
                      <ListItemText primary={herd.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent> */}
         <DialogContent dividers>
             <Stack spacing={3}>
              <TextField 
                fullWidth 
                label="First Name" 
                value={formData?.first_name || ''} 
                onChange={e => handleFieldUpdate('first_name', e.target.value)} 
              />
              <TextField 
                fullWidth 
                label="Last Name" 
                value={formData?.last_name || ''} 
                onChange={e => handleFieldUpdate('last_name', e.target.value)} 
              />
            {!isEditMode && (
                <TextField 
                  fullWidth 
                  label="Username" 
                  value={formData?.username || ''} 
                  onChange={e => handleFieldUpdate('username', e.target.value)} 
                />
            )}
              <TextField 
                fullWidth 
                label="Email" 
                value={formData?.email || ''} 
                onChange={e => handleFieldUpdate('email', e.target.value)} 
              />
              <TextField 
                select 
                fullWidth 
                label="Role" 
                value={formData?.role || 'hand'} 
                onChange={e => handleFieldUpdate('role', e.target.value)}
              >
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="vet">Veterinarian</MenuItem>
                <MenuItem value="hand">Farm Hand</MenuItem>
              </TextField>
              <FormControl fullWidth>
                <InputLabel>Assign Herds</InputLabel>
                <Select
                  multiple
                  value={formData?.assigned_herds || []}
                  onChange={e => handleFieldUpdate('assigned_herds', e.target.value as number[])}
                  input={<OutlinedInput label="Assign Herds" />}
                  renderValue={(selected) => {
                    const selectedHerds = herds.filter(h => selected.includes(h.id));
                    return selectedHerds.map(h => h.name).join(', ');
                  }}
                >
                  {herds.map((herd) => (
                    <MenuItem key={herd.id} value={herd.id}>
                      <Checkbox checked={(formData?.assigned_herds || []).indexOf(herd.id) > -1} />
                      <ListItemText primary={herd.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
        </Stack>

        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={onSubmitForm} 
            sx={{ bgcolor: '#18774c', '&:hover': { bgcolor: '#14633f' } }}
          >
            {isEditMode ? 'Save Changes' : 'Create Account'}
          </Button>
        </DialogActions>
      </Dialog>
           
    </Box>
  );
};

export default StaffManagementList;


      