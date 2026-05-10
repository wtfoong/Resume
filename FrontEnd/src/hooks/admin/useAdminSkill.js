import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSkill, updateSkill, deleteSkill } from '../../api/admin/skillApi';

export const useAdminSkill = () => {
  const queryClient = useQueryClient();

  const invalidate = () => {
	queryClient.invalidateQueries({ queryKey: ['skills'] });
	queryClient.invalidateQueries({ queryKey: ['skills-raw'] });
  };

  const createSkillMutation = useMutation({
    mutationFn: createSkill,
    onSuccess: invalidate,
  });

  const updateSkillMutation = useMutation({
    mutationFn: ({ id, data }) => updateSkill(id, data),
    onSuccess: invalidate,
  });

  const deleteSkillMutation = useMutation({
    mutationFn: deleteSkill,
    onSuccess: invalidate,
  });

  return {
    createSkill: createSkillMutation,
    updateSkill: updateSkillMutation,
    deleteSkill: deleteSkillMutation,
  };
};
