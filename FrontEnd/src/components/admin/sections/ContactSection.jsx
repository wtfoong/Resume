import { useState } from 'react';
import { useProfile } from '../../../hooks/useProfile';
import { useAdminContact } from '../../../hooks/admin/useAdminContact';
import styles from '../../../styles/admin/Section.module.css';

const emptyForm = { label: '', value: '', url: '', sort_order: 0 };

const ContactSection = () => {
  const { data: profile, isLoading } = useProfile();
  const { createContact, updateContact, deleteContact } = useAdminContact();
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  const contacts = profile?.contacts ?? [];

  const handleEdit = (contact) => {
    setEditingId(contact.id);
    setForm({ label: contact.label, value: contact.value, url: contact.url ?? '', sort_order: contact.sort_order });
    setAdding(false);
    setError('');
  };

  const handleAdd = () => {
    setAdding(true);
    setEditingId(null);
    setForm(emptyForm);
    setError('');
  };

  const handleSave = async () => {
    setError('');
    try {
      if (adding) {
        await createContact.mutateAsync({ ...form, profile_id: profile.id });
        setAdding(false);
      } else {
        await updateContact.mutateAsync({ id: editingId, data: form });
        setEditingId(null);
      }
      setForm(emptyForm);
    } catch (err) {
      setError(err.response?.data?.error ?? 'Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this contact?')) return;
    try {
      await deleteContact.mutateAsync(id);
    } catch (err) {
      setError(err.response?.data?.error ?? 'Something went wrong');
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Contacts</h2>
      <p className={styles.sectionSubtitle}>Your contact links shown in the hero section.</p>

      <button className={styles.btnPrimary} onClick={handleAdd}>+ Add Contact</button>

      {error && <p className={styles.error}>{error}</p>}

      {adding && (
        <div className={styles.card}>
          <div className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>Label</label>
              <input className={styles.input} value={form.label} placeholder="e.g. Email"
                onChange={(e) => setForm({ ...form, label: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Value</label>
              <input className={styles.input} value={form.value} placeholder="e.g. wtfoong81@gmail.com"
                onChange={(e) => setForm({ ...form, value: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>URL</label>
              <input className={styles.input} value={form.url} placeholder="optional — mailto:, tel:, or https://"
                onChange={(e) => setForm({ ...form, url: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Sort Order</label>
              <input className={styles.input} type="number" value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) })} />
            </div>
            <div className={styles.formActions}>
              <button className={styles.btnSave} onClick={handleSave}>Save</button>
              <button className={styles.btnCancel} onClick={() => setAdding(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {contacts.map((contact) => (
        <div key={contact.id} className={styles.card}>
          {editingId === contact.id ? (
            <div className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label}>Label</label>
                <input className={styles.input} value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Value</label>
                <input className={styles.input} value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>URL</label>
                <input className={styles.input} value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Sort Order</label>
                <input className={styles.input} type="number" value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) })} />
              </div>
              <div className={styles.formActions}>
                <button className={styles.btnSave} onClick={handleSave}>Save</button>
                <button className={styles.btnCancel} onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className={styles.cardHeader}>
              <div>
                <div className={styles.cardTitle}>{contact.label}</div>
                <div className={styles.cardMeta}>{contact.value} · {contact.url}</div>
              </div>
              <div className={styles.actions}>
                <button className={styles.btnEdit} onClick={() => handleEdit(contact)}>Edit</button>
                <button className={styles.btnDelete} onClick={() => handleDelete(contact.id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContactSection;
