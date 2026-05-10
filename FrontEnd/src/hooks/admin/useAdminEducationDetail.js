import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEducationDetail, updateEducationDetail, deleteEducationDetail } from '../../api/admin/educationDetailApi';

export const useAdminEducationDetail = () => {
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['education'] });

  const createEducationDetailMutation = useMutation({
    mutationFn: createEducationDetail,
    onSuccess: invalidate,
  });

  const updateEducationDetailMutation = useMutation({
    mutationFn: ({ id, data }) => updateEducationDetail(id, data),
    onSuccess: invalidate,
  });

  const deleteEducationDetailMutation = useMutation({
    mutationFn: deleteEducationDetail,
    onSuccess: invalidate,
  });

  return {
    createEducationDetail: createEducationDetailMutation,
    updateEducationDetail: updateEducationDetailMutation,
    deleteEducationDetail: deleteEducationDetailMutation,
  };
}; 
