import { useState } from 'react';
import { useEducation } from '../../../hooks/useEducation';
import { useAdminEducation } from '../../../hooks/admin/useAdminEducation';
import { useAdminEducationDetail } from '../../../hooks/admin/useAdminEducationDetail';
import styles from '../../../styles/admin/Section.module.css';

const emptyEdu = { institution: '', degree: '', field: '', start_date: '', end_date: '', gpa: '', sort_order: 0 };
const emptyDetail = { detail: '', sort_order: 0 };

const EducationSection = () => {
  const { data, isLoading } = useEducation();
  const { createEducation, updateEducation, deleteEducation } = useAdminEducation();
  const { createEducationDetail, updateEducationDetail, deleteEducationDetail } = useAdminEducationDetail();

  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyEdu);
  const [addingDetailFor, setAddingDetailFor] = useState(null);
  const [editingDetailId, setEditingDetailId] = useState(null);
  const [detailForm, setDetailForm] = useState(emptyDetail);
  const [error, setError] = useState('');

  const handleSaveEdu = async () => {
    setError('');
    try {
      if (adding) {
        await createEducation.mutateAsync(form);
        setAdding(false);
      } else {
        await updateEducation.mutateAsync({ id: editingId, data: form });
        setEditingId(null);
      }
      setForm(emptyEdu);
    } catch (err) {
      setError(err.response?.data?.error ?? 'Something went wrong');
    }
  };

  const handleDeleteEdu = async (id) => {
    if (!confirm('Delete this education entry and all its details?')) return;
    try { await deleteEducation.mutateAsync(id); }
    catch (err) { setError(err.response?.data?.error ?? 'Something went wrong'); }
  };

  const handleSaveDetail = async (educationId) => {
    setError('');
    try {
      if (addingDetailFor) {
        await createEducationDetail.mutateAsync({ ...detailForm, education_id: educationId });
        setAddingDetailFor(null);
      } else {
        await updateEducationDetail.mutateAsync({ id: editingDetailId, data: detailForm });
        setEditingDetailId(null);
      }
      setDetailForm(emptyDetail);
    } catch (err) {
      setError(err.response?.data?.error ?? 'Something went wrong');
    }
  };

  const handleDeleteDetail = async (id) => {
    if (!confirm('Delete this detail?')) return;
    try { await deleteEducationDetail.mutateAsync(id); }
    catch (err) { setError(err.response?.data?.error ?? 'Something went wrong'); }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Education</h2>
      <p className={styles.sectionSubtitle}>Your academic background.</p>

      <button className={styles.btnPrimary} onClick={() => { setAdding(true); setForm(emptyEdu); setError(''); }}>
        + Add Education
      </button>

      {error && <p className={styles.error}>{error}</p>}

      {adding && (
        <div className={styles.card}>
          <EducationForm form={form} setForm={setForm}
            onSave={handleSaveEdu} onCancel={() => setAdding(false)} />
        </div>
      )}

      {data?.map((edu) => (
        <div key={edu.id} className={styles.card}>
          {editingId === edu.id ? (
            <EducationForm form={form} setForm={setForm}
              onSave={handleSaveEdu} onCancel={() => setEditingId(null)} />
          ) : (
            <>
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.cardTitle}>{edu.degree}</div>
                  <div className={styles.cardMeta}>
                    {edu.institution} · {edu.field} · GPA {edu.gpa}
                  </div>
                </div>
                <div className={styles.actions}>
                  <button className={styles.btnEdit} onClick={() => {
                    setEditingId(edu.id);
                    setForm({
                      institution: edu.institution, degree: edu.degree,
                      field: edu.field ?? '', gpa: edu.gpa ?? '',
                      start_date: edu.start_date?.split('T')[0] ?? '',
                      end_date: edu.end_date?.split('T')[0] ?? '',
                      sort_order: edu.sort_order,
                    });
                  }}>Edit</button>
                  <button className={styles.btnDelete} onClick={() => handleDeleteEdu(edu.id)}>Delete</button>
                </div>
              </div>

              <div className={styles.divider} />

              {edu.details?.map((detail) => (
                <div key={detail.id} style={{ marginBottom: '0.5rem' }}>
                  {editingDetailId === detail.id ? (
                    <div className={styles.form}>
                      <textarea className={styles.textarea} value={detailForm.detail}
                        onChange={(e) => setDetailForm({ ...detailForm, detail: e.target.value })} />
                      <div className={styles.formActions}>
                        <button className={styles.btnSave} onClick={() => handleSaveDetail(edu.id)}>Save</button>
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

              {addingDetailFor === edu.id ? (
                <div className={styles.form} style={{ marginTop: '0.75rem' }}>
                  <textarea className={styles.textarea} value={detailForm.detail}
                    placeholder="Add a bullet point..."
                    onChange={(e) => setDetailForm({ ...detailForm, detail: e.target.value })} />
                  <div className={styles.formActions}>
                    <button className={styles.btnSave} onClick={() => handleSaveDetail(edu.id)}>Save</button>
                    <button className={styles.btnCancel} onClick={() => setAddingDetailFor(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <button className={styles.btnEdit} style={{ marginTop: '0.75rem' }}
                  onClick={() => { setAddingDetailFor(edu.id); setDetailForm(emptyDetail); }}>
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

const EducationForm = ({ form, setForm, onSave, onCancel }) => (
  <div className={styles.form}>
    <div className={styles.field}>
      <label className={styles.label}>Institution</label>
      <input className={styles.input} value={form.institution}
        onChange={(e) => setForm({ ...form, institution: e.target.value })} />
    </div>
    <div className={styles.field}>
      <label className={styles.label}>Degree</label>
      <input className={styles.input} value={form.degree}
        onChange={(e) => setForm({ ...form, degree: e.target.value })} />
    </div>
    <div className={styles.field}>
      <label className={styles.label}>Field</label>
      <input className={styles.input} value={form.field}
        onChange={(e) => setForm({ ...form, field: e.target.value })} />
    </div>
    <div className={styles.field}>
      <label className={styles.label}>GPA</label>
      <input className={styles.input} type="number" 
		step="0.01" min="0" max="5"
		value={form.gpa}
		onChange={(e) => setForm({ ...form, gpa: e.target.value })} />
    </div>
    <div className={styles.field}>
      <label className={styles.label}>Start Date</label>
      <input className={styles.input} type="date" value={form.start_date}
        onChange={(e) => setForm({ ...form, start_date: e.target.value })} />
    </div>
    <div className={styles.field}>
      <label className={styles.label}>End Date</label>
      <input className={styles.input} type="date" value={form.end_date}
        onChange={(e) => setForm({ ...form, end_date: e.target.value })} />
    </div>
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

export default EducationSection;
