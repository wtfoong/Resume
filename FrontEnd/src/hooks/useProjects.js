import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../api/resumeApi';

export const useProjects = () => useQuery({
  queryKey: ['projects'],
  queryFn: () => getProjects().then((res) => res.data),
});
