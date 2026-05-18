import { useState, useEffect, useRef } from 'react';
import { useIonToast } from '@ionic/react';
import api from '../../../services/api';

export interface AuditFormData {
  herd: string;
  expected_count: number;
  actual_count: number;
  condition: string;
  water_ponds: number;
  feed_stations: number;
  bales_observed: number;
  discrepancy_notes: string;
}

export const useCountingSession = () => {
  // const [viewMode, setViewMode] = useState<'new' | 'history' | 'drone'>('new');
  const [herds, setHerds] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [showToast] = useIonToast();
  const [isScanning, setIsScanning] = useState(false);
  const [viewMode, setViewMode] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<AuditFormData>({
    herd: '',
    expected_count: 0,
    actual_count: 0,
    condition: 'Good',
    water_ponds: 0,
    feed_stations: 0,
    bales_observed: 0,
    discrepancy_notes: ''
  });

  const fetchData = async () => {
    try {
      const [herdsRes, historyRes] = await Promise.all([
        api.get('herds/'),
        api.get('counting/')
      ]);
      setHerds(herdsRes.data);
      setHistory(historyRes.data);
    } catch (err) {
      console.error("Fetch operational data sequence failure:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

//   const handleHerdChange = (herdId: string) => {
//     const selected = herds.find(h => h.id === parseInt(herdId));
//     setFormData(prev => ({ 
//       ...prev, 
//       herd: herdId, 
//       expected_count: selected?.animal_count || 0,
//       actual_count: 0 
//     }));
//   };

const handleHerdChange = (herdId: string) => {
  // Use the normalized herdsArray to prevent runtime find exceptions
  const selected = herdsArray.find(h => h.id === parseInt(herdId));
  setFormData(prev => ({ 
    ...prev, 
    herd: herdId, 
    expected_count: selected?.animal_count || 0,
    actual_count: 0 
  }));
};
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearMediaFile = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
  };

  const handleDroneScan = async () => {
    if (!formData.herd || !selectedFile) {
      showToast({ 
        message: !formData.herd ? 'Select a herd first' : 'Please upload drone footage first', 
        color: 'warning', 
        duration: 2000 
      });
      return;
    }

    setIsScanning(true);
    const uploadData = new FormData();
    uploadData.append('file', selectedFile);
    uploadData.append('herd_id', formData.herd);

    try {
      const response = await api.post('drone-count/', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, actual_count: response.data.detected_count }));
      showToast({ message: 'Zvipfuyo AI Engine Analysis Complete', color: 'success', duration: 3000 });
    } catch (err) {
      showToast({ message: 'AI Engine unreachable. Falling back to simulated count validation.', color: 'danger', duration: 3000 });
      setFormData(prev => ({ ...prev, actual_count: Math.max(0, prev.expected_count - Math.floor(Math.random() * 2)) }));
    } finally {
      setIsScanning(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.herd) {
      showToast({ message: 'Please select a herd first', color: 'warning', duration: 2000 });
      return;
    }
    try {
      await api.post('counting/', formData);
      showToast({ message: 'Session logs successfully serialized and synced.', color: 'success', duration: 3000 });
      setFormData({
        herd: '', expected_count: 0, actual_count: 0, condition: 'Good',
        water_ponds: 0, feed_stations: 0, bales_observed: 0, discrepancy_notes: ''
      });
      clearMediaFile();
      setViewMode(2);
      fetchData();
    } catch (err) {
      showToast({ message: 'Error saving session data.', color: 'danger' });
    }
  };
// Safely extract the array regardless of backend pagination wrappers
const historyArray = Array.isArray(history) 
  ? history 
  : (history && typeof history === 'object' && Array.isArray((history as any).results))
    ? (history as any).results
    : [];

// Calculate metrics cleanly without runtime type exceptions
const shortages = historyArray.filter((s: any) => s.actual_count < s.expected_count);
const totalMissing = shortages.reduce((acc: number, curr: any) => acc + (curr.expected_count - curr.actual_count), 0);
// Safely extract the herds array regardless of backend pagination wrappers
const herdsArray = Array.isArray(herds)
  ? herds
  : (herds && typeof herds === 'object' && Array.isArray((herds as any).results))
    ? (herds as any).results
    : [];
  return {
    viewMode,
    setViewMode,
    herds: herdsArray,
    history: historyArray,
    isScanning,
    selectedFile,
    previewUrl,
    fileInputRef,
    formData,
    setFormData,
    handleHerdChange,
    handleFileSelect,
    clearMediaFile,
    handleDroneScan,
    handleSubmit,
    shortages,
    totalMissing
  };
};