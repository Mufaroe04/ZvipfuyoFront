// import React from 'react';
// import { Paper, TextField, MenuItem, Typography, Box, Stack, Autocomplete, Button, Container } from '@mui/material';
// import { useBreedingEventForm } from '../hooks/useBreedingEventForm';

// interface FormProps {
//   title: string;
//   initialData?: any;
// }

// const BreedingEventForm: React.FC<FormProps> = ({ title, initialData }) => {
//   const { formData, setFormData, loading, handleSubmit, females, males, isFormValid } = useBreedingEventForm(initialData);

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #ececec' }}>
//         <form onSubmit={handleSubmit}>
//           <Stack spacing={3}>
//         <Typography variant="body1" fontWeight="bold">{title}</Typography>

//             <Autocomplete
//               fullWidth
//               options={females}
//               getOptionLabel={(option) => option.tag_number || ""}
//               value={females.find((a) => a.id === Number(formData.animal)) || null}
//               onChange={(_, newValue) => setFormData({ ...formData, animal: newValue ? newValue.id.toString() : "" })}
//               renderInput={(params) => <TextField {...params} label="Dam (Cow) Tag" required />}
//             />

            

//             <TextField
//               fullWidth
//               type="date"
//               label="Date of Service"
//               InputLabelProps={{ shrink: true }}
//               value={formData.breeding_date}
//               onChange={(e) => setFormData({ ...formData, breeding_date: e.target.value })}
//               required
//             />

//             <TextField
//               select
//               fullWidth
//               label="Method"
//               value={formData.method}
//               onChange={(e) => setFormData({ ...formData, method: e.target.value })}
//             >
//               <MenuItem value="natural">Natural Service</MenuItem>
//               <MenuItem value="ai">Artificial Insemination</MenuItem>
//             </TextField>

//             <Autocomplete
//               freeSolo
//               fullWidth
//               options={males}
//               getOptionLabel={(option) => typeof option === 'string' ? option : option.tag_number}
//               value={males.find((a) => a.tag_number === formData.sire_tag) || formData.sire_tag}
//               onInputChange={(_, newValue) => setFormData({ ...formData, sire_tag: newValue })}
//               renderInput={(params) => <TextField {...params} label="Sire (Bull) Tag" />}
//             />

//             <TextField
//               select
//               fullWidth
//               label="Status"
//               value={formData.status}
//               onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//             >
//               <MenuItem value="pending">Pending</MenuItem>
//               <MenuItem value="confirmed">Confirmed Pregnant</MenuItem>
//               <MenuItem value="failed">Failed</MenuItem>
//             </TextField>

//             <Button
//               variant="contained"
//               type="submit"
//               disabled={loading || !isFormValid}
//               fullWidth
//               sx={{ borderRadius: '12px', py: 1.8, bgcolor: '#18774c', '&:hover': { bgcolor: '#14633f' } }}
//             >
//               {loading ? 'Saving...' : 'Save Breeding Event'}
//             </Button>
//           </Stack>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default BreedingEventForm;
import React from 'react';
import { Paper, TextField, MenuItem, Typography, Stack, Button, Container } from '@mui/material';
import { useBreedingEventForm } from '../hooks/useBreedingEventForm';
import { AsyncAnimalSelect } from '../../../components/search/AsyncAnimalSelect';

interface FormProps {
  title: string;
  initialData?: any;
}

const BreedingEventForm: React.FC<FormProps> = ({ title, initialData }) => {
  const { formData, setFormData, isSubmitting, handleSubmit, isFormValid } = useBreedingEventForm(initialData);

  return (
    <Container maxWidth="sm">
      <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #ececec' }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Typography variant="body1" fontWeight="bold">{title}</Typography>

            {/* TRACKS DAM VIA UNIQUE ID WRAPPERS */}
            <AsyncAnimalSelect
              value={formData.animal}
              onChange={(val) => setFormData({ ...formData, animal: val })}
              gender="female"
              label="Dam (Cow) Tag"
              valueType="id"
              required
            />

            <TextField fullWidth type="date" label="Date of Service" InputLabelProps={{ shrink: true }} value={formData.breeding_date} onChange={(e) => setFormData({ ...formData, breeding_date: e.target.value })} required />

            <TextField select fullWidth label="Method" value={formData.method} onChange={(e) => setFormData({ ...formData, method: e.target.value })}>
              <MenuItem value="natural">Natural Service</MenuItem>
              <MenuItem value="ai">Artificial Insemination</MenuItem>
            </TextField>

            {/* TRACKS SIRE VIA STRING TAG STRATEGIES */}
            <AsyncAnimalSelect
              value={formData.sire_tag}
              onChange={(val) => setFormData({ ...formData, sire_tag: val })}
              gender="male"
              label="Sire (Bull) Tag"
              valueType="tag_number"
            />

            <TextField select fullWidth label="Status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="confirmed">Confirmed Pregnant</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
            </TextField>

            <Button variant="contained" type="submit" disabled={isSubmitting || !isFormValid} fullWidth sx={{ borderRadius: '12px', py: 1.8, bgcolor: '#18774c', '&:hover': { bgcolor: '#14633f' } }}>
              {isSubmitting ? 'Saving...' : 'Save Breeding Event'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default BreedingEventForm;