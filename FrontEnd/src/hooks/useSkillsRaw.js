import { useQuery } from '@tanstack/react-query';
import client from '../api/client';

export const useSkillsRaw = () => useQuery({
  queryKey: ['skills-raw'],
  queryFn: () => client.get('/skills/raw').then((res) => res.data),
});