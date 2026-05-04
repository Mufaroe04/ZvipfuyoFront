import React from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, DataGridProps } from '@mui/x-data-grid';

interface CustomDataGridProps extends Omit<DataGridProps, 'initialState' | 'pageSizeOptions'> {
  columns: GridColDef[];
  rows: any[];
  height?: number | string;
}

export const CustomDataGrid: React.FC<CustomDataGridProps> = ({
  columns,
  rows,
  height = 650,
  ...rest
}) => {
  return (
    <Box
      sx={{
        height,
        width: '100%',
        bgcolor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        border: '1px solid #f0f0f0',
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        disableRowSelectionOnClick
        sx={{
          border: 0,
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 700,
            color: '#374151',
          },
          '& .MuiDataGrid-cell': {
            borderColor: '#f0f0f0',
          },
          ...rest.sx,
        }}
        {...rest}
      />
    </Box>
  );
};