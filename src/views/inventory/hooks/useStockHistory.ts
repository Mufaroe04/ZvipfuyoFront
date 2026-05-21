import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../../services/api';

export const useStockHistory = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const itemId = queryParams.get('item');

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await api.get('inventory/logs/', { 
          params: { item_id: itemId || undefined } 
        });
        setLogs(res.data);
      } catch (err) {
        console.error("Error fetching logs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [itemId]);

  return {
    logs,
    loading,
    itemId
  };
};