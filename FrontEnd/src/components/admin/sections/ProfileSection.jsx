import { useState } from 'react';
import { useProfile } from '../../../hooks/useProfile';
import { useAdminProfile } from '../../../hooks/admin/useAdminProfile';
import styles from '../../../styles/admin/Section.module.css';

const ProfileSection = () => {
  const { data, isLoading } = useProfile();
  const { updateProfile } = useAdminProfile();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEdit = () => {
    setForm({
      full_name:  data?.full_name ?? '',
      location:   data?.location ?? '',
      occupation: data?.occupation ?? '',
      based_in:   data?.based_in ?? '',
    });
    setEditing(true);
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    setError('');
    try {
      await updateProfile.mutateAsync(form);
      setSuccess('Profile updated successfully');
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.error ?? 'Something went wrong');
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Profile</h2>
      <p className={styles.sectionSubtitle}>Your basic identity information.</p>

      {!editing ? (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardTitle}>{data?.full_name}</div>
              <div className={styles.cardMeta}>{data?.occupation} · {data?.location} · {data?.based_in}</div>
            </div>
            <div className={styles.actions}>
              <button className={styles.btnEdit} onClick={handleEdit}>Edit</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.card}>
          <div className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>Full Name</label>
              <input className={styles.input} value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Occupation</label>
              <input className={styles.input} value={form.occupation}
                onChange={(e) => setForm({ ...form, occupation: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Location</label>
              <input className={styles.input} value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Based In</label>
              <input className={styles.input} value={form.based_in}
                onChange={(e) => setForm({ ...form, based_in: e.target.value })} />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <div className={styles.formActions}>
              <button className={styles.btnSave} onClick={handleSave}
                disabled={updateProfile.isPending}>
                {updateProfile.isPending ? 'Saving...' : 'Save'}
              </button>
              <button className={styles.btnCancel} onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
