import React from 'react';
import { getProcurementColumns } from './ProcurementColumns';
import { CustomDataGrid } from '../../../components/datagrid/CustomDataGrid';

interface ProcurementGridListProps {
  orders: any[];
  loading: boolean;
  onConfirm: (id: number) => void;
  onReceive: (id: number) => void;
}

const ProcurementGridList: React.FC<ProcurementGridListProps> = ({ orders, loading, onConfirm, onReceive }) => {
  const columns = getProcurementColumns(onConfirm, onReceive);
  
  return (
    <CustomDataGrid 
      rows={orders} 
      columns={columns} 
      loading={loading}
      height="60vh"
      paginationMode="client"
      getRowId={(row) => row.id}
    />
  );
};

export default ProcurementGridList;