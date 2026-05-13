import React from 'react';
import { 
  Container, Box, Button, TextField, 
  Paper, Typography, CircularProgress, Stack, Divider, 
  Autocomplete,
  InputAdornment
} from "@mui/material";
import { useHealthyRecordsForm } from '../hooks/useHealthyRecordsForm';

interface HealthyRecordsFormProps {
  title: string;
}

const HealthyRecordsForm: React.FC<HealthyRecordsFormProps> = ({ title }) => {
  const { 
    formData, 
    animals,
    setFormData,
    isSubmitting, 
    isFormValid, 
    handleSubmit, 
    isEditMode, 
    goBack 
  } = useHealthyRecordsForm();

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
              <Typography variant="body1" fontWeight="black" >
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isEditMode 
                  ? "Update the Record medical interventions and costs." 
                  : "Record medical interventions and costs."}
              </Typography>
            </Box>

            <Divider />
            <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold', color: '#18774c' }}>
                Animal Identification
            </Typography>
            
              <Autocomplete
                fullWidth
                options={animals}
                value={animals?.find(m => m.tag_number === formData.animal_tag) || null}
                getOptionLabel={(option) => option.tag_number || ""}
                onChange={(_event, newValue) => {
                setFormData({ ...formData, animal: newValue ? Number(newValue.id) : 0 });
                setFormData({ ...formData, animal_tag: newValue ? newValue.tag_number : '' });

                }}
                renderInput={(params) => (
                <TextField 
                    {...params} 
                    label="Search Tag Number" 
                    required 
                    placeholder="e.g. ZW-26..."
                />
                )}
            />
           <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold', color: '#18774c' }}>
              Clinical Details
            </Typography>

            <TextField
              fullWidth
              label="Condition / Diagnosis"
              value={formData.condition}
              onChange={(e) => setFormData({...formData, condition: e.target.value})}
              required
            />

            <TextField
              fullWidth
              type="date"
              label="Date of Treatment"
              InputLabelProps={{ shrink: true }}
              value={formData.treatment_date}
              onChange={(e) => setFormData({...formData, treatment_date: e.target.value})}
              required
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Treatment Administered"
              value={formData.treatment}
              onChange={(e) => setFormData({...formData, treatment: e.target.value})}
              required
            />

            <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold', color: '#18774c' }}>
              Financials & Scheduling
            </Typography>

            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Cost (USD)"
                type="number"
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                value={formData.cost}
                onChange={(e) => setFormData({...formData, cost: Number(e.target.value)})}
              />
              <TextField
                fullWidth
                type="date"
                label="Follow-up Date"
                InputLabelProps={{ shrink: true }}
                value={formData.follow_up_date}
                onChange={(e) => setFormData({...formData, follow_up_date: e.target.value})}
              />
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
                  isEditMode ? 'Update Record ' : 'Add New Record'
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

export default HealthyRecordsForm;