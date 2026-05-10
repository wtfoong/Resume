import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProjectTag, updateProjectTag, deleteProjectTag } from '../../api/admin/projectTagApi';

export const useAdminProjectTag = () => {
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['projects'] });

  const createProjectTagMutation = useMutation({
    mutationFn: createProjectTag,
    onSuccess: invalidate,
  });

  const updateProjectTagMutation = useMutation({
    mutationFn: ({ id, data }) => updateProjectTag(id, data),
    onSuccess: invalidate,
  });

  const deleteProjectTagMutation = useMutation({
    mutationFn: deleteProjectTag,
    onSuccess: invalidate,
  });

  return {
    createProjectTag: createProjectTagMutation,
    updateProjectTag: updateProjectTagMutation,
    deleteProjectTag: deleteProjectTagMutation,
  };
};
