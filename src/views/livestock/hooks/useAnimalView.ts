import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchFullAnimalProfile } from "../../../redux/store/slices/livestockSlice";


export const useAnimalView=()=>{
     const { id } = useParams<{ id: string }>();
      const dispatch = useAppDispatch();
      const history = useHistory();
      const { selectedAnimal, loading } = useAppSelector((state) => state.livestock);
    
      useEffect(() => {
        if (id) dispatch(fetchFullAnimalProfile(Number(id)));
      }, [id, dispatch]);

    return{
        id,history,selectedAnimal,loading
    };
}