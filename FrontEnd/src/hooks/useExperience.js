import { useQuery } from '@tanstack/react-query';
import { getExperience } from '../api/resumeApi';

export const useExperience = () => useQuery({
  queryKey: ['experience'],
  queryFn: () => getExperience().then((res) => res.data),
});
