// import React from 'react';
// import { TextField, MenuItem, Button, Stack, Paper, Typography } from '@mui/material';
// import { useInventoryForm } from '../hooks/useInventoryForm';
// import { InventoryItem } from '../../../types/types';

// interface InventoryFormModalProps {
//   title: string;
//   initialData?: InventoryItem | null;
// }

// const InventoryFormModal: React.FC<InventoryFormModalProps> = ({ title, initialData }) => {
//   const { formData, setFormData, suppliers, handleSubmit } = useInventoryForm(initialData);

//   return (
//     <Paper variant="outlined" sx={{ p: 3, mt: 4, borderRadius: '16px' }}>
//       <form onSubmit={handleSubmit}>
//         <Stack spacing={3}>
//           <Typography variant="h6" fontWeight="bold">{title}</Typography>
          
//           <TextField 
//             label="Item Name" 
//             fullWidth 
//             required 
//             value={formData.name}
//             onChange={e => setFormData({...formData, name: e.target.value})} 
//           />

//           <TextField 
//             select 
//             label="Preferred Supplier" 
//             fullWidth 
//             value={formData.preferred_supplier} 
//             onChange={e => setFormData({...formData, preferred_supplier: e.target.value})}
//           >
//             <MenuItem value=""><em>None Linked</em></MenuItem>
//             {suppliers.map(s => (
//               <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
//             ))}
//           </TextField>

//           <TextField 
//             select 
//             label="Category" 
//             fullWidth 
//             value={formData.category} 
//             onChange={e => setFormData({...formData, category: e.target.value})}
//           >
//             <MenuItem value="feed">Feed</MenuItem>
//             <MenuItem value="medicine">Medicine</MenuItem>
//             <MenuItem value="tool">Equipment</MenuItem>
//           </TextField>

//           <Stack direction="row" spacing={2}>
//             <TextField 
//               label="Quantity" 
//               type="number" 
//               fullWidth 
//               value={formData.quantity_on_hand}
//               onChange={e => setFormData({...formData, quantity_on_hand: Number(e.target.value)})} 
//               disabled={!!initialData}
//             />
//             <TextField 
//               select 
//               label="Unit" 
//               sx={{ width: '120px' }} 
//               value={formData.unit} 
//               onChange={e => setFormData({...formData, unit: e.target.value})}
//             >
//               <MenuItem value="kg">kg</MenuItem>
//               <MenuItem value="l">Liters</MenuItem>
//               <MenuItem value="units">Units</MenuItem>
//             </TextField>
//           </Stack>

//           <TextField 
//             label="Alert Level (Reorder at)" 
//             type="number" 
//             fullWidth 
//             value={formData.reorder_level}
//             onChange={e => setFormData({...formData, reorder_level: Number(e.target.value)})} 
//           />

//           <Button type="submit" variant="contained" size="large" sx={{ borderRadius: '12px', py: 1.5, bgcolor: '#18774c' }}>
//             Save to Inventory
//           </Button>
//         </Stack>
//       </form>
//     </Paper>
//   );
// };

// export default InventoryFormModal;
import React from 'react';
import { TextField, MenuItem, Button, Stack, Paper, Typography } from '@mui/material';
import { useInventoryForm } from '../hooks/useInventoryForm';
import { Category, InventoryItem } from '../../../types/types';

interface InventoryFormModalProps {
  title: string;
  initialData?: InventoryItem | null;
}

const InventoryFormModal: React.FC<InventoryFormModalProps> = ({ title, initialData }) => {
  const { formData, setFormData, suppliers, handleSubmit } = useInventoryForm(initialData);

  return (
    <Paper variant="outlined" sx={{ p: 3, mt: 4, borderRadius: '4px' }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Typography variant="body1" fontWeight="bold">{title}</Typography>
          
          <TextField 
            label="Item Name" 
            fullWidth 
            required 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})} 
          />

          <TextField 
            select 
            label="Preferred Supplier" 
            fullWidth 
            value={formData.preferred_supplier === 0 ? '' : formData.preferred_supplier} 
            onChange={e => setFormData({...formData, preferred_supplier: Number(e.target.value) || 0})}
          >
            <MenuItem value=""><em>None Linked</em></MenuItem>
            {suppliers.map(s => (
              <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
            ))}
          </TextField>

          <TextField 
            select 
            label="Category" 
            fullWidth 
            value={formData.category} 
            onChange={e => setFormData({...formData, category: e.target.value as Category})}
          >
            <MenuItem value="feed">Feed</MenuItem>
            <MenuItem value="med">Medicine</MenuItem>
            <MenuItem value="equip">Equipment</MenuItem>
            <MenuItem value="tag">Ear Tags</MenuItem>
          </TextField>

          <Stack direction="row" spacing={2}>
            <TextField 
              label="Quantity" 
              type="number" 
              fullWidth 
              value={formData.quantity_on_hand}
              onChange={e => setFormData({...formData, quantity_on_hand: Number(e.target.value)})} 
              disabled={!!initialData}
            />
            <TextField 
              select 
              label="Unit" 
              sx={{ width: '120px' }} 
              value={formData.unit} 
              onChange={e => setFormData({...formData, unit: e.target.value})}
            >
              <MenuItem value="kg">kg</MenuItem>
              <MenuItem value="l">Liters</MenuItem>
              <MenuItem value="units">Units</MenuItem>
            </TextField>
          </Stack>

          <TextField 
            label="Alert Level (Reorder at)" 
            type="number" 
            fullWidth 
            value={formData.reorder_level}
            onChange={e => setFormData({...formData, reorder_level: Number(e.target.value)})} 
          />

          <Button type="submit" variant="contained" size="large" sx={{ borderRadius: '4px', py: 1.5, bgcolor: '#18774c' }}>
            Save to Inventory
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default InventoryFormModal;