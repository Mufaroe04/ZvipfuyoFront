// import React, { useState } from "react";
// import {
//   Container,
//   Box,
//   Button,
//   TextField,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Paper,
//   Typography,
//   Stack,
//   CircularProgress,
//   SelectChangeEvent, // Import this specific type
// } from "@mui/material";
// import { useAppDispatch } from "../../../redux/hooks";
// import { createHerd } from "../../../redux/store/slices/livestockSlice";
// import { useHistory } from "react-router-dom";
// import { BREED_CHOICES, HERD_TYPES } from '../../../constants/livestock';

// interface HerdFormState {
//   name: string;
//   location: string;
//   herd_type: string;
//   primary_breed: string;
// }

// const HerdAdd: React.FC = () => {
//   const [herd, setHerd] = useState<HerdFormState>({ 
//     name: '', 
//     location: '', 
//     herd_type: '', 
//     primary_breed: '' 
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const dispatch = useAppDispatch();
//   const history = useHistory();

//   const isFormValid = 
//     herd.name.trim() !== '' && 
//     herd.location.trim() !== '' && 
//     herd.herd_type !== '' && 
//     herd.primary_breed !== '';

//   // This single handler perfectly matches both TextField and Select change events
//   const handleChange = (field: keyof HerdFormState) => (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
//   ) => {
//     setHerd((prev) => ({ ...prev, [field]: e.target.value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!isFormValid || isSubmitting) return;

//     try {
//       setIsSubmitting(true);
//       await dispatch(createHerd(herd)).unwrap();
//       history.replace("/herds");
//     } catch (error) {
//       console.error("Herd creation failed:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 4, mb: 4, minHeight: "calc(100vh - 64px)" }}>
//       <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
//         <Typography 
//           variant="body1" 
//           fontWeight="bold" 
//         >
//           Add New Herd
//         </Typography>
//       </Stack>

//       <Paper 
//         elevation={0} 
//         sx={{ 
//           p: 4, 
//           borderRadius: '16px', 
//           border: '1px solid #e0e0e0',
//           boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
//         }}
//       >
//         <Box component="form" onSubmit={handleSubmit} noValidate>
//           <TextField
//             margin="normal"
//             id="name"
//             label="Herd Name"
//             fullWidth
//             variant="outlined"
//             value={herd.name}
//             onChange={handleChange('name')}
//             required
//             sx={{ mb: 2 }}
//           />

//           <TextField
//             margin="normal"
//             id="location"
//             label="Location (e.g. Harare)"
//             fullWidth
//             variant="outlined"
//             value={herd.location}
//             onChange={handleChange('location')}
//             required
//             sx={{ mb: 2 }}
//           />

//           <FormControl fullWidth margin="normal" required sx={{ mb: 2 }}>
//             <InputLabel id="primary-breed-label">Primary Breed</InputLabel>
//             <Select
//               labelId="primary-breed-label"
//               id="primary_breed"
//               value={herd.primary_breed}
//               label="Primary Breed"
//               onChange={handleChange('primary_breed')}
//             >
//               {BREED_CHOICES.map((choice) => (
//                 <MenuItem key={choice.value} value={choice.value} sx={{ fontSize: "0.9rem" }}>
//                   {choice.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl fullWidth margin="normal" required sx={{ mb: 3 }}>
//             <InputLabel id="herd-type-label">Herd Type</InputLabel>
//             <Select
//               labelId="herd-type-label"
//               id="herd_type"
//               value={herd.herd_type}
//               label="Herd Type"
//               onChange={handleChange('herd_type')}
//             >
//               {HERD_TYPES.map((type) => (
//                 <MenuItem key={type.value} value={type.value} sx={{ fontSize: "0.9rem" }}>
//                   {type.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 2 }}>
//             <Button
//               variant="text"
//               onClick={() => history.goBack()}
//               sx={{ 
//                 textTransform: "none", 
//                 fontWeight: 600, 
//                 color: "text.secondary",
//                 fontFamily: '"Plus Jakarta Sans", sans-serif'
//               }}
//             >
//               Cancel
//             </Button>
            
//             <Button
//               type="submit"
//               variant="contained"
//               disabled={!isFormValid || isSubmitting}
//               sx={{
//                 textTransform: "none",
//                 fontWeight: 'bold',
//                 px: 4,
//                 borderRadius: '8px',
//                 backgroundColor: "#18774c",
//                 fontFamily: '"Plus Jakarta Sans", sans-serif',
//                 '&:hover': {
//                   backgroundColor: "#145c3b",
//                 },
//                 '&.Mui-disabled': {
//                   backgroundColor: 'rgba(24, 119, 76, 0.4)',
//                   color: 'rgba(255, 255, 255, 0.8)'
//                 }
//               }}
//             >
//               {isSubmitting ? (
//                 <CircularProgress size={24} sx={{ color: 'white' }} />
//               ) : (
//                 'Create Herd'
//               )}
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default HerdAdd;
import React from 'react';
import HerdForm from './HerdForm'; // Adjust path if necessary

/**
 * View component for creating a new livestock herd.
 * Utilizes the shared HerdForm component.
 */
const HerdAdd: React.FC = () => {
  return <HerdForm title="Add New Herd" />;
};

export default HerdAdd;