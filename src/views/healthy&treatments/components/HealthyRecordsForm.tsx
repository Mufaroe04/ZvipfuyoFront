// src/views/operations/components/HealthyRecordsForm.tsx
import React from 'react';
import { 
  Container, Box, Button, TextField, 
  Paper, Typography, CircularProgress, Stack, Divider, 
  InputAdornment
} from "@mui/material";
import { useHealthyRecordsForm } from '../hooks/useHealthyRecordsForm';
import { AsyncAnimalSelect } from '../../../components/search/AsyncAnimalSelect';

interface HealthyRecordsFormProps {
  title: string;
}

const HealthyRecordsForm: React.FC<HealthyRecordsFormProps> = ({ title }) => {
  const { 
    formData, 
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
          borderRadius: '4px', 
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

            <AsyncAnimalSelect
              multiple={false}
              value={formData.animal_object || null}
              onChange={(animal) => setFormData({ 
                ...formData, 
                animal: animal ? Number(animal.id) : 0,
                animal_tag: animal ? animal.tag_number : '',
                animal_object: animal
              })}
              label="Search Animal Tag"
              required
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