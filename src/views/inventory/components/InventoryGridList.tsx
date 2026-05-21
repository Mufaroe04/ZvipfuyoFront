import React from 'react';
import { useHistory } from 'react-router-dom';
import { InventoryItem } from '../../../types/types';
import { getInventoryColumns } from './InventoryColumns';
import { CustomDataGrid } from '../../../components/datagrid/CustomDataGrid';

interface InventoryTableProps {
  items: InventoryItem[];
  loading: boolean;
  rowCount: number;
  paginationModel: { page: number; pageSize: number };
  onPaginationModelChange: (model: any) => void;
  onAdjust: (item: InventoryItem) => void;
}

const InventoryGridList: React.FC<InventoryTableProps> = ({ items, loading, onAdjust ,paginationModel,onPaginationModelChange,rowCount}) => {
  const history = useHistory();

  const handleViewHistory = (id: string | number) => {
    history.push(`/inventory/history?item=${id}`);
  };

  const columns = getInventoryColumns(onAdjust, handleViewHistory);

  return (
          <CustomDataGrid 
            rows={items} 
            rowCount={rowCount}
            columns={columns} 
            loading={loading}
            paginationModel={paginationModel}
            onPaginationModelChange={onPaginationModelChange}
            height="60vh"
            paginationMode="client"
            getRowId={(row) => row.id}
          />
  );
};

export default InventoryGridList;