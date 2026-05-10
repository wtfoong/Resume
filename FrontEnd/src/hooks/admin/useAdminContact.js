import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createContact, updateContact, deleteContact } from '../../api/admin/contactApi';

export const useAdminContact = () => {
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['profile'] });

  const createContactMutation = useMutation({
    mutationFn: createContact,
    onSuccess: invalidate,
  });

  const updateContactMutation = useMutation({
    mutationFn: ({ id, data }) => updateContact(id, data),
    onSuccess: invalidate,
  });

  const deleteContactMutation = useMutation({
    mutationFn: deleteContact,
    onSuccess: invalidate,
  });

  return {
    createContact: createContactMutation,
    updateContact: updateContactMutation,
    deleteContact: deleteContactMutation,
  };
};
