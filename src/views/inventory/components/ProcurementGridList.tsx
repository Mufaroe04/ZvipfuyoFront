import React from 'react';
import { getProcurementColumns } from './ProcurementColumns';
import { CustomDataGrid } from '../../../components/datagrid/CustomDataGrid';

interface ProcurementGridListProps {
  orders: any[];
  loading: boolean;
  rowCount: number;
  paginationModel: { page: number; pageSize: number };
  onPaginationModelChange: (model: any) => void;
  onConfirm: (id: number) => void;
  onReceive: (id: number) => void;
}

const ProcurementGridList: React.FC<ProcurementGridListProps> = ({ orders, loading,rowCount ,paginationModel,onPaginationModelChange,onConfirm, onReceive }) => {
  const columns = getProcurementColumns(onConfirm, onReceive);
  
  return (
    <CustomDataGrid 
      rows={orders} 
      columns={columns} 
      loading={loading}
      rowCount={rowCount}
      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      getRowId={(row) => row.id}
    />
  );
};

export default ProcurementGridList;