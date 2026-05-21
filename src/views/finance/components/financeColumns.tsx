// src/views/finance/components/financeColumns.ts
import { GridColDef } from '@mui/x-data-grid';

export const getMilkColumns = (): GridColDef[] => [
  { field: 'date', headerName: 'Date', flex: 1, valueGetter: (_, row) => row.transaction_details?.date },
  { field: 'buyer', headerName: 'Buyer', flex: 1 },
  { field: 'liters', headerName: 'Liters', flex: 1, renderCell: (params) => `${params.row.liters_sold} L` },
  { field: 'price', headerName: 'Price/Liter', flex: 1, renderCell: (params) => `${params.row.transaction_details?.currency} ${params.row.price_per_liter}` },
  { field: 'amount', headerName: 'Amount', flex: 1, renderCell: (params) => `${params.row.transaction_details?.currency} ${params.row.transaction_details?.amount}` },
  { field: 'reference_number', headerName: 'Ref #', flex: 1, valueGetter: (_, row) => row.transaction_details?.reference_number },
];

export const getCattleColumns = (): GridColDef[] => [
  { field: 'date', headerName: 'Date', flex: 1, valueGetter: (_, row) => row.transaction_details?.date },
  { field: 'weight', headerName: 'Total Weight', flex: 1, renderCell: (params) => `${params.row.total_weight_kg} kg` },
  { field: 'price_per_kg', headerName: 'Price/kg', flex: 1, renderCell: (params) => `${params.row.price_per_kg}` },
  { field: 'buyer', headerName: 'Buyer', flex: 1, valueGetter: (_, row) => row.buyer_name },
  { field: 'amount', headerName: 'Amount', flex: 1, renderCell: (params) => `${params.row.transaction_details?.currency} ${params.row.transaction_details?.amount}` },
  { field: 'reference_number', headerName: 'Ref #', flex: 1, valueGetter: (_, row) => row.transaction_details?.reference_number }
];

export const getExpenseColumns = (): GridColDef[] => [
  { field: 'date', headerName: 'Date', flex: 1 },
  { field: 'category', headerName: 'Category', flex: 1, valueGetter: (_, row) => row.category_name },
  { field: 'description', headerName: 'Description', flex: 1.5 },
  { field: 'amount', headerName: 'Amount', flex: 1, renderCell: (params) => `${params.row?.currency} ${params.row?.amount}` },
  { field: 'payment_method', headerName: 'Payment Method', flex: 1 },
  { field: 'reference_number', headerName: 'Ref #', flex: 1 }
];