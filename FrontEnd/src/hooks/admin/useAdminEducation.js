import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEducation, updateEducation, deleteEducation } from '../../api/admin/educationApi';

export const useAdminEducation = () => {
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['education'] });

  const createEducationMutation = useMutation({
    mutationFn: createEducation,
    onSuccess: invalidate,
  });

  const updateEducationMutation = useMutation({
    mutationFn: ({ id, data }) => updateEducation(id, data),
    onSuccess: invalidate,
  });

  const deleteEducationMutation = useMutation({
    mutationFn: deleteEducation,
    onSuccess: invalidate,
  });

  return {
    createEducation: createEducationMutation,
    updateEducation: updateEducationMutation,
    deleteEducation: deleteEducationMutation,
  };
};
