import React, { useState, useEffect, useMemo } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { livestockService } from '../../services/livestockService'; // Verify exact relative path
import { Animal, Gender } from '../../types/types';

interface AsyncAnimalSelectProps {
  value: string | number;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  gender?: Gender | 'male' | 'female';
  excludeId?: string | number; // Useful to prevent an animal being its own parent
  valueType?: 'id' | 'tag_number'; // Controls what value string is emitted and tracked
}

export const AsyncAnimalSelect: React.FC<AsyncAnimalSelectProps> = ({
  value,
  onChange,
  label = "Search Animal Tag",
  required = false,
  gender,
  excludeId,
  valueType = 'id'
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Animal[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchDropdownData = async () => {
      setLoading(true);
      try {
        let responseData;
        
        // If there's a selected value but no input typed yet, hydrate that specific option context
        if (value && inputValue === '') {
          const searchParams: any = valueType === 'id' 
            ? { animal_id: Number(value) } 
            : { search: String(value) }; // Fallback lookup rule for tags
          const res = await livestockService.getAnimals(searchParams);
          responseData = res.data;
        } else {
          // Normal interactive user query operations
          const queryParams: any = { search: inputValue, page: 1 };
          if (gender) queryParams.gender = gender.toLowerCase();
          
          const res = await livestockService.getAnimals(queryParams);
          responseData = res.data;
        }

        if (active) {
          const results = responseData.results || responseData;
          let collection: Animal[] = Array.isArray(results) ? results : [];
          
          if (excludeId) {
            collection = collection.filter(a => a.id.toString() !== excludeId.toString());
          }
          setOptions(collection);
        }
      } catch (err) {
        console.error("AsyncAnimalSelect engine failure:", err);
      } finally {
        setLoading(false);
      }
    };

    const delayTimer = setTimeout(() => {
      fetchDropdownData();
    }, 350);

    return () => {
      active = false;
      clearTimeout(delayTimer);
    };
  }, [inputValue, value, open, gender, excludeId, valueType]);

  const selectedValue = useMemo(() => {
    if (!value) return null;
    const match = options.find((opt) => {
      return valueType === 'id' 
        ? opt.id.toString() === value.toString()
        : opt.tag_number.toLowerCase() === value.toString().toLowerCase();
    });
    
    if (!match) {
      if (valueType === 'id') {
        return { id: Number(value), tag_number: `ID: ${value}` } as Animal;
      } else {
        return { id: 0, tag_number: String(value) } as Animal;
      }
    }
    return match;
  }, [options, value, valueType]);

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={options}
      loading={loading}
      value={selectedValue}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      onChange={(_, selectedItem) => {
        if (!selectedItem) {
          onChange('');
          return;
        }
        onChange(valueType === 'id' ? selectedItem.id.toString() : selectedItem.tag_number);
      }}
      isOptionEqualToValue={(option, val) => option.id === val.id}
      getOptionLabel={(option) => option.tag_number || ""}
      filterOptions={(x) => x} // Disable client filtering since backend manages pagination windows
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};