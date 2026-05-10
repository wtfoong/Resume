import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createExperience, updateExperience, deleteExperience } from '../../api/admin/experienceApi';

export const useAdminExperience = () => {
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['experience'] });

  const createExperienceMutation = useMutation({
    mutationFn: createExperience,
    onSuccess: invalidate,
  });

  const updateExperienceMutation = useMutation({
    mutationFn: ({ id, data }) => updateExperience(id, data),
    onSuccess: invalidate,
  });

  const deleteExperienceMutation = useMutation({
    mutationFn: deleteExperience,
    onSuccess: invalidate,
  });

  return {
    createExperience: createExperienceMutation,
    updateExperience: updateExperienceMutation,
    deleteExperience: deleteExperienceMutation,
  };
};
