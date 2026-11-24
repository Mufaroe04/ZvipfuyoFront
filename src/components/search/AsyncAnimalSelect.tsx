import React, { useState, useEffect, useMemo } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { livestockService } from '../../services/livestockService';
import { Animal, Gender } from '../../types/types';

interface BaseAsyncProps {
  label?: string;
  required?: boolean;
  gender?: Gender | 'male' | 'female';
  excludeId?: string | number;
}

interface SingleSelectProps extends BaseAsyncProps {
  multiple?: false;
  value: Animal | null; 
  onChange: (value: Animal | null) => void;
}

interface MultipleSelectProps extends BaseAsyncProps {
  multiple: true;
  value: Animal[];
  onChange: (value: Animal[]) => void;
}

type AsyncAnimalSelectProps = SingleSelectProps | MultipleSelectProps;

export const AsyncAnimalSelect: React.FC<AsyncAnimalSelectProps> = ({
  multiple = false,
  value,
  onChange,
  label = "Search Animal Tag",
  required = false,
  gender,
  excludeId,
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
        const hasValue = multiple 
          ? Array.isArray(value) && value.length > 0 
          : Boolean(value);

        // If hydrating initial data and user hasn't typed anything yet
        if (hasValue && inputValue === '') {
          let searchTerms: string[] = [];
          
          if (multiple) {
            searchTerms = (value as Animal[]).map(a => a.tag_number);
          } else {
            searchTerms = [(value as Animal).tag_number];
          }

          // Fetch using tag numbers to remain fully compatible with standard search filters
          if (searchTerms[0]) {
            const res = await livestockService.getAnimals({ search: searchTerms[0], page: 1 });
            responseData = res.data;
          }
        } else {
          // Normal paginated query lookup
          const queryParams: any = { search: inputValue, page: 1 };
          if (gender) queryParams.gender = gender.toLowerCase();
          const res = await livestockService.getAnimals(queryParams);
          responseData = res.data;
        }

        if (active && responseData) {
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
  }, [inputValue, value, open, gender, excludeId, multiple]);

  // Fixed Error: Cast currentValues explicitly to avoid union reference issues inside loops
  const memoizedOptions = useMemo(() => {
    const currentValues = multiple 
      ? (value as Animal[] || []) 
      : (value ? [value as Animal] : []);
    
    const combined = [...options];
    currentValues.forEach(val => {
      if (val && !combined.some(o => o.id === val.id)) {
        combined.push(val);
      }
    });
    return combined;
  }, [options, value, multiple]);

  return (
    <Autocomplete
      multiple={multiple}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={memoizedOptions}
      loading={loading}
      // Fixed type safety assignment for component value state mapping
      value={multiple ? (value as Animal[] || []) : (value as Animal | null)}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      onChange={(_, selectedItem) => {
        if (multiple) {
          // Explicitly narrow callback context to match structural configuration signatures
          (onChange as (val: Animal[]) => void)((selectedItem as Animal[]) || []);
        } else {
          (onChange as (val: Animal | null) => void)(selectedItem as Animal | null);
        }
      }}
      isOptionEqualToValue={(option, val) => option.id === val.id}
      getOptionLabel={(option) => option.tag_number || ""}
      filterOptions={(x) => x}
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

