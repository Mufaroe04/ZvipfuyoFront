import  { useEffect, useState } from 'react';
import { fetchMarketPrices, fetchWeights } from '../../../redux/store/slices/operationsSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

export const useBeef=()=>{
  const dispatch = useAppDispatch();
  const [tabValue, setTabValue] = useState(0);
  const { weights, marketPrices, loading } = useAppSelector((state) => state.operations);

  useEffect(() => {
    dispatch(fetchWeights());
    dispatch(fetchMarketPrices());
  }, [dispatch]);


    return{
        dispatch,tabValue,setTabValue,weights,marketPrices,loading
         }
}