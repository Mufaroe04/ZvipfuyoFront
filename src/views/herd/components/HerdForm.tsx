
import React from 'react';
import { 
  Container, Box, Button, TextField, MenuItem, 
  Paper, Typography, CircularProgress, Stack, Divider 
} from "@mui/material";
import { BREED_CHOICES, HERD_TYPES } from '../../../constants/livestock';
import { useHerdForm } from '../hooks/useHerdForm';

interface HerdFormProps {
  title: string;
}

const HerdForm: React.FC<HerdFormProps> = ({ title }) => {
  const { 
    formState, 
    isSubmitting, 
    isFormValid, 
    handleChange, 
    handleSubmit, 
    isEditMode, 
    goBack 
  } = useHerdForm();

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          borderRadius: '24px', 
          border: '1px solid #e0e0e0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)' 
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={3}>
            {/* Header Section */}
            <Box>
              <Typography variant="h5" fontWeight="black" sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isEditMode 
                  ? "Update the management details and location for this herd." 
                  : "Establish a new management group for your livestock."}
              </Typography>
            </Box>

            <Divider />

            {/* Core Details */}
            <TextField
              label="Herd Name"
              fullWidth
              value={formState.name}
              onChange={handleChange('name')}
              placeholder="e.g. North Pasture Breeders"
              required
            />

            <TextField
              label="Location"
              fullWidth
              value={formState.location}
              onChange={handleChange('location')}
              placeholder="e.g. Mazowe District"
              required
            />

            <Stack direction="row" spacing={2}>
              <TextField
                select
                fullWidth
                label="Herd Type"
                value={formState.herd_type}
                onChange={handleChange('herd_type')}
                required
              >
                {HERD_TYPES.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                label="Primary Breed"
                value={formState.primary_breed}
                onChange={handleChange('primary_breed')}
                required
              >
                {BREED_CHOICES.map((choice) => (
                  <MenuItem key={choice.value} value={choice.value}>
                    {choice.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <Box sx={{ pt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disableElevation
                disabled={!isFormValid || isSubmitting}
                sx={{ 
                  py: 1.8, 
                  borderRadius: '12px', 
                  fontWeight: 'bold', 
                  fontSize: '1rem',
                  bgcolor: "#18774c",
                  textTransform: 'none',
                  '&:hover': { bgcolor: "#145c3b" }
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={26} color="inherit" />
                ) : (
                  isEditMode ? 'Update Herd Registry' : 'Complete Herd Registration'
                )}
              </Button>

              <Button 
                fullWidth 
                onClick={goBack} 
                sx={{ 
                  mt: 1, 
                  textTransform: "none", 
                  fontWeight: 600, 
                  color: "text.secondary" 
                }}
              >
                Cancel and Go Back
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default HerdForm;