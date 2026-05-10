import { useQuery } from '@tanstack/react-query';
import { getEducation } from '../api/resumeApi';

export const useEducation = () => useQuery({
  queryKey: ['education'],
  queryFn: () => getEducation().then((res) => res.data),
});
