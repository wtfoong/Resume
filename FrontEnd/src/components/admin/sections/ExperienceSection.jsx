import { useState } from 'react';
import { useExperience } from '../../../hooks/useExperience';
import { useAdminExperience } from '../../../hooks/admin/useAdminExperience';
import { useAdminExperienceDetail } from '../../../hooks/admin/useAdminExperienceDetail';
import styles from '../../../styles/admin/Section.module.css';

const emptyExp = { company: '', role: '', location: '', employment_type: 'Full-time', start_date: '', end_date: '', is_current: false, sort_order: 0 };
const emptyDetail = { detail: '', sort_order: 0 };

const ExperienceSection = () => {
  const { data, isLoading } = useExperience();
  const { createExperience, updateExperience, deleteExperience } = useAdminExperience();
  const { createExperienceDetail, updateExperienceDetail, deleteExperienceDetail } = useAdminExperienceDetail();

  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyExp);
  const [addingDetailFor, setAddingDetailFor] = useState(null);
  const [editingDetailId, setEditingDetailId] = useState(null);
  const [detailForm, setDetailForm] = useState(emptyDetail);
  const [error, setError] = useState('');

	const handleSaveExp = async () => {
		setError('');
		try {
			const payload = {
			...form,
			end_date: form.is_current ? null : form.end_date,
			};
			if (adding) {
			await createExperience.mutateAsync(payload);
			setAdding(false);
			} else {
			await updateExperience.mutateAsync({ id: editingId, data: payload });
			setEditingId(null);
			}
			setForm(emptyExp);
		} catch (err) {
			setError(err.response?.data?.error ?? 'Something went wrong');
		}
	};

  const handleDeleteExp = async (id) => {
    if (!confirm('Delete this experience and all its details?')) return;
    try { await deleteExperience.mutateAsync(id); }
    catch (err) { setError(err.response?.data?.error ?? 'Something went wrong'); }
  };

  const handleSaveDetail = async (experienceId) => {
    setError('');
    try {
      if (addingDetailFor) {
        await createExperienceDetail.mutateAsync({ ...detailForm, experience_id: experienceId });
        setAddingDetailFor(null);
      } else {
        await updateExperienceDetail.mutateAsync({ id: editingDetailId, data: detailForm });
        setEditingDetailId(null);
      }
      setDetailForm(emptyDetail);
    } catch (err) {
      setError(err.response?.data?.error ?? 'Something went wrong');
    }
  };

  const handleDeleteDetail = async (id) => {
    if (!confirm('Delete this detail?')) return;
    try { await deleteExperienceDetail.mutateAsync(id); }
    catch (err) { setError(err.response?.data?.error ?? 'Something went wrong'); }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Experience</h2>
      <p className={styles.sectionSubtitle}>Your work history.</p>

      <button className={styles.btnPrimary} onClick={() => { setAdding(true); setForm(emptyExp); setError(''); }}>
        + Add Experience
      </button>

      {error && <p className={styles.error}>{error}</p>}

      {adding && (
        <div className={styles.card}>
          <ExperienceForm form={form} setForm={setForm}
            onSave={handleSaveExp} onCancel={() => setAdding(false)} />
        </div>
      )}

      {data?.map((exp) => (
        <div key={exp.id} className={styles.card}>
          {editingId === exp.id ? (
            <ExperienceForm form={form} setForm={setForm}
              onSave={handleSaveExp} onCancel={() => setEditingId(null)} />
          ) : (
            <>
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.cardTitle}>{exp.role}</div>
                  <div className={styles.cardMeta}>
                    {exp.company} · {exp.employment_type} · {new Date(exp.start_date).getFullYear()} — {exp.is_current ? 'Present' : new Date(exp.end_date).getFullYear()}
                  </div>
                </div>
                <div className={styles.actions}>
                  <button className={styles.btnEdit} onClick={() => {
                    setEditingId(exp.id);
                    setForm({
                      company: exp.company, role: exp.role,
                      location: exp.location ?? '', employment_type: exp.employment_type ?? 'Full-time',
                      start_date: exp.start_date?.split('T')[0] ?? '',
                      end_date: exp.end_date?.split('T')[0] ?? '',
                      is_current: exp.is_current, sort_order: exp.sort_order,
                    });
                  }}>Edit</button>
                  <button className={styles.btnDelete} onClick={() => handleDeleteExp(exp.id)}>Delete</button>
                </div>
              </div>

              <div className={styles.divider} />

              {/* details */}
              {exp.details?.map((detail) => (
                <div key={detail.id} style={{ marginBottom: '0.5rem' }}>
                  {editingDetailId === detail.id ? (
                    <div className={styles.form}>
                      <textarea className={styles.textarea} value={detailForm.detail}
                        onChange={(e) => setDetailForm({ ...detailForm, detail: e.target.value })} />
                      <div className={styles.formActions}>
                        <button className={styles.btnSave} onClick={() => handleSaveDetail(exp.id)}>Save</button>
                        <button className={styles.btnCancel} onClick={() => setEditingDetailId(null)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--ink-2)' }}>— {detail.detail}</span>
                      <div className={styles.actions}>
                        <button className={styles.btnEdit} onClick={() => {
                          setEditingDetailId(detail.id);
                          setDetailForm({ detail: detail.detail, sort_order: detail.sort_order });
                        }}>Edit</button>
                        <button className={styles.btnDelete} onClick={() => handleDeleteDetail(detail.id)}>Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {addingDetailFor === exp.id ? (
                <div className={styles.form} style={{ marginTop: '0.75rem' }}>
                  <textarea className={styles.textarea} value={detailForm.detail}
                    placeholder="Add a bullet point..."
                    onChange={(e) => setDetailForm({ ...detailForm, detail: e.target.value })} />
                  <div className={styles.formActions}>
                    <button className={styles.btnSave} onClick={() => handleSaveDetail(exp.id)}>Save</button>
                    <button className={styles.btnCancel} onClick={() => setAddingDetailFor(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <button className={styles.btnEdit} style={{ marginTop: '0.75rem' }}
                  onClick={() => { setAddingDetailFor(exp.id); setDetailForm(emptyDetail); }}>
                  + Add Detail
                </button>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const ExperienceForm = ({ form, setForm, onSave, onCancel }) => (
  <div className={styles.form}>
    <div className={styles.field}>
      <label className={styles.label}>Company</label>
      <input className={styles.input} value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })} />
    </div>
    <div className={styles.field}>
      <label className={styles.label}>Role</label>
      <input className={styles.input} value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })} />
    </div>
    <div className={styles.field}>
      <label className={styles.label}>Location</label>
      <input className={styles.input} value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })} />
    </div>
    <div className={styles.field}>
      <label className={styles.label}>Employment Type</label>
      <select className={styles.select} value={form.employment_type}
        onChange={(e) => setForm({ ...form, employment_type: e.target.value })}>
        <option>Full-time</option>
        <option>Internship</option>
        <option>Contract</option>
        <option>Part-time</option>
      </select>
    </div>
    <div className={styles.field}>
      <label className={styles.label}>Start Date</label>
      <input className={styles.input} type="date" value={form.start_date}
        onChange={(e) => setForm({ ...form, start_date: e.target.value })} />
    </div>
    <label className={styles.checkbox}>
      <input type="checkbox" checked={form.is_current}
        onChange={(e) => setForm({ ...form, is_current: e.target.checked })} />
      Currently working here
    </label>
    {!form.is_current && (
      <div className={styles.field}>
        <label className={styles.label}>End Date</label>
        <input className={styles.input} type="date" value={form.end_date}
          onChange={(e) => setForm({ ...form, end_date: e.target.value })} />
      </div>
    )}
    <div className={styles.field}>
      <label className={styles.label}>Sort Order</label>
      <input className={styles.input} type="number" value={form.sort_order}
        onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) })} />
    </div>
    <div className={styles.formActions}>
      <button className={styles.btnSave} onClick={onSave}>Save</button>
      <button className={styles.btnCancel} onClick={onCancel}>Cancel</button>
    </div>
  </div>
);

export default ExperienceSection;
