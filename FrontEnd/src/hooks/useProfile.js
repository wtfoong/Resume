import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../api/resumeApi';

export const useProfile = () => useQuery({
  queryKey: ['profile'],
  queryFn: () => getProfile().then((res) => res.data),
});
