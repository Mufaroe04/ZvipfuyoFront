import WeightForm from './WeightForm';
import { useAppSelector } from '../../../redux/hooks';
import { useParams } from 'react-router-dom';

const EditWeightForm = () => {
  const { id } = useParams<{ id: string }>();
  const weightRecord = useAppSelector(state => state.operations.weights.find(w => w.id === Number(id)));
  return <WeightForm title="Edit Measurement" initialData={weightRecord} />;
};
export default EditWeightForm;