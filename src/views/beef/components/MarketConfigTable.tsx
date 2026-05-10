import React, { useState } from 'react';
import { 
  Box, Typography, Paper, TextField, Button, Grid, 
  InputAdornment, Dialog, DialogTitle, DialogContent, 
  DialogActions, MenuItem, 
  Stack
} from '@mui/material';
import { addOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { BREED_CHOICES } from '../../../constants/livestock';

interface Props {
  prices: any[];
  onUpdate: (id: number, price: number) => void;
  onAdd: (data: any) => void;
}

const MarketConfigTable: React.FC<Props> = ({ prices, onUpdate, onAdd }) => {
  const [open, setOpen] = useState(false);
  const [newData, setNewData] = useState({ breed: '', price_per_kg: '' });

  const handleSave = () => {
    onAdd({ ...newData, price_per_kg: parseFloat(newData.price_per_kg) });
    setOpen(false);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">Live Market Prices</Typography>
        <Button 
          variant="contained" 
          startIcon={<IonIcon icon={addOutline} />} 
          onClick={() => setOpen(true)}
        >
          Add Breed Price
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {prices.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Paper variant="outlined" sx={{ p: 1, borderRadius: '12px' }}>
              <Typography variant="caption" fontWeight="bold" color="primary">{p.breed}</Typography>
              <TextField
                fullWidth size="small" margin="dense"
                defaultValue={p.price_per_kg}
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                onBlur={(e) => onUpdate(p.id, parseFloat(e.target.value))}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Add Market Price</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              select label="Select Breed" fullWidth
              value={newData.breed}
              onChange={(e) => setNewData({...newData, breed: e.target.value})}
            >
              {BREED_CHOICES.map(b => <MenuItem key={b.value} value={b.value}>{b.label}</MenuItem>)}
            </TextField>
            <TextField
              label="Price per KG" type="number" fullWidth
              onChange={(e) => setNewData({...newData, price_per_kg: e.target.value})}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save Price</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MarketConfigTable;