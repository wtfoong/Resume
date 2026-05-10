import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject, updateProject, deleteProject } from '../../api/admin/projectApi';

export const useAdminProject = () => {
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['projects'] });

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: invalidate,
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, data }) => updateProject(id, data),
    onSuccess: invalidate,
  });

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: invalidate,
  });

  return {
    createProject: createProjectMutation,
    updateProject: updateProjectMutation,
    deleteProject: deleteProjectMutation,
  };
};
