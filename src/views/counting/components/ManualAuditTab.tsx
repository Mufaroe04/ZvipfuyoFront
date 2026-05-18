import React from 'react';
import { Paper, Typography, TextField, MenuItem, Box, Stack, Button } from '@mui/material';
import { AuditFormData } from '../hooks/useCountingSession';

interface ManualAuditTabProps {
  formData: AuditFormData;
  setFormData: React.Dispatch<React.SetStateAction<AuditFormData>>;
  herds: any[];
  handleHerdChange: (herdId: string) => void;
  handleSubmit: () => Promise<void>;
}

export const ManualAuditTab: React.FC<ManualAuditTabProps> = ({
  formData,
  setFormData,
  herds,
  handleHerdChange,
  handleSubmit
}) => (
  <Stack spacing={3} sx={{ mt: 1, pb: 1 }}>
    <Typography variant="body1" fontWeight="bold">Digital Kraal Check</Typography>
    
    <Paper variant="outlined" sx={{ p: 2, borderRadius: '4px' }}>
      <Typography variant="overline" color="primary" fontWeight="bold">1. Herd Selection</Typography>
      <TextField 
        select 
        label="Select Herd to Audit" 
        fullWidth 
        variant="standard" 
        value={formData.herd} 
        onChange={(e) => handleHerdChange(e.target.value)}
      >
        {herds.map(h => <MenuItem key={h.id} value={h.id}>{h.name}</MenuItem>)}
      </TextField>
    </Paper>

    <Paper variant="outlined" sx={{ p: 2, borderRadius: '4px', bgcolor: '#fbfbfb' }}>
      <Typography variant="overline"  fontWeight="bold">2. Physical Head Count</Typography>
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="body1" fontWeight="800" color="primary">{formData.actual_count}</Typography>
        <Typography variant="body2" color="text.secondary">Total Animals Counted</Typography>
      </Box>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 1 }}>
        <Button variant="outlined" size="large" onClick={() => setFormData({ ...formData, actual_count: Math.max(0, formData.actual_count - 1) })}>-</Button>
        <Button variant="outlined" size="large" onClick={() => setFormData({ ...formData, actual_count: formData.actual_count + 1 })}>+</Button>
      </Stack>
    </Paper>

    <TextField 
      label="Observation Notes" 
      multiline 
      rows={3} 
      fullWidth 
      value={formData.discrepancy_notes}
      onChange={e => setFormData({ ...formData, discrepancy_notes: e.target.value })} 
    />

    <Button variant="contained" size="large"  onClick={handleSubmit} sx={{ borderRadius: '4px', py: 2 }}>
      Finalize Audit & Sync
    </Button>
  </Stack>
);