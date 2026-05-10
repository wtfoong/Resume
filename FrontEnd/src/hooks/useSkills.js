import { useQuery } from '@tanstack/react-query';
import { getSkills } from '../api/resumeApi';

export const useSkills = () => useQuery({
  queryKey: ['skills'],
  queryFn: () => getSkills().then((res) => res.data),
});
