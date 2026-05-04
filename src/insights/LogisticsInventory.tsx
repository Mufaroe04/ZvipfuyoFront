import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useAppSelector } from '../redux/hooks';
import { InventoryItem } from '../types/types';

export const LogisticsInventory: React.FC = () => {
  const { insights_data } = useAppSelector((state: any) => state.insights);

  const inventory: InventoryItem[] = insights_data?.inventory || [];

  const procurementInstruction = typeof insights_data?.narrative === 'object' 
    ? insights_data.narrative.procurementInstruction 
    : 'No supply constraints detected.';

  const currencyStrategy = typeof insights_data?.narrative === 'object' 
    ? insights_data.narrative.currencyStrategy 
    : 'Maintain current allocation strategy.';

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
        5. Logistics, Inventory & Financial Outlook
      </Typography>

      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px', mb: 3, border: '1px solid #D1D5DB' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Resource</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Level</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item, index) => (
              <TableRow key={index} sx={{ borderBottom: index !== inventory.length - 1 ? '1px solid #E2E8F0' : 'none' }}>
                <TableCell sx={{ color: '#334155', fontWeight: 600 }}>{item.name}</TableCell>
                <TableCell sx={{ color: '#334155' }}>{item.quantity_on_hand}</TableCell>
                <TableCell sx={{ fontWeight: 600, color: item.is_low_stock ? '#DC2626' : '#16A34A' }}>
                  {item.notes}
                </TableCell>
              </TableRow>
            ))}
            {inventory.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ color: '#6B7280', py: 3 }}>
                  Inventory operational data clear.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ p: 2.5, backgroundColor: '#FFFBEB', borderRadius: '8px', borderLeft: '4px solid #D97706', mb: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#92400E', textTransform: 'uppercase', mb: 0.5 }}>
          Procurement Priority
        </Typography>
        <Typography variant="body2" component="div" sx={{ color: '#78350F', lineHeight: 1.6 }}>
          <ReactMarkdown>{procurementInstruction}</ReactMarkdown>
        </Typography>
      </Box>

      <Box sx={{ p: 2.5, backgroundColor: '#F0FDF4', borderRadius: '8px', borderLeft: '4px solid #16A34A' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#14532D', textTransform: 'uppercase', mb: 0.5 }}>
          Transaction & Currency Strategy
        </Typography>
        <Typography variant="body2" component="div" sx={{ color: '#166534', lineHeight: 1.6 }}>
          <ReactMarkdown>{currencyStrategy}</ReactMarkdown>
        </Typography>
      </Box>
    </Box>
  );
};