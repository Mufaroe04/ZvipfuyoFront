import React from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, DataGridProps } from '@mui/x-data-grid';

interface CustomDataGridProps extends DataGridProps {
  columns: GridColDef[];
  rows: any[];
  height?: number | string;
}

export const CustomDataGrid: React.FC<CustomDataGridProps> = ({
  columns,
  rows,
  height = 650,
  sx,
  ...rest
}) => {
  return (
    <Box
      sx={{
        height,
        width: '100%',
        bgcolor: 'white',
        borderRadius: '4px',
        border: '1px solid #f0f0f0',
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        // 1. Default Behavior
        paginationMode="server" 
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        
        // 2. Spread Props (Overrides)
        // This will inject rowCount, paginationModel, onPaginationModelChange, etc.
        // If the parent passes paginationMode="client", it will override the "server" default above.
        {...rest} 

        sx={{
          border: 0,
          fontWeight: 'medium',
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 700,
            color: '#374151',
          },
          // ... rest of your styling
          ...sx,
        }}
      />
    </Box>
  );
};