import BreedingEventForm from './BreedingEventForm';
import { useAppSelector } from '../../../redux/hooks';
import { useParams } from 'react-router-dom';

const EditBreedingEventForm = () => {
  const { id } = useParams<{ id: string }>();
  const event = useAppSelector(state => state.reproduction.events.results.find(e => e.id === Number(id)));

  return <BreedingEventForm title="Edit Breeding Event" initialData={event} />;
};
export default EditBreedingEventForm;