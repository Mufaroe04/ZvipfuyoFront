import React from 'react';
import { 
  Stack, Paper, Typography, Autocomplete, TextField, 
  InputAdornment, Chip, MenuItem, Divider, Button 
} from '@mui/material';
import { IonIcon } from '@ionic/react';
import { 
  pawOutline, documentTextOutline, shieldCheckmarkOutline, 
  personOutline, carOutline, swapHorizontalOutline 
} from 'ionicons/icons';

interface Animal {
  id: number;
  tag_number: string;
}

interface TransferFormProps {
  availableAnimals: Animal[];
  selectedAnimals: Animal[];
  onAnimalsChange: (newValue: Animal[]) => void;
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const TransferForm: React.FC<TransferFormProps> = ({
  availableAnimals,
  selectedAnimals,
  onAnimalsChange,
  formData,
  setFormData,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={3}>
        
        {/* Animal Multi-Select Card */}
        <Paper variant="outlined" sx={{ p: 3, borderRadius: '16px', }}>
          <Typography variant="subtitle2" gutterBottom sx={{ color: '#18774c' }} fontWeight="bold">
            Identify Livestock
          </Typography>
          <Autocomplete
            multiple
            options={availableAnimals}
            getOptionLabel={(option) => option.tag_number}
            value={selectedAnimals}
            onChange={(_event, newValue) => onAnimalsChange(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Select Animals by Tag"
                placeholder="Search tags..."
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <InputAdornment position="start">
                        <IonIcon icon={pawOutline} style={{ fontSize: '20px' }} />
                      </InputAdornment>
                      {params.InputProps.startAdornment}
                    </>
                  ),
                }}
              />
            )}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip 
                  label={option.tag_number} 
                  {...getTagProps({ index })} 
                  sx={{ bgcolor: '#e8f5e9', color: '#18774c', fontWeight: 'bold' }} 
                  variant="outlined" 
                  size="small" 
                />
              ))
            }
          />
        </Paper>

        {/* Movement Details */}
        <Paper variant="outlined" sx={{ p: 3, borderRadius: '16px' }}>
          <Typography variant="subtitle2" gutterBottom sx={{ color: '#18774c' }} fontWeight="bold">
            Movement Details
          </Typography>
          <Stack spacing={2}>
            <TextField
              select
              fullWidth
              label="Transfer Reason"
              value={formData.transfer_type}
              onChange={(e) => setFormData({ ...formData, transfer_type: e.target.value })}
            >
              <MenuItem value="internal">Internal Move (Between Herds)</MenuItem>
              <MenuItem value="sale">Commercial Sale</MenuItem>
              <MenuItem value="lobola">Lobola (Bride Price)</MenuItem>
              <MenuItem value="inheritance">Inheritance</MenuItem>
              <MenuItem value="feasting">Feasting / Ceremony</MenuItem>
            </TextField>

            {formData.transfer_type === 'internal' ? (
              <TextField
                fullWidth
                label="Destination Herd ID"
                placeholder="e.g., 5"
                onChange={(e) => setFormData({ ...formData, to_herd: e.target.value })}
              />
            ) : (
              <TextField
                fullWidth
                label="External Destination"
                placeholder="e.g., CSC Bulawayo"
                onChange={(e) => setFormData({ ...formData, external_destination: e.target.value })}
              />
            )}
          </Stack>
        </Paper>

        {/* Regulatory & Logistics */}
        <Paper variant="outlined" sx={{ p: 3, borderRadius: '16px', bgcolor: '#fcfcfc' }}>
          <Typography variant="subtitle2" gutterBottom sx={{ color: '#18774c' }} fontWeight="bold">
            Regulatory & Logistics
          </Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Vet Permit Number"
              placeholder="V-2026-XXXX"
              onChange={(e) => setFormData({ ...formData, vet_permit_number: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start"><IonIcon icon={documentTextOutline} /></InputAdornment>,
              }}
            />
            <TextField
              fullWidth
              label="Police Clearance Ref"
              placeholder="ZRP-LIV-XXXX"
              onChange={(e) => setFormData({ ...formData, police_clearance_ref: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start"><IonIcon icon={shieldCheckmarkOutline} /></InputAdornment>,
              }}
            />
            <Divider />
            <TextField
              fullWidth
              label="Driver Name"
              onChange={(e) => setFormData({ ...formData, driver_name: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start"><IonIcon icon={personOutline} /></InputAdornment>,
              }}
            />
            <TextField
              fullWidth
              label="Truck Registration"
              placeholder="ABW 1234"
              onChange={(e) => setFormData({ ...formData, truck_reg_number: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start"><IonIcon icon={carOutline} /></InputAdornment>,
              }}
            />
          </Stack>
        </Paper>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          startIcon={<IonIcon icon={swapHorizontalOutline} />}
          sx={{ 
            py: 1.8, borderRadius: '12px', fontWeight: 'bold', textTransform: 'none',
            bgcolor: '#18774c',
            '&:hover': { bgcolor: '#14633f' }
          }}
        >
          Initiate Transfer
        </Button>
      </Stack>
    </form>
  );
};

export default TransferForm;